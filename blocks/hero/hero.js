/**
 * Decorates an authored image list as a manually controlled slideshow.
 * @param {HTMLElement} block The hero block.
 */
export default function decorate(block) {
  const list = [...block.querySelectorAll('ul')].find((candidate) => (
    candidate.querySelector(':scope > li img')
  ));
  if (!list) return;

  const slides = [...list.children].filter((item) => item.querySelector('img'));
  block.classList.add('hero-slideshow');
  list.classList.add('hero-slides');
  list.setAttribute('aria-label', 'Hero images');
  list.setAttribute('aria-live', 'polite');

  slides.forEach((slide, index) => {
    slide.hidden = index !== 0;
    slide.setAttribute('aria-label', `Image ${index + 1} of ${slides.length}`);
  });

  if (slides.length === 1) return;

  const indicators = document.createElement('div');
  indicators.className = 'hero-indicators';
  indicators.setAttribute('role', 'group');
  indicators.setAttribute('aria-label', 'Choose hero image');

  const buttons = slides.map((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hero-indicator';
    button.setAttribute('aria-label', `Show image ${index + 1} of ${slides.length}`);
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      slides.forEach((item, slideIndex) => {
        item.hidden = slideIndex !== index;
        buttons[slideIndex].setAttribute('aria-pressed', String(slideIndex === index));
      });
    });
    indicators.append(button);
    return button;
  });

  block.append(indicators);
}
