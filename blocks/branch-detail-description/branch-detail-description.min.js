import { intertextLinkingInteraction } from '../../dl.js';
import { setLocationObj } from '../moredetailsaddress/moredetailsaddress.js';

export default function decorate(block) {
  const { pagecontent, geoInfo: { location } } = setLocationObj;

  if (!pagecontent) {
    return false;
  }

  const slicedbold = pagecontent.split(' ').slice(0, 14).join(' ');
  const slicedData = pagecontent.split(' ').slice(14, 90).join(' ');
  const seemoreContent = pagecontent.split(' ').slice(90).join(' ');
  block.innerHTML = `
        <div class="branch-description-wrapper">
            <h2 class="branch-heading">About Piramal Finance ${location} Branch</h2>
            <p>
                <span class="branch-description-content">
                    <strong>${slicedbold}</strong>${slicedData}
                    <span class='dp-none'>${seemoreContent}</span>
                </span>
                <button class="button-container">Read More</button>
            </p>
        </div>
    `;

  const button = block.querySelector('.button-container');
  const description = block.querySelector('.branch-description-content');
  button.addEventListener('click', (e) => {
    try {
      const dataAnalytics = {};
      dataAnalytics.click_text = e.target.textContent.trim().toLowerCase();
      intertextLinkingInteraction(dataAnalytics);
    } catch (error) {
      console.warn(error);
    }
    description.querySelector('.dp-none').classList.remove('dp-none');
    button.classList = 'dp-none';
  });
}
