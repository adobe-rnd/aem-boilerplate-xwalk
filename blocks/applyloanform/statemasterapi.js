import { workFlowStatemaster, stateMasterProcessApiData, stateMasterProcessGraphqlData } from './statemasterbiz.js';
import { fetchAPI } from '../../scripts/common.js';

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

  sessionStorage.removeItem('allowedType');
}

export function statemasterGetStatesApi(loanType) {
  const allowedtype = ['pl', 'las', 'lamf'].includes(loanType);
  const fetchUrl = '/api/state-city-master/personal-loan-state-city-master.json';

  const graphqlUrl = window.location.href.includes('localhost') 
  ? 'https://www.piramalfinance.com/graphql/execute.json/piramalfinance/State%20City%20Master'
  : '/graphql/execute.json/piramalfinance/State%20City%20Master';

  const url = allowedtype ? fetchUrl : graphqlUrl;

  return new Promise((resolve, reject) => {
    fetchAPI('GET', url)
      .then(async (response) => {
        const responseJson = await response.json();
        const statemaster = allowedtype 
        ? stateMasterProcessApiData(responseJson.data) 
        : stateMasterProcessGraphqlData(responseJson.data.statemasterList.items);

        workFlowStatemaster(statemaster);
      })
      .catch((error) => {
        console.warn(error);
      });
  });
}
