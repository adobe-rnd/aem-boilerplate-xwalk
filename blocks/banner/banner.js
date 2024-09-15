import { readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
  const config = readBlockConfig(block);

  const content = document.createRange().createContextualFragment(`
    <div>Banner</div>
    `);

    block.textContent = '';
    block.append(content);
}