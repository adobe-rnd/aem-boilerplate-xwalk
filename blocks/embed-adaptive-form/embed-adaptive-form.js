import { loadFragment } from '../fragment/fragment.js';

export default function decorate(block) {
  // Create observer to load form when block enters viewport
  const observer = new IntersectionObserver(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      // Disconnect observer after loading to prevent multiple loads
      observer.disconnect();

      const container = block.querySelector('a[href]');
      // get the pathname from the href
      const { pathname } = new URL(container.href);
      const form = await loadFragment(pathname);
      block.replaceChildren(form.children[0]);
    }
  });

  // Start observing the block
  observer.observe(block);
}
