export default function decorate(block) {
  // document.head += (block.textContent);

  // const schema = {
  //   "@context": "https://schema.org",
  //   "@type": "Organization",
  //   "name": "Apply for a Home loan online with Piramal Finance 1 ",
  //   "url": "https://www.piramalfinance.com/",
  //   "logo": "/",
  //   "contactPoint": {
  //     "@type": "ContactPoint",
  //     "telephone": "1800-266-9777",
  //     "contactType": "customer service",
  //     "areaServed": "IN",
  //     "availableLanguage": "en"
  //   },
  //   "sameAs": [
  //     "https://www.facebook.com/pf",
  //     "https://twitter.com/pf",
  //     "https://www.instagram.com/pf/",
  //     "https://www.youtube.com/pfInsurance",
  //     "https://www.linkedin.com/company/pf"
  //   ]
  // }
  const script = document.createElement('script')
  script.type = "application/ld+json";
  script.innerHTML = block.textContent;
  block.innerHTML = '';
  document.head.append(script)
}