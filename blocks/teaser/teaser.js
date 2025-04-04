import{applyLoanNow as j,bannerClick as B,ctaClick as F,ctaClickInteraction as s,readMoreInteraction as G}from"../../dl.js";import{targetObject as o,handleOpenFormOnClick as W}from"../../scripts/scripts.js";export function decorateButtons(...r){return r.map(e=>{const a=e.querySelector("a");return a?(a.classList.add("button"),a.parentElement.tagName==="EM"&&a.classList.add("secondary"),a.parentElement.tagName==="STRONG"&&a.classList.add("primary"),a.outerHTML):""}).join("")}function f(r){const e=document.createElement("a");return e.href=r.innerText.trim(),e}export function generateTeaserDOM(r,e){document.createElement("a").classList.add("null-dom");const[l,b,d,x,y,p,v,$,I,Q,C,H,_,V,S,A,E,X,T,D,q]=r,m=l.querySelector("picture"),w=b.querySelector("picture"),N=p.textContent.trim()!=="",u=C.querySelector("a")||f(C),g=S.querySelector("a")||f(S),h=T.querySelector("a")||f(T);u.innerHTML=I.innerHTML,g.innerHTML=_.innerHTML,h.innerHTML=E.innerHTML;const O=m?.querySelector("img")?.src&&m?.querySelector("img").src?` style='background-image:url(${m?.querySelector("img").src})' `:"",P=q?.querySelector("img")?.src?` style='background-image:url(${q?.querySelector("img")?.src})' `:"";let L=O;o.isTab&&(L=P);const i=document.createRange().createContextualFragment(`
    <div class='background' ${L}'>
      <div class="front-picture">${w?w.outerHTML:""}</div>
      <div class='foreground'>
        <div class='text'>
          ${d.textContent.trim()!==""?`<div class='eyebrow'>${d.textContent.trim()}</div>`:""}
          <div class='title'>${x.innerHTML}</div>
          <div class='long-description'>${y.innerHTML}</div>
          <!-- <div class='short-description'>${N?p.innerHTML:y.innerHTML}</div>-->
          <div class='short-description'>${p.innerHTML}</div>
          <div class='cta-image-wrapper'>
            <div class="img-with-text-wrap">
              <div class="cta-image">${u?u.outerHTML:""}</div>
              <p class="cta-text">${H.innerText}</p>
            </div>
            <div class="img-with-text-wrap">
              <div class="cta-image">${g?g.outerHTML:""}</div>
              <p class="cta-text">${A.innerText}</p>
            </div>
            <div class="img-with-text-wrap">
              <div class="cta-image">${h?h.outerHTML:""}</div>
              <p class="cta-text">${D.innerText}</p>
            </div>
          </div>
          <div class='cta'>${decorateButtons(v,$)}</div>
        </div>
        <div class='spacer'></div>
      </div>
  `),k=[...e].find(n=>n.startsWith("bg-"));k&&i.querySelector(".foreground").style.setProperty("--teaser-background-color",`var(--${k.substr(3)})`),i?.querySelectorAll("a").forEach((n,M)=>{n.addEventListener("click",function(t){try{if(t.target.closest(".calc-desktop-carousel-wrapper"))if(this.closest(".carousel-articles-wrapper"))J(t);else if(this.closest(".csr-committee-wrapper"))K(t);else if(t.target.closest(".media-cards-wrapper")){const c={};c.click_text=t.target.closest(".long-description").querySelector("p").textContent.trim(),c.cta_position=t.target.closest(".section").querySelector(".tab-name-wrapper .carousel-inner .active").textContent.trim(),s(c)}else if(t.target.closest(".calc-desktop-carousel-wrapper")){const c={};c.click_text=t.target.closest(".text").querySelector(".long-description p").textContent.trim(),c.cta_position=t.target.closest(".section").querySelector(".default-content-wrapper").textContent.trim(),s(c)}else j(`${d.textContent.trim()} ${x.textContent.trim()}`,o.pageName,"banner",o.pageName);else{if(t.target.closest(".multi-calc-teaser-wrapper")||(M||t.target.closest(".cta"))&&B(t.target.innerText,o.pageName),t.target.closest(".multi-calc-teaser-wrapper")){const c=t.target.textContent.trim(),R="",U=t.target.closest(".foreground").querySelector(".long-description").querySelector("p").textContent.trim();F(c,U,R,o.pageName)}if(t.target.closest(".open-form-on-click")){const c=t.target.closest(".open-form-on-click");W(c)}}}catch(c){console.warn(c)}})});try{[...e]?.includes("click-able")&&i.children[0].addEventListener("click",function(M){try{if(this.closest(".section.board-of-directors-wrapper")){const t={};t.click_text=this.querySelector(".title").textContent.trim(),t.cta_position=this.closest(".section").querySelector(".default-content-wrapper").querySelector("h1, h2, h3, h4, h5, h6").textContent.trim(),s(t)}}catch(t){console.warn(t)}location.href=v.innerText})}catch{}return i}export default function z(r){const e=[...r.children].map(l=>l.firstElementChild),a=generateTeaserDOM(e,r.classList);r.textContent="",r.append(a)}function J(r){const e={};e.article_name=r?.target.getAttribute("href").split("/").pop(),e.cta_position=r?.target.closest(".section").querySelector(".default-content-wrapper").querySelector("h1, h2, h3, h4, h5, h6").textContent.trim(),e.click_header=r?.target.textContent.trim(),G(e)}function K(r){const e={};e.click_text=r.target.textContent.trim(),e.cta_position=r.target.closest(".section").querySelector(".default-content-wrapper").querySelector("h1, h2, h3, h4, h5, h6").textContent.trim(),s(e)}

  