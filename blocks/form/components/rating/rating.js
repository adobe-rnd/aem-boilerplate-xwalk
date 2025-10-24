// create a function to create a rating component
// the function will take a fieldDiv that contains a input type number element
// the function will convert the input element to a rating component
// the rating component will have max value of max attribute set in the input element
// and the value of the input element will be set to the value of the component
// the rating component will have a star element for each value from 1 to max
// the function will return the fieldDiv with the rating component
// the function will also hide the input element
// when a star element is clicked, the value of the input element will be set to the
// index of the star element
// and the selected class will be added to the star elements till the index
// of the clicked star element
// and the selected class will be removed from the star elements after the
// index of the clicked star element
// the function will also add a mouseover event listener to the star element
// when a star element is hovered, a css hover class will be added to the star
// elements till the index of the hovered star element
export default function decorate(fieldDiv, fieldJson) {
  // get the input element from the fieldDiv
  const input = fieldDiv.querySelector('input[type="number"]');
  const enabled = fieldJson?.enabled;
  const readOnly = fieldJson?.readOnly;

  // get the max attribute from the input element
  let max = input.getAttribute('max');
  if (!max) {
    max = 5;
  }
  // create a div element to contain the rating component
  const ratingDiv = document.createElement('div');
  // add the rating class to the rating div
  ratingDiv.classList.add('rating');
  ratingDiv.classList.add('hover');

  // Add disabled class if the component is not enabled or is readonly
  if (enabled === false || readOnly === true) {
    ratingDiv.classList.add('disabled');
  }

  // create a star element for each value from 1 to max
  for (let i = 1; i <= max; i += 1) {
    // create a star element
    const star = document.createElement('span');
    // add the star class to the star element
    star.classList.add('star');
    // add the text content to star element
    star.textContent = '★';
    // add the star element to the rating div
    ratingDiv.appendChild(star);

    // add a click event listener to the star element
    star.addEventListener('click', () => {
      // Only process click if the component is not disabled
      if (!ratingDiv.classList.contains('disabled')) {
        // set the value of the input element to the index of the star element
        input.value = i;
        // trigger a change event that bubbles on the input element
        input.dispatchEvent(new Event('change', { bubbles: true }));
        // add the selected class to the star elements till the index of the clicked star element
        for (let j = 0; j < i; j += 1) {
          ratingDiv.children[j].classList.add('selected');
        }
        // remove the selected class from the star elements after the index of the
        // clicked star element
        for (let j = i; j < max; j += 1) {
          ratingDiv.children[j].classList.remove('selected');
        }
      }
    });

    // add a mouseover event listener to the star element
    star.addEventListener('mouseover', () => {
      // Only process hover if the component is not disabled
      if (!ratingDiv.classList.contains('disabled')) {
        // add the css hover class to the star
        // elements till the index of the hovered star element
        // and remove the css hover class from the star
        // elements after the index of the hovered star element
        for (let j = 0; j < i; j += 1) {
          ratingDiv.children[j].classList.add('hover');
        }
        for (let j = i; j < max; j += 1) {
          ratingDiv.children[j].classList.remove('hover');
        }

        // show an emoji in the emoji element when the star element is hovered
        // if the index of star element is less than or equal to 3 show sad emoji
        // if the index of star element is greater than 3 show happy emoji
        const emojiElement = ratingDiv.querySelector('.emoji');
        if (i <= 3) {
          emojiElement.textContent = '😢';
        } else {
          emojiElement.textContent = '😊';
        }
      }
    });
  }

  // add the emoji element next to the last star element
  const emoji = document.createElement('span');
  emoji.classList.add('emoji');
  ratingDiv.appendChild(emoji);

  // add a mouseleave event listener to the rating div
  ratingDiv.addEventListener('mouseleave', () => {
    // Only process mouseleave if the component is not disabled
    if (!ratingDiv.classList.contains('disabled')) {
      // check if no star is selected
      if (!ratingDiv.querySelector('.selected')) {
        // remove the hover class from the star elements
        for (let j = 0; j < max; j += 1) {
          ratingDiv.children[j].classList.remove('hover');
        }
        // remove the emoji from the emoji element
        const emojiElement = ratingDiv.querySelector('.emoji');
        emojiElement.textContent = '';
      }
    }
  });

  // add the rating div to the fieldDiv
  fieldDiv.appendChild(ratingDiv);
  // hide the input element
  input.style.display = 'none';
  // return the fieldDiv with the rating component
  const helpText = fieldDiv.querySelector('.field-description');
  if (helpText) {
    fieldDiv.append(helpText);
  }
  return fieldDiv;
}
