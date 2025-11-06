function applyRestrictions(allowedSelectors) {
  // for each allowedSelectors entry, separate the value by /
  // if the value is image,text,button or title replace it with "[data-aue-model="value"]"
  // otherwise replace it with "[data-aue-label="value"]"
  const cssSelectors = allowedSelectors.map((allowedSelector) => {
    const values = allowedSelector.split('/');
    let cssSelector = '';
    values.forEach((value) => {
      if (value === 'Image' || value === 'Title' || value === 'Button') {
        cssSelector += `[data-aue-model="${value.toLowerCase()}"] `;
      } else if (value === 'Text') {
        cssSelector += `[data-aue-type="richtext"] `;
      } else {
        cssSelector += `[data-aue-label="${value}"] `;
      }
    });
    return cssSelector;
  });

  // collect all the elements that match the allowed selectors
  const combinedSelector = cssSelectors.join(', ');
  const selectorElements = document.querySelector('main')?.querySelectorAll(combinedSelector);

  // go through the elements found by selectors
  selectorElements.forEach((selectorElement) => {
    // mark it as verified by the selector
    selectorElement.dataset.aueVerified = 'true';
    // mark all instrumented children as verified
    const children = selectorElement.querySelectorAll('[data-aue-type]');
    children.forEach((child) => {
      child.dataset.aueVerified = 'true';
    });
    // if its a container block item (or default content)
    // if it doesnt have a class 'block' try to find the closest parent that has a class block
    if (!selectorElement.classList.contains('block')) {
      const blockParent = selectorElement.closest('.block');
      if (blockParent) {
        // ift not already marked asverified, mark it as ancestor element
        if (!blockParent.dataset.aueVerified) {
          blockParent.dataset.aueVerified = 'ancestor';
        }
      }
    }
    // mark parent sections as ancestor elements
    const sectionParent = selectorElement.closest('.section');
    if (sectionParent && sectionParent !== selectorElement && !sectionParent.dataset.aueVerified) {
      sectionParent.dataset.aueVerified = 'ancestor';
    }
    // get all ancestor elements and remove data-aue-model and data-aue-filter attributes
    // so author can't edit properties that they are not allowed to edit
    const ancestorElements = document.querySelector('main')?.querySelectorAll('[data-aue-verified="ancestor"]');
    ancestorElements.forEach((element) => {
      element.removeAttribute('data-aue-model');
      // filter must exist and be empty otherwise no filter gets applied
      element.dataset.aueFilter = 'empty';
      element.dataset.aueVerified = 'true';
    });
  });
  // select all instrumented elements that dont have data-aue-verified="true"
  //  so author cant edit properties he is not allowed to edit
  const unverifiedElements = document.querySelector('main')?.querySelectorAll('*[data-aue-type]:not([data-aue-verified="true"])');
  unverifiedElements.forEach((element) => {
    // remove all data-aue attributes from the element
    element.removeAttribute('data-aue-resource');
    element.removeAttribute('data-aue-prop');
    element.removeAttribute('data-aue-label');
    element.removeAttribute('data-aue-filter');
    element.removeAttribute('data-aue-type');
    element.removeAttribute('data-aue-behavior');
    element.removeAttribute('data-aue-model');
  });
}

/**
 * Fetches the current user's group memberships
 * @returns {Promise<string[]>} An array of group names
 */
async function fetchUserGroupMemberships() {
  try {
    const response = await fetch('/libs/granite/security/currentuser.json?props=memberOf');
    const data = await response.json();
    // extract group names from memberOf array
    const groupMemberships = data.memberOf
      ? data.memberOf.map((group) => group.authorizableId)
      : [];
    return groupMemberships;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user group memberships:', error);
    return [];
  }
}

/**
 * Fetches the restrictions data from the server
 */
async function fetchRestrictions() {
  try {
    const response = await fetch('/drafts/msagolj/restrictions.json');
    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching restrictions:', error);
    return null;
  }
}

export default async function applyGovernance() {
  // get the current user's group memberships
  const groupMemberships = await fetchUserGroupMemberships();
  // only fetch restrictions if the user has group memberships
  if (groupMemberships.length === 0) {
    return;
  }
  // get the list of restrictions
  const restrictionsData = await fetchRestrictions();
  if (!restrictionsData) {
    return;
  }
  // check if the path matches the current path
  const currentPath = window.location.pathname;
  const allAllowed = [];
  if (restrictionsData.data && Array.isArray(restrictionsData.data)) {
    restrictionsData.data.forEach((restriction) => {
      if (restriction.path) {
        let pathMatches = false;
        try {
          // treat the path as a regular expression
          const pathRegex = new RegExp(restriction.path);
          pathMatches = pathRegex.test(currentPath);
        } catch (error) {
          // if regex is invalid, try exact match
          pathMatches = restriction.path === currentPath;
        }
        if (pathMatches) {
          // split the group property by comma to get list of restricted groups
          const restrictedGroups = restriction.group
            ? restriction.group.split(',').map((g) => g.trim())
            : [];
          // find which restricted groups the user is a member of
          const matchedGroups = restrictedGroups.filter(
            (restrictedGroup) => groupMemberships.includes(restrictedGroup),
          );

          if (matchedGroups.length > 0) {
            // get the allowed values from the restriction
            if (restriction.allowed) {
              const allowed = restriction.allowed.split(',').map((s) => s.trim());
              allAllowed.push(...allowed);
            }
          }
        }
      }
    });
  }

  // apply restrictions if any selectors were collected
  if (allAllowed.length > 0) {
    applyRestrictions(allAllowed);
  }
}
