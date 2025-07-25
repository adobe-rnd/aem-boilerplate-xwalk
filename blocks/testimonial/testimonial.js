import { fetchAPI, getProps, renderHelper } from '../../scripts/common.js';
import { customerTemplateCopy, customerCardCopy } from './template.js';

export default async function decorate(block) {
  // const props = Array.from(block.children).map(function (el) {
  //     return el.innerHTML.includes("picture") ? el.querySelector("img").src.trim() : el.innerText.trim();
  // })
  const props = getProps(block);
  const [url, time, ribbononeimg, ribbontwoimg, ribbonthreeimg, ribbonfourimg, classess] = props;
  block.classList.add(classess);
  block.innerHTML = '';
  let customerTemplate = customerTemplateCopy; const
    customerCard = customerCardCopy;
  try {
    const resp = await fetchAPI('GET', url);
    const data = await resp.json();

    const cards = renderHelper(
      // [
      //     {
      //         ":path": "/content/piramalfinance-edge/cf/happy-customer/jcr:content/row",
      //         "customerImage": "/content/dam/piramalfinance/homepage/testimonials/ch-maruthi-prasad.webp",
      //         "customerDetails": "I was very much delighted with the way the loan was disbursed. I would like to also thank for the quickest response by Piramal Finance executive. The loan was disbursed in a week’s time in a hassle free manner.",
      //         "customerDetailsClass": "",
      //         "customerName": "CH Maruthi Prasad",
      //         "customerNameClass": "",
      //         "customerProfession": "VT Engineering, Indore",
      //         "customerProfessionClass": "",
      //         "customerId": "customer5",
      //         "customerClass": "customerclassfive"
      //     },
      //     {
      //         ":path": "/content/piramalfinance-edge/cf/happy-customer/jcr:content/row_1912225365",
      //         "customerImage": "/content/dam/piramalfinance/homepage/testimonials/dileep-s.webp",
      //         "customerDetails": "Appreciate the efforts of Piramal Finance for quick and smooth processing of my Loan Against Property. Piramal Finance team understood my requirements and explained the process, product details and required document list. Piramal Finance was helpful in every step and gave me quick loan sanction. Thank you Piramal Finance.",
      //         "customerDetailsClass": "",
      //         "customerName": "Dileep S",
      //         "customerNameClass": "",
      //         "customerProfession": "Peenya",
      //         "customerProfessionClass": "",
      //         "customerId": "customer3",
      //         "customerClass": "customerclassthree"
      //     },
      //     {
      //         ":path": "/content/piramalfinance-edge/cf/happy-customer/jcr:content/row_557713100",
      //         "customerImage": "/content/dam/piramalfinance/homepage/testimonials/mohd-irshad-ansari.webp",
      //         "customerDetails": "I have availed Loan From Piramal Finance for Business Expansion. I was attended with utmost professional attitude and perfection. Piramal Finance very patiently answered all my queries and resolved all doubts. Once again, thanks a lot for serving my needs with such warmth.",
      //         "customerDetailsClass": "",
      //         "customerName": "Mohd Irshad Ansari",
      //         "customerNameClass": "",
      //         "customerProfession": "VT Engineering, Indore",
      //         "customerProfessionClass": "",
      //         "customerId": "customer4",
      //         "customerClass": "customerclassfour"
      //     },
      //     {
      //         ":path": "/content/piramalfinance-edge/cf/happy-customer/jcr:content/row_1116482712",
      //         "customerImage": "/content/dam/piramalfinance/homepage/testimonials/nirmal-dand.webp",
      //         "customerDetails": "We are in the business of financial planning but the day I finalized my property, I needed to get a loan I found Piramal Finance to be the best option. They cater to all the requirements of their customers and helped me at every single step to get a business loan.",
      //         "customerDetailsClass": "",
      //         "customerName": "Nirmal Dand",
      //         "customerNameClass": "",
      //         "customerProfession": "Financial Planner",
      //         "customerProfessionClass": "",
      //         "customerId": "customer2",
      //         "customerClass": "customerclasstwo"
      //     },
      //     {
      //         ":path": "/content/piramalfinance-edge/cf/happy-customer/jcr:content/row_1065156299",
      //         "customerImage": "/content/dam/piramalfinance/homepage/testimonials/uday-biradar.webp",
      //         "customerDetails": "I and my family were planning on buying a new home for which we needed a loan and I chose Piramal Capital & Housing Finance. From collecting documents to guiding me at every step, Piramal has been a strong support system through the process.",
      //         "customerDetailsClass": "",
      //         "customerName": "Uday Biradar",
      //         "customerNameClass": "",
      //         "customerProfession": "Software Director",
      //         "customerProfessionClass": "",
      //         "customerId": "customer1",
      //         "customerClass": "customerclassone"
      //     }
      // ]
      data.data,
      customerCard,
    );

    customerTemplate = customerTemplate.replace('{ribbononeimg}', ribbononeimg).replace('{ribbontwoimg}', ribbontwoimg).replace('{ribbonthreeimg}', ribbonthreeimg).replace('{ribbonfourimg}', ribbonfourimg);
    block.innerHTML = renderHelper([
      {
        cards,
      },
    ], customerTemplate);
  } catch (error) {
    console.warn(error);
  }

  function rotateData() {
    const customerDivs = document.querySelectorAll('.customer-info');
    const customerDataArray = [];

    customerDivs.forEach((div) => {
      const customerData = {
        imageSrc: div.querySelector('.personimg').src,
        description: div.querySelector('.comments .custinfo').textContent,
        name: div.querySelector('.comments .custname').textContent,
        custprofession: div.querySelector('.comments .custprofession').textContent,
      };
      customerDataArray.push(customerData);
    });
    rotateCustomerDataArray(customerDataArray);
  }
  if (time) {
    // var timevalue = time;
    if (typeof time === 'number') {
      time = parseInt(time);
    }
    setInterval(() => {
      rotateData();
    }, time);
  }

  function rotateCustomerDataArray(customerDataArray) {
    const lastItem = customerDataArray.pop();

    for (let i = customerDataArray.length - 1; i >= 0; i--) {
      customerDataArray[i + 1] = customerDataArray[i];
    }

    customerDataArray[0] = lastItem;

    renderData(customerDataArray);
  }

  function renderData(array) {
    const customerDivs = document.querySelectorAll('.customer-info');
    customerDivs.forEach((e, i) => {
      e.querySelector('.personimg').src = array[i].imageSrc;
      e.querySelector('.comments .custinfo').textContent = array[i].description;
      e.querySelector('.comments .custname').textContent = array[i].name;
      e.querySelector('.comments .custprofession').textContent = array[i].custprofession;
    });
  }
}
