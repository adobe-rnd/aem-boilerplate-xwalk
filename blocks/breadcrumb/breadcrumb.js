import { createElement } from '../../scripts/scripts.js';
import { HOME, RIGHTARROW } from '../../scripts/constants.js';
import { getMetadata } from '../../scripts/aem.js';

const getPageTitle = async (url) => {
  const resp = await fetch(url);
  if (resp.ok) {
    const html = document.createElement('div');
    html.innerHTML = await resp.text();
    return html.querySelector('[name="page-name"]')?.getAttribute('content');
  }

  return '';
};

const getAllPathsExceptCurrent = async (paths, startLevel) => {
  const result = [];
  let startLevelVal = startLevel;
  // Excluding content/pricefx/en in main url
  if (!window.location.host.includes('author')) {
    if (startLevelVal <= 4) {
      startLevelVal = 1;
    } else {
      startLevelVal -= 3;
    }
  }
  // remove first and last slash characters
  const pathsList = paths.replace(/^\/|\/$/g, '').split('/');
  let pathVal = '';
  // Excluding current link
  for (let i = 0; i <= pathsList.length - 2; i += 1) {
    // for (let i = 0; i <= pathsList.length - 1; i += 1) {
    pathVal = `${pathVal}/${pathsList[i]}`;
    let url = `${window.location.origin}${pathVal}`;
    if (window.location.host.includes('author')) {
      url = `${window.location.origin}${pathVal}.html`;
    }

    if (i >= startLevelVal - 1) {
      // eslint-disable-next-line no-await-in-loop
      const name = await getPageTitle(url);
      if (name) {
        result.push({ pathVal, name, url });
      }
    }
  }
  return result;
};

const createLink = (path) => {
  const pathLink = document.createElement('a');
  pathLink.href = path.url;

  if (path.name !== 'HomePage') {
    pathLink.innerText = path.name;
  } else {
    pathLink.title = path.label;
    pathLink.innerHTML = HOME;
  }
  return pathLink;
};

export default async function decorate(block) {
  const [hideBreadcrumbVal, startLevelVal, hideCurrentPageVal, classNameVal, multiText, multiUrl] = block.children;

  const hideBreadcrumb = hideBreadcrumbVal?.textContent.trim() || 'false';
  const hideCurrentPage = hideCurrentPageVal?.textContent.trim() || 'false';
  let startLevel = startLevelVal?.textContent.trim() || 1;
  const className = classNameVal?.textContent.trim() || 'black';
  const metaBreadcrumbLevel = getMetadata('breadcrumblevel');

  const breadcrumb = createElement('nav', '', {
    'aria-label': 'Breadcrumb',
  });

  if (multiText.innerText?.trim() && multiUrl.innerText?.trim()) {
    const breadcrumbsText = [];
    const multiUrls = multiUrl.innerText.trim().replace(/~/g, '/').split(',');
    multiText.innerText.trim().split(',').forEach((text, index) => {
      breadcrumbsText.push(`<a href="${getMetadata('lang-path') + multiUrls[index]}">${text}</a>`);
    });

    // generateBreadcrumbSchema(breadcrumbsText);

    block.innerHTML = '';
    block.classList.add(className);
    breadcrumb.innerHTML = breadcrumbsText.join(`<span class="breadcrumb-separator">${RIGHTARROW}</span>`);
    block.append(breadcrumb);
    return block;
  }

  if (metaBreadcrumbLevel !== '') {
    startLevel = metaBreadcrumbLevel;
  }

  block.innerHTML = '';
  block.classList.add(className);

  if (hideBreadcrumb === 'true') {
    return;
  }

  let breadcrumbLinks = [];
  if (startLevel == 'hidehome') {
    startLevel = '';
  } else {
    const HomeLink = createLink({
      path: '', name: 'HomePage', url: window.location.origin, label: 'Home',
    });
    breadcrumbLinks = [HomeLink.outerHTML];
  }

  // window.setTimeout(async () => {
  document.addEventListener('load-event', async () => {
    const path = window.location.pathname;
    const paths = await getAllPathsExceptCurrent(path, startLevel);
    paths.forEach((pathPart) => breadcrumbLinks.push(createLink(pathPart).outerHTML));
    if (hideCurrentPage === 'false') {
      const currentPath = document.createElement('a');
      currentPath.href = window.location.href;
      // const currentTitle = document.querySelector('title').innerText;
      const currentTitle = getMetadata('page-name');
      currentPath.innerText = currentTitle.replace(' | Pricefx', '');
      breadcrumbLinks.push(currentPath.outerHTML);
    }
    breadcrumb.innerHTML = breadcrumbLinks.join(`<span class="breadcrumb-separator">${RIGHTARROW}</span>`);
    block.append(breadcrumb);
  });
}

function generateBreadcrumbSchema(breadcrumbsText) {
  const listItems = [];
  const div = document.createElement('div');
  div.innerHTML = breadcrumbsText.join("");
  const isBranchLocator = Array.from(div.querySelectorAll("a")).some((e) => {
    if (e.getAttribute('href').includes("/branch-locator")) {
      return true;
    }
    return false;
  });

  if (isBranchLocator) {
    return;
  }

  div.querySelectorAll("a").forEach((ele, index) => {

    listItems.push({
      "@type": "ListItem",
      "position": index + 1,
      "name": ele.textContent,
      "item": location.origin + ele.getAttribute('href')
    });
  });

  let breadCrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": listItems
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(breadCrumbSchema);
  document.head.append(script);


}

