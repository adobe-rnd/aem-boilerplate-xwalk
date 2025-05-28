export default function decorate(block) {
  const [media, content] = block.children;
  media.classList.add('teaser__media');
  content.classList.add('teaser__content');
}