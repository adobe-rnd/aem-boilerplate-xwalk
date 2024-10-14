import { documentDownloadInteraction } from '../../dl.js';

export default function decorate(block) {
  const clickal = block.querySelectorAll('div ul li a');
  clickal.forEach((element) => {
    element.addEventListener('click', (e) => {
      const dataAnalytics = {};
      dataAnalytics.click_text = e.target.textContent.trim();
      documentDownloadInteraction(dataAnalytics);
    });
  });
}
