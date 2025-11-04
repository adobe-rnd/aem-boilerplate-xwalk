export default function decorate(block) {
  // split the table into the 4 first rows and the remaing faq items
  const teaserRows = [...block.children].slice(0, 4);
  const faqItems = [...block.children].slice(4);

  // create pointers for each row in the teaser data rows
  const [imageRow, teaserTextRow, linkRow, ctaButtonsRow] = teaserRows;

  // assign a class to image cell
  imageRow.children[0].classList.add('cub-teaser-image');

  // move the teaser text cell next to the image cell
  const teaserTextCell = teaserTextRow.children[0];
  teaserTextCell.classList.add('cub-teaser-text');
  imageRow.appendChild(teaserTextCell);

  // move the links cell inside the teaser text cell
  const linkCell = linkRow.children[0];
  linkCell.classList.add('cub-teaser-links');
  teaserTextCell.appendChild(linkCell);

  // add a class to the links in the links cell based on selected icon
  linkCell.querySelectorAll('p:not(:has(a))').forEach((linkIcon) => {
    const link = linkIcon.nextElementSibling?.querySelector('a');
    if (link) {
      link.classList.add(linkIcon.textContent.trim().toLowerCase());
    }
    // remove the link icon info
    linkIcon.remove();
  });

  // move the cta buttons row inside the teaser text cell
  const ctaCell = ctaButtonsRow.children[0];
  ctaCell.classList.add('cub-teaser-cta');
  teaserTextCell.appendChild(ctaCell);

  // remove uneeded rows
  teaserTextRow.remove();
  ctaButtonsRow.remove();
  linkRow.remove();

  // process FAQ items
  faqItems.forEach((faqItem) => {
    faqItem.classList.add('cub-teaser-faq-item');
    const [questionCell, answerCell] = faqItem.children;
    questionCell.classList.add('cub-teaser-faq-question');
    answerCell.classList.add('cub-teaser-faq-answer');

    // Add click handler for accordion functionality
    questionCell.addEventListener('click', () => {
      faqItem.classList.toggle('active');
    });
  });
}
