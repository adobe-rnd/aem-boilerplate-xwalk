import { workFlowStatemaster } from './statemasterbiz.js';
import { fetchAPI } from '../../scripts/scripts.js';

export function stateMasterApi() {
  const loaninnerform = document.querySelector('.loan-form-sub-parent');
  let applyLaonFormOpenBtns = [];
  const buttonExpert = document.querySelectorAll('.expert');
  const productBannerButton = document.querySelector('#loan-banner .cmp-teaser__content .cmp-teaser__action-container .cmp-teaser__action-link');
  const documentWhatsAppBtn = document.querySelector('.cmp-container--documentrequired .cmp-container .extendedbutton');
  const stickyFooter = document.getElementById('sticky-btn-loan-form');
  const locationCardButton = document.querySelectorAll(
    '.cmp-container--branches .cmp-contentfragmentlist .cmp-contentfragment .cmp-contentfragment__elements .cmp-contentfragment__element--ctaName .cmp-contentfragment__element-value',
  );
  const neeyatBtn = document.querySelectorAll('.open-form-btn');

  applyLaonFormOpenBtns = [...buttonExpert, productBannerButton, documentWhatsAppBtn, stickyFooter, ...locationCardButton, ...neeyatBtn];

  const filterdBtns = applyLaonFormOpenBtns.filter((btn) => btn != null);

  filterdBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (loaninnerform.dataset.stateMaster != 'true') {
        statemasterGetStatesApi()
          .catch((error) => {
            console.warn(error);
          });

        loaninnerform.dataset.stateMaster = true;
      }
    });
  });
}

export function statemasterGetStatesApi() {
  return new Promise((resolve, reject) => {
    // const url = '/graphql/execute.json/piramalfinance/State%20City%20Master';

    let url = '/graphql/execute.json/piramalfinance/State%20City%20Master';
    if(window.location.href.includes('localhost')){
      url = 'https://www.piramalfinance.com/graphql/execute.json/piramalfinance/State%20City%20Master';
    }
    // let stateMasterGraphQLQuery = "query MyQuery { statemasterList { items { state, data } } }";
    
    fetchAPI('GET', url)
      .then(async (response) => {
        const responseJson = await response.json();
        workFlowStatemaster(responseJson.data.statemasterList.items);
      })
      .catch((error) => {
        console.warn(error);
      });
  });
}
