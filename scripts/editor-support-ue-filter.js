/**
 * Universal Editor Filter Support
 * Dynamically filters component-filters.json based on path-specific rules
 *
 * Note: Uses synchronous XMLHttpRequest to ensure filtering completes
 * before Universal Editor initializes. This blocks the main thread but is
 * necessary to guarantee correct filter application timing.
 */

(() => {
  try {
    /**
     * Converts a glob pattern to a regular expression
     * Handles ** for multi-level wildcards and * for single-level wildcards
     */
    const globToRegex = (glob) => {
      const reString = glob
        .replaceAll('**', '|')
        .replaceAll('*', '[^/]*')
        .replaceAll('|', '.*');
      return new RegExp(`^${reString}$`);
    };

    /**
     * Performs a synchronous HTTP GET request
     * @param {string} url - The URL to fetch
     * @returns {object|null} - The parsed JSON response or null on error
     */
    const syncFetch = (url) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      try {
        xhr.send(null);
        if (xhr.status === 200) {
          return JSON.parse(xhr.responseText);
        }
        return null;
      } catch (e) {
        return null;
      }
    };

    // Get the component-filters script tag to derive the filter rules URL
    const filterScriptTag = document.querySelector('script[type="application/vnd.adobe.aue.filter+json"]');
    if (!filterScriptTag) {
      return;
    }

    const filterSrc = filterScriptTag.getAttribute('src');
    if (!filterSrc) {
      return;
    }

    // Determine the site path from the component-filters src
    const dotIndex = filterSrc.indexOf('.');
    if (dotIndex === -1) {
      // eslint-disable-next-line no-console
      console.warn('Editor Support UE Filter: Invalid component-filters src (no dot found):', filterSrc);
      return;
    }
    const sitePath = filterSrc.substring(0, dotIndex);
    const filterRulesUrl = `${sitePath}/ue-filter-rules.hlx.json`;

    // Fetch filter rules
    const rulesData = syncFetch(filterRulesUrl);
    if (!rulesData) {
      // eslint-disable-next-line no-console
      console.warn(`Editor Support UE Filter: Failed to fetch filter rules from ${filterRulesUrl}`);
      return;
    }

    const rules = rulesData.data || [];

    const currentPath = window.location.pathname;
    // Get the relative path (pathname without site path prefix)
    const relativePath = currentPath.startsWith(sitePath)
      ? currentPath.substring(sitePath.length) || '/'
      : currentPath;
    // Initialize as empty arrays - empty means no restrictions (allow all / deny none)
    let allowList = [];
    let denyList = [];

    // Iterate through rules to find matches
    rules.forEach((rule) => {
      if (!rule.url) return;

      const urlRegex = globToRegex(rule.url);
      // Match against either the full path or the relative path (without site path prefix)
      if (urlRegex.test(currentPath) || urlRegex.test(relativePath)) {
        // Track last matching rule with allow set
        // Empty string means no-op (don't update)
        // '""' (literal two quotes) means clear the setting
        if (rule.allow !== undefined && rule.allow !== '') {
          if (rule.allow === '""') {
            allowList = [];
          } else {
            allowList = rule.allow.split(',').map((item) => item.trim()).filter(Boolean);
          }
        }
        // Track last matching rule with deny set (independent)
        if (rule.deny !== undefined && rule.deny !== '') {
          if (rule.deny === '""') {
            denyList = [];
          } else {
            denyList = rule.deny.split(',').map((item) => item.trim()).filter(Boolean);
          }
        }
      }
    });

    // If both lists are empty, no filtering is needed
    if (allowList.length === 0 && denyList.length === 0) {
      return;
    }

    // Fetch existing component filters
    const componentFilters = syncFetch(filterSrc);
    if (!componentFilters) {
      // eslint-disable-next-line no-console
      console.error(`Editor Support UE Filter: Failed to fetch component-filters from ${filterSrc}`);
      return;
    }

    // Apply filter rules
    const filteredComponents = componentFilters.map((filter) => {
      const { components } = filter;
      let filteredComponentList = [...components];

      // Apply allow filter first (if set)
      // Empty allowList means allow all (no restrictions)
      // Check if component matches any allow pattern
      if (allowList.length > 0) {
        filteredComponentList = filteredComponentList.filter(
          (component) => allowList.some((pattern) => {
            const regex = globToRegex(pattern);
            return regex.test(component);
          }),
        );
      }

      // Apply deny filter (takes precedence)
      // Empty denyList means deny none (no restrictions)
      // Exclude if component matches any deny pattern
      if (denyList.length > 0) {
        filteredComponentList = filteredComponentList.filter(
          (component) => !denyList.some((pattern) => {
            const regex = globToRegex(pattern);
            return regex.test(component);
          }),
        );
      }

      return {
        ...filter,
        components: filteredComponentList,
      };
    });

    // Update DOM with new component filters
    const jsonString = JSON.stringify(filteredComponents);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);

    filterScriptTag.setAttribute('src', blobUrl);
  } catch (error) {
    // Graceful degradation: if any error occurs, original filters remain intact
    // eslint-disable-next-line no-console
    console.error('Editor Support UE Filter: Error applying filters:', error);
  }
})();
