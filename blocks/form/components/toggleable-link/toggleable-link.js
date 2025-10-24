function decorateLink(link) {
  const checkbox = link.querySelector('input[type="checkbox"]');
  const label = link.querySelector('label');
  const { value } = checkbox;
  const labelText = label.textContent;
  label.textContent = '';

  const newAnchor = document.createElement('a');
  newAnchor.title = labelText;
  newAnchor.href = value;
  newAnchor.target = '_blank';

  const newSpan = document.createElement('span');
  newSpan.textContent = labelText;

  checkbox.style.display = 'none';
  newAnchor.appendChild(newSpan);
  label.appendChild(checkbox);
  label.appendChild(newAnchor);

  label.addEventListener('click', () => {
    checkbox.click();
  });
  return link;
}

/**
 * Toggleable-link is a component that wraps a checkbox and an anchor tag.
 * When the anchor tag is clicked, the checkbox is toggled, marking that the link has been clicked.
 * The anchor tag is styled to look like a link and the checkbox is hidden.
 * @param {HTMLElement} fieldDiv - The div element that contains the fields to be decorated.
 * @returns {Promise<HTMLElement>} - Returns a Promise that resolves with the decorated fieldDiv.
 */
export default async function decorate(fieldDiv) {
  const links = fieldDiv.querySelectorAll('.checkbox-wrapper');
  links.forEach((link) => {
    decorateLink(link);
  });
  return fieldDiv;
}
