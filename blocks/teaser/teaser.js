import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [media, content, ...ctas] = block.children;
  media.classList.add('teaser-media');
  content.classList.add('teaser-content');

  // create a list of ctas
  const ctasList = document.createElement('ul');
  ctasList.classList.add('teaser-ctas');
  ctas.forEach((cta) => {
    const li = document.createElement('li');
    const [classes, buttonContainer] = cta.children;
    classes.textContent.split(',').forEach((className) => li.classList.add(className.trim()));
    li.append(buttonContainer.querySelector('p.button-container'));
    moveInstrumentation(cta, li);
    ctasList.append(li);
    cta.remove();
  });
  content.append(ctasList);
}
