/**
 * Diff highlights for Universal Editor compare view.
 *
 * This script loads in both side-by-side iframes (BaseContentFrame and
 * DiffContentFrame). Each frame snapshots its editables after the page is idle,
 * then the two frames coordinate over BroadcastChannel so one frame computes
 * added / removed / changed regions and both apply matching outlines.
 */

const CHANNEL = 'aem-diff';
const BASE_FRAME = 'BaseContentFrame';
const DIFF_FRAME = 'DiffContentFrame';

const role = window.frameElement?.id;
const nonce = Math.random();

// ---------------------------------------------------------------------------
// Idle wait — snapshot only after decoration and script loads settle
// ---------------------------------------------------------------------------

/**
 * Resolves when no new script resources load for `idleDebounce` ms, or after
 * `maxWait` regardless (avoids hanging on endless activity).
 */
function waitForIdle({ maxWait = 5000, idleDebounce = 500 } = {}) {
  return new Promise((resolve) => {
    const deadline = setTimeout(resolve, maxWait);
    let idleTimer;

    const onQuiet = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        clearTimeout(deadline);
        resolve();
      }, idleDebounce);
    };

    const observer = new PerformanceObserver((list) => {
      const scriptLoaded = list.getEntries().some((e) => e.initiatorType === 'script');
      if (scriptLoaded) onQuiet();
    });
    observer.observe({ type: 'resource', buffered: false });
    onQuiet();
  });
}

// ---------------------------------------------------------------------------
// Resource keys and normalized HTML for comparison
// ---------------------------------------------------------------------------

const JCR_CONTENT = 'jcr:content';
const PAGE_ROOT_KEY = 'root';

/**
 * Compare key for a `data-aue-resource` path: the suffix under `jcr:content`
 * so base and diff frames agree even if repo prefixes differ.
 */
function resourceCompareKey(resource) {
  const marker = `${JCR_CONTENT}/`;
  const idx = resource.indexOf(marker);
  if (idx !== -1) return resource.slice(idx + marker.length);
  if (resource.endsWith(JCR_CONTENT)) return '';
  return resource;
}

/** UE / richtext instrumentation attributes are not part of authored content. */
function isAuthoringAttribute(name) {
  return name.startsWith('data-aue-') || name.startsWith('data-richtext-');
}

/** Trim and collapse text nodes; drop nodes that become empty. */
function collapseWhitespaceInTree(root) {
  const toRemove = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent.replace(/\s+/g, ' ').trim();
    if (!text) toRemove.push(node);
    else node.textContent = text;
  }
  toRemove.forEach((n) => n.remove());
}

/** Collapse insignificant whitespace between tags in serialized HTML. */
function normalizeOuterHtml(html) {
  return html.replace(/>\s+</g, '><').trim();
}

/**
 * Build comparable HTML for one editable: clone, drop nested editables and
 * authoring attributes, then normalize whitespace so layout-only diffs are ignored.
 */
function editableCompareContent(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('[data-aue-resource]').forEach((nested) => {
    if (nested !== clone) nested.remove();
  });
  [clone, ...clone.querySelectorAll('*')].forEach((node) => {
    [...node.attributes]
      .filter(({ name }) => isAuthoringAttribute(name))
      .forEach(({ name }) => node.removeAttribute(name));
  });
  collapseWhitespaceInTree(clone);
  return normalizeOuterHtml(clone.outerHTML);
}

function isComparableEditable(key) {
  return key && key !== PAGE_ROOT_KEY;
}

/** Normalized HTML per compare key for this frame's page. */
function getEditablesSnapshot() {
  const entries = [...document.querySelectorAll('[data-aue-resource]')]
    .map((el) => [resourceCompareKey(el.dataset.aueResource), editableCompareContent(el)])
    .filter(([key]) => isComparableEditable(key));
  return Object.fromEntries(entries);
}

/** Live DOM elements keyed by compare key (for applying outlines). */
function elementsByCompareKey() {
  return new Map(
    [...document.querySelectorAll('[data-aue-resource]')]
      .map((el) => [resourceCompareKey(el.dataset.aueResource), el])
      .filter(([key]) => isComparableEditable(key)),
  );
}

/**
 * Compare base vs diff snapshots.
 * - added: present in diff only
 * - removed: present in base only
 * - changed: same key, different normalized HTML
 */
function computeDiff(baseEditables, diffEditables) {
  const added = Object.keys(diffEditables).filter((key) => !(key in baseEditables));
  const removed = Object.keys(baseEditables).filter((key) => !(key in diffEditables));
  const changed = Object.keys(baseEditables).filter(
    (key) => key in diffEditables && baseEditables[key] !== diffEditables[key],
  );
  return { added, removed, changed };
}

// ---------------------------------------------------------------------------
// Highlights — each iframe only outlines what exists in its own document
// ---------------------------------------------------------------------------

const OUTLINE = { width: 3, offset: -3 };
const COLORS = { added: 'green', removed: 'red', changed: 'orange' };

function highlightElement(el, color) {
  if (!el) return;
  el.style.setProperty('outline', `${OUTLINE.width}px solid ${color}`);
  el.style.setProperty('outline-offset', `${OUTLINE.offset}px`);
}

function applyHighlights({ added, removed, changed }) {
  const elements = elementsByCompareKey();

  // Added blocks exist only in the diff frame.
  if (role === DIFF_FRAME) {
    added.forEach((key) => highlightElement(elements.get(key), COLORS.added));
  }
  // Removed blocks exist only in the base frame.
  if (role === BASE_FRAME) {
    removed.forEach((key) => highlightElement(elements.get(key), COLORS.removed));
  }
  // Changed blocks exist in both; outline in each iframe.
  changed.forEach((key) => highlightElement(elements.get(key), COLORS.changed));
}

// ---------------------------------------------------------------------------
// Cross-frame coordination
// ---------------------------------------------------------------------------

const channel = new BroadcastChannel(CHANNEL);
let myReady = null;
let peerReady = null;

/** One frame computes the diff; lower nonce wins, base frame breaks ties. */
function isCoordinator() {
  if (!myReady || !peerReady) return false;
  if (nonce < peerReady.nonce) return true;
  if (nonce > peerReady.nonce) return false;
  return role === BASE_FRAME;
}

function maybeRunDiff() {
  if (!isCoordinator()) return;

  const baseEditables = role === BASE_FRAME ? myReady.editables : peerReady.editables;
  const diffEditables = role === DIFF_FRAME ? myReady.editables : peerReady.editables;
  const result = computeDiff(baseEditables, diffEditables);

  channel.postMessage({ type: 'aem-diff-result', result });
  applyHighlights(result);
}

channel.addEventListener('message', ({ data }) => {
  if (data.type === 'aem-diff-ready') {
    peerReady = data;
    maybeRunDiff();
  }
  if (data.type === 'aem-diff-result') {
    applyHighlights(data.result);
  }
});

waitForIdle().then(() => {
  myReady = { nonce, editables: getEditablesSnapshot() };
  channel.postMessage({
    type: 'aem-diff-ready',
    nonce,
    role,
    editables: myReady.editables,
  });
  // Peer may have sent ready before we finished idling.
  maybeRunDiff();
});
