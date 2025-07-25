import { selectBranchInteraction } from '../dl.js';
import {getMetadata} from './aem.js';
import { targetObject } from './scripts.js'

export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

export function renderHelper(data, template, callBack) {
    const dom = document.createElement('div');
    dom.innerHTML = template;
    const loopEl = dom.getElementsByClassName('forName');
    Array.prototype.slice.call(loopEl).forEach((eachLoop) => {
      let templates = '';
      const localtemplate = eachLoop.innerHTML;
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          // data.forEach(function (element, index) {
          var dataItem = callBack ? callBack(element, key) : element;
          const keys = Object.keys(dataItem);
          var copyTemplate = localtemplate;
          copyTemplate.split('{').forEach((ecahKey) => {
            const key = ecahKey.split('}')[0];
            const keys = key.split('.');
            let value = dataItem;
            keys.forEach((key) => {
              if (value && value.hasOwnProperty(key)) {
                // if (key === 'data-src') {
                //   key = 'src';
                // }
                value = value[key];
              } else {
                value = '';
              }
            });
            copyTemplate = copyTemplate.replace(`{${key}}`, value);
          });
          templates += copyTemplate;
          // });
        }
      }
      eachLoop.outerHTML = templates;
    });
    return dom.innerHTML;
  }

export function fetchAPI(method, url, data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (method === 'GET') {
          const resp = await fetch(url);
          resolve(resp);
        } else if (method === 'POST') {
          data.headerJson = data.headerJson || {
            'Content-Type': 'application/json',
          };
  
          if (data.headerJson['Content-Type'] == 'remove') {
            data.headerJson['Content-Type'] = '';
          } else {
            data.headerJson['Content-Type'] = data.headerJson['Content-Type'] ? data.headerJson['Content-Type'] : 'application/json';
          }
  
          /* Optimzie Code */
          /* data.headerJson = data.headerJson || {};
          data.headerJson["Content-Type"] = data.headerJson["Content-Type"] === 'remove' ? '' : data.headerJson["Content-Type"] || "application/json"; */
  
          const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data.requestJson),
            headers: data.headerJson,
          });
          const response = await fetch(request);
          const json = await response.json();
          resolve({ responseJson: json });
        }
      } catch (error) {
        console.warn(error);
        reject(error);
      }
    });
  }

  export function getProps(block, config) {
    return Array.from(block.children).map((el, index) => {
      if (config?.picture) {
        return el.innerHTML.includes('picture') ? el.querySelector('picture') : el.innerText.trim();
      } if (config?.index && config?.index.includes(index)) {
        return el;
      }
      return el.innerHTML.includes('picture') ? el.querySelector('img').src.trim() : el.innerText.trim();
    });
  }

  export function currenyCommaSeperation(x) {
    if (typeof x === 'number') {
      x = x.toString();
    }
  
    // Split the number into integral and decimal parts
    const parts = x.split('.');
    let integralPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : '';
  
    // Add commas after every two digits from the right in the integral part
    integralPart = integralPart.replace(/\d(?=(\d{2})+\d$)/g, '$&,');
  
    return integralPart + decimalPart;
  }

  export function createCarousle(block, prevButton, nextButton) {
    block.parentElement ? block.parentElement.append(prevButton) : block.append(prevButton);
    block.parentElement ? block.parentElement.append(nextButton) : block.append(nextButton);
    prevButton.addEventListener('click', function (e) {
      targetObject.carouselButton = this;
      targetObject.carouselButton.disabled = true;
      prevSlide(e);
    });
    targetObject.carouselButton = prevButton;
    nextButton.addEventListener('click', function (e) {
      targetObject.carouselButton = this;
      targetObject.carouselButton.disabled = true;
      nextSlide(e);
    });
    if (block.querySelectorAll('.carousel-item').length < 4 && !targetObject.isMobile) {
      prevButton.classList.add('dp-none');
      nextButton.classList.add('dp-none');
    }
    let currentSlide = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    const carousel = block;
    const carouselInner = block.querySelector('#carouselInner');
    const slides = block.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
  
    let visibleSlides = getVisibleSlides(); // Get initial number of visible slides
  
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);
    carousel.addEventListener('mousemove', drag);
  
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('touchmove', drag);
  
    carousel.addEventListener('wheel', scrollEvent); // Add scroll event listener
    function carouselResizeEventHandler() {
      visibleSlides = getVisibleSlides();
      setPositionByIndex();
    }
  
    window.addEventListener('resize', () => {
      targetObject.isTab = window.matchMedia('(max-width: 1024px)').matches;
      carouselResizeEventHandler();
    });
  
    function dragStart(event) {
      isDragging = true;
      startPos = getPositionX(event);
      carouselInner.style.transition = 'none';
    }
  
    function dragEnd() {
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;
  
      if (movedBy < -100) {
        nextSlide();
      } else if (movedBy > 100) {
        prevSlide();
      } else {
        setPositionByIndex();
      }
      targetObject.carouselButton.disabled = false;
    }
  
    function drag(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
        carouselInner.style.transform = `translateX(${currentTranslate}px)`;
      }
    }
  
    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
  
    function getVisibleSlides() {
      if (targetObject.isMobile) {
        return 2;
      } if (targetObject.isTab) {
        return 3;
      }
      return 4;
    }
  
    function showSlide(index) {
      if (index >= slides.length) {
        // currentSlide = 0;
      } else if (index < 0) {
        // currentSlide = slides.length - 1;
      } else {
      }
      currentSlide = Math.max(0, Math.min(index, totalSlides - visibleSlides));
      setPositionByIndex();
      // console.log("targetObject.carouselButton :: ", targetObject.carouselButton);
      targetObject.carouselButton.disabled = false;
    }
  
    const setPositionByIndex = targetObject.isTab
      ? function () {
        // Tab
        currentTranslate = (currentSlide * -carouselInner.clientWidth) / (block.closest('.carousel-3pt5') ? 2 : visibleSlides);
        // console.log("currentSlide :: ", currentSlide);
        // console.log("-carouselInner.clientWidth :: ", -carouselInner.clientWidth);
        // console.log("visibleSlides :: ", visibleSlides);
        // console.log("currentTranslate :: ", currentTranslate);
        // console.log("length :: ", slides.length);
        // console.log("check length :: ", currentSlide + 4 == slides.length);
        // console.log("targetObject.isTab :: ", targetObject.isTab);
        prevTranslate = currentTranslate;
        carouselInner.style.transition = 'transform 0.5s ease';
        if (block.closest('.carousel-3pt5') && !targetObject.isTab && currentSlide + 4 == slides.length) {
          // Desktop View Logic 3.5 carousel
          // carouselInner.style.transform = `translateX(${-600}px)`
          // carouselInner.style.transform = `translateX(${currentTranslate }px)`;
          carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`;
        } else if (block.closest('.carousel-3pt5') && targetObject.isTab && currentSlide) {
          // Tab View Logic 3.5 carousel
          if (currentSlide + 4 > slides.length) {
            // targetObject.currentTranslate = 40
            if (currentTranslate > -2100 && targetObject.currentTranslate < 50) {
              targetObject.currentTranslate = targetObject.currentTranslate ? (targetObject.currentTranslate += 340) : 40;
            }
          } else {
            targetObject.currentTranslate = 0;
          }
          carouselInner.style.transform = `translateX(${currentTranslate - targetObject.currentTranslate}px)`;
        } else if (block.closest('.carousel-3pt5') && currentSlide) {
          // Desktop View Logic 3.5 carousel
          carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`;
        } else {
          carouselInner.style.transform = `translateX(${currentTranslate}px)`;
        }
      }
      : function () {
        // Desktop
        currentTranslate = (currentSlide * -carouselInner.clientWidth) / visibleSlides;
        // console.log("currentSlide :: ", currentSlide);
        // console.log("-carouselInner.clientWidth :: ", -carouselInner.clientWidth);
        // console.log("visibleSlides :: ", visibleSlides);
        // console.log("currentTranslate :: ", currentTranslate);
        // console.log("length :: ", slides.length);
        // console.log("check length :: ", currentSlide + 4 == slides.length);
        prevTranslate = currentTranslate;
        carouselInner.style.transition = 'transform 0.5s ease';
        if (block.closest('.carousel-3pt5') && currentSlide + 4 == slides.length) {
          // carouselInner.style.transform = `translateX(${-600}px)`
          carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`;
        } else {
          carouselInner.style.transform = `translateX(${currentTranslate}px)`;
        }
      };
  
    function nextSlide(e) {
      // if (currentSlide) {
      //   nextButton.disabled = true;
      // }
      // if (e && !e.target.closest('.slide-next').classList.contains('light')) {
      showSlide(currentSlide + 1);
      checkLastChildVisibility();
      // }
    }
  
    function prevSlide() {
      // if (currentSlide) {
      //   prevButton.disabled = true;
      // }
      showSlide(currentSlide - 1);
      checkLastChildVisibility();
    }
  
    function scrollEvent(event) {
      if (event.deltaY < 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      event.preventDefault();
    }
  
    // Initialize the carousel
    showSlide(currentSlide);
  
    // Check if the last child is visible in the viewport
    function checkLastChildVisibility() {
      const lastChild = carouselInner.lastElementChild;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              nextButton.classList.add('light');
              nextButton.disabled = true;
            } else {
              nextButton.disabled = false;
              nextButton.classList.remove('light');
            }
          });
        },
        {
          root: carousel,
          // threshold: block.closest(".carousel-3pt5") ? 1 : 0.1,
        },
      );
  
      observer.observe(lastChild);
      checkFirstChildVisibility();
    }
    function checkFirstChildVisibility() {
      const { firstChild } = carouselInner;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              prevButton.classList.add('light');
            } else {
              prevButton.classList.remove('light');
            }
          });
        },
        {
          root: carousel,
          threshold: block.closest('.carousel-3pt5') ? 1 : 0.1,
        },
      );
  
      observer.observe(firstChild);
    }
  
    // Initialize the observer for the first time
    checkLastChildVisibility();
  }
  
  export function createButton(text, picture) {
    const button = document.createElement('button');
    button.classList.add('carousel-control', text);
    button.innerHTML = picture;
    return button;
  }

  export function decorateViewMore(block) {
    const section = block.closest('.section');
    if (!section.classList.contains('view-more-btn')) return;
  
    const displayCount = parseInt(Array.from(section.classList)
      .find((cls) => cls.endsWith('-item-display'))
      ?.replace('-item-display', '') || '0');
  
    const items = block.classList.contains('columns')
      ? block.children
      : block.parentElement.parentElement.children;
  
    const toggleVisibility = (showAll = false) => {
      [...items].forEach((item, index) => {
        item.classList.toggle('dp-none', !showAll && index >= displayCount);
      });
    };
  
    toggleVisibility();
  
    const viewBtn = section.querySelector('.default-content-wrapper .button-container');
    const viewLink = viewBtn.querySelector('a');
  
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isViewMore = viewLink.textContent.trim().toLowerCase() === 'view more';
      toggleVisibility(isViewMore);
      if (isViewMore) {
        viewLink.textContent = 'View less';
        viewLink.classList.add('view-less-more-column');
      } else {
        viewLink.textContent = 'View more';
        viewLink.classList.remove('view-less-more-column');
        scrollToComponentNearBranch(section);
      }
    });
  }

  export function decodeHtmlSymbols(str) {
    // Create a temporary DOM element
    let textarea = document.createElement('textarea');
    // Set the input string as the element's inner HTML
    textarea.innerHTML = str;
    // The browser automatically decodes any HTML entities in the innerHTML property
    return textarea.value;
  }

  function scrollToComponentNearBranch(component) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.scroll({
        top: component.offsetTop + 20,
        left: 0,
        behavior: 'smooth',
      });
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
      window.scroll({
        top: component.offsetTop + 20,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      window.scroll({
        top: component.offsetTop - 30,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  export function moveInstrumentation(from, to) {
    moveAttributes(
      from,
      to,
      [...from.attributes].map(({ nodeName }) => nodeName).filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
    );
  }

export const body = document.querySelector('body');

export function showingStateCity(searchInputAll) {
    searchInputAll.forEach((eachinput) => {
      eachinput.parentElement.querySelectorAll('[data-info]').forEach((eachLi) => {
        eachLi.classList.remove('dp-none');
      });
    });
  }

  export function getDay() {
    const date = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayOfWeek = daysOfWeek[date.getDay()];
    return currentDayOfWeek;
  }

  export function branchURLStr(location = '', city = '', state = '', urlstrhand, locationcode = '') {
    // const sanitizeString = (str) => str?.replace(/\s+|[()\/]/g, (match) => (match.trim() ? '' : '-')).toLowerCase().trim();
  
    const sanitizeString = (str) => {
  
      // Convert to lowercase and trim whitespace
      let cleaned = str.toLowerCase().trim();
  
      // Replace unwanted spaces around dashes and parentheses
      cleaned = cleaned.replace(/\s*-\s*/g, '-')    // Normalize dashes
        .replace(/\s*\(\s*/g, '-')  // Replace opening parenthesis with a dash
        .replace(/\s*\)\s*/g, '')   // Remove closing parenthesis with spaces
        .replace(/\s+/g, '-');      // Replace spaces with dashes
  
      // Replace multiple dashes with a single dash
      cleaned = cleaned.replace(/-+/g, '-');
  
      // Remove leading and trailing dashes
      return cleaned.replace(/^-+|-+$/g, '');
  
    }
  
  
    const locationAdd = sanitizeString(location);
    const cityStr = sanitizeString(city);
    const stateStr = sanitizeString(state);
  
    const urlMap = {
      shorthand: () => `${getMetadata("lang-path")}/branch-locator/${stateStr}/${cityStr}`,
      shorthandstate: () => `${getMetadata("lang-path")}/branch-locator/${stateStr}`,
      loans: () => {
        const baseUrl = `${getMetadata("lang-path")}/branch-locator/loans-in-`;
        const isLocationSameAsCity = locationAdd === cityStr;
        const segments = isLocationSameAsCity
          ? [cityStr, stateStr, locationcode]
          : [locationAdd, cityStr, stateStr, locationcode];
  
        return baseUrl + segments.join('-');
      }
    };
  
    return urlMap[urlstrhand]?.();
  }

  export function selectBranchDetails(block) {
    const cards = block.closest('.section').querySelectorAll('.branch-list-wrapper a');
    cards.forEach((card) => {
      try {
        card.addEventListener('click', (e) => {
          const dataAnalytics = {};
          dataAnalytics.cta_position = e.target.closest('.cards-branches-container ')?.querySelector('.title h2')?.textContent.trim();
          dataAnalytics.branch_name = e.target.closest('.card-box')?.querySelector('.card-title')?.textContent.trim().replace(/\s+/g, ' ');
          selectBranchInteraction
          (dataAnalytics);
        });
      } catch (error) {
        console.warn(error);
      }
    })
  }

  export function calculatorFlatStrLogic(data) {
    var mainObj = {};
  
    data.forEach(function (eachData) {
      const { Fieldset, Name, Type, Value, ID } = eachData;
  
      if (Fieldset) {
        if (!mainObj[Fieldset]) {
          mainObj[Fieldset] = {};
        }
  
        if (Type === "loanamout") {
          if (!mainObj[Fieldset].loanamout) {
            mainObj[Fieldset].loanamout = [];
          }
  
          let loanItem = mainObj[Fieldset].loanamout[ID];
          if (!loanItem) {
            loanItem = {};
            mainObj[Fieldset].loanamout[ID] = loanItem;
          }
  
          loanItem[Name] = Value;
        } else if (Type === "array") {
          mainObj[Fieldset][Name] = [];
        } else {
          mainObj[Fieldset][Name] = Value;
        }
      } else {
        mainObj[Name] = Value;
      }
    });
  
    return mainObj;
  }

  export async function CFApiCall(cfurl) {
    const response = await fetchAPI('GET', cfurl);
    const responseJson = await response.json();
    return responseJson;
  }

  export function groupAllKeys(array) {
    return array.reduce((result, current) => {
      for (let key in current) {
        // Convert key to lowercase and replace spaces with hyphens for consistent key names
        let formattedKey = key.toLowerCase().replace(/\s+/g, '-');
        // If the key doesn't exist in the result object, initialize it with an empty array
        if (!result[formattedKey]) {
          result[formattedKey] = [];
        }
  
        // Push the current value of the key into the array
        let currnetKeyFirstName = '';
        if (current[key].includes('-')) {
          currnetKeyFirstName = current[key].split('-')[0].trim();
        } else {
          currnetKeyFirstName = current[key].trim();
        }
  
        if (!result[formattedKey].includes(currnetKeyFirstName)) {
          result[formattedKey].push(currnetKeyFirstName);
        }
      }
      return result;
    }, {});
  }