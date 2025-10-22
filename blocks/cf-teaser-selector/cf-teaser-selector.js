/* eslint-disable no-underscore-dangle */

export default async function decorate(block) {
  // hard coded for demo purposes, this should be stored in config service
  const aemPublishUrl = 'https://publish-p130360-e1272151.adobeaemcloud.com';
  const aemAuthorUrl = 'https://author-p130360-e1272151.adobeaemcloud.com';

  const persistedGraphQlQuery = '/graphql/execute.json/aem-boilerplate/teaserByPath';
  const cfPath = block.querySelector(':scope div:nth-child(1) > div a').innerHTML.trim();
  const cfVariation = block.querySelector(':scope div:nth-child(2) > div > p')?.innerHTML.trim();

  if (!cfPath) return;

  // get cf data from author or publish ?
  let url = window?.location?.origin.includes('author') ? `${aemAuthorUrl}` : `${aemPublishUrl}`;

  // set persisted query,cf path , variation and timestamp to keep cache fresh
  url = `${url}${persistedGraphQlQuery};path=${cfPath};variation=${cfVariation};ts=${Math.random() * 1000}`;

  // make the request
  const options = { credentials: 'include' };
  const response = await fetch(url, options);
  if (!response.ok) return;

  // get the json response
  const data = await response.json();

  // get the teaser data
  const teaser = data.data.teaserExampleByPath.item;

  // make sure this block is a container block
  block.setAttribute('data-aue-type', 'container');

  // build the child block html
  block.innerHTML = `
  <div class='cf-teaser' data-aue-resource="urn:aemconnection:${cfPath}/jcr:content/data/${cfVariation ?? 'master'}" data-aue-label="CF Teaser" data-aue-type="reference">
    <div class='teaser-background'>
      <img src="${teaser?.image?._path}" alt="${teaser?.image?._path}" data-aue-prop='image' data-aue-label='Image' data-aue-type='media'>
    </div>
    <div class='teaser-content'>
      <div class='teaser-text'>
          <h3 data-aue-prop='title' data-aue-label='Title' data-aue-type='text' class='title'>${teaser?.title}</h4>
          <div data-aue-prop='description' data-aue-label='Description' data-aue-type='richtext' class='description'>
          ${teaser?.description?.html}
          </div>
      </div>
      <div class='teaser-cta'>
         <a href="${teaser?.cta_link}.html" data-aue-prop='cta_title' data-aue-label='Button Text' data-aue-type='text' class='button secondary'>${teaser?.cta_title}</a>
      </div>
    </div>
  </div>`;
}
