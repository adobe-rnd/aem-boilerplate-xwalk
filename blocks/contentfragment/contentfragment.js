export default async function decorate(blocks) {
  try {
    let cfURL = blocks.querySelector("a")?.textContent.trim();
    cfURL = cfURL?.replace("/content/dam/", "/api/assets/");
    var hardCodedVal = {
      links: [
        {
          rel: ["self"],
          href: "https://author-p133703-e1305981.adobeaemcloud.com/api/assets/piramalfinance/in/en/content-fragment/faq/location/home-loan/ahmedabad-/how-is-the-emi-calculated-for-a-home-loan-in-ahmedabad-.json",
        },
        {
          rel: ["parent"],
          href: "https://author-p133703-e1305981.adobeaemcloud.com/api/assets/piramalfinance/in/en/content-fragment/faq/location/home-loan/ahmedabad-.json",
        },
      ],
      class: ["assets/asset"],
      actions: [
        {
          method: "DELETE",
          name: "delete",
          href: "https://author-p133703-e1305981.adobeaemcloud.com/api/assets/piramalfinance/in/en/content-fragment/faq/location/home-loan/ahmedabad-/how-is-the-emi-calculated-for-a-home-loan-in-ahmedabad-",
          title: "Delete",
        },
        {
          method: "PUT",
          name: "update-fragment",
          href: "https://author-p133703-e1305981.adobeaemcloud.com/api/assets/piramalfinance/in/en/content-fragment/faq/location/home-loan/ahmedabad-/how-is-the-emi-calculated-for-a-home-loan-in-ahmedabad-",
          type: "application/json",
          title: "Update Content Fragment",
        },
      ],
      properties: {
        publishedBy: "rajashree",
        metadata: {},
        created: 1715257713711,
        description: "",
        published: 1715675350483,
        title: "How is the EMI calculated for a home loan in Ahmedabad?",
        contentFragment: true,
        createdBy: "rajashree",
        elementsOrder: ["faqAnswer"],
        elements: {
          faqAnswer: {
            variationsOrder: [],
            translatable: false,
            ":type": "text/html",
            variations: {},
            dataType: "string",
            title: "FAQ Answer",
            multiValue: false,
            value:
              "\u003Cp\u003EWhen calculating the EMI for a home loan in Ahmedabad, use this formula: P x R x (1+R)^N / [(1+R)^N-1]. Here, N stands for loan tenure, P for the principal loan amount, and R for the monthly interest rate.\u003C/p\u003E\n",
          },
        },
        name: "how-is-the-emi-calculated-for-a-home-loan-in-ahmedabad-",
        modified: 1715257732445,
        modifiedBy: "rajashree",
        "cq:model": {
          path: "/conf/piramalfinance/settings/dam/cfm/models/faq",
        },
        "srn:paging": {
          total: 0,
          offset: 0,
          limit: 20,
        },
      },
    };

    let html = `<div class="forName">
                <div id="question">
                    <div class="grid gap-6">
                        <div></div>
                        <div class="grid grid-cols-12 ">
                            <div class="col-span-10 ">
                                <div class="font-normal md:text-xl text-base text-[#333333]  cursor-pointer">{properties.title}</div>
                                <div class="hidden">
                                    <p>{properties.elements.faqAnswer.value}</p>
                                </div>
                            </div>
                            <div class="col-span-2 flex justify-end">
                                <picture><img class="cursor-pointer"
                                        src="https://cdn.piramalfinance.com/pchfweb/assets/images/webps/downArrow.webp"
                                        alt="piramal faqs" width="24px" height="24px"></picture>
                            </div>
                        </div>
                        <hr>
                    </div></div>
                </div>`;

    var newXFHtml = renderHelper([hardCodedVal], html);
    blocks.innerHTML = newXFHtml;

  } catch (error) {
    console.error(error);
  }
}

function renderHelper(data, template, callBack) {
  var dom = document.createElement("div");
  dom.innerHTML = template;
  var loopEl = dom.getElementsByClassName("forName");
  Array.prototype.slice.call(loopEl).forEach(function (eachLoop) {
    var templates = "";
    var localtemplate = eachLoop.innerHTML;
    for (var key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        var element = data[key];
        // data.forEach(function (element, index) {
        var dataItem = callBack ? callBack(element, key) : element;
        var keys = Object.keys(dataItem);
        var copyTemplate = localtemplate;
        copyTemplate.split("{").forEach(function (ecahKey) {
          var key = ecahKey.split("}")[0];
          var keys = key.split(".");
          var value = dataItem;
          keys.forEach(function (key) {
            if (value && value.hasOwnProperty(key)) {
              value = value[key];
            } else {
              value = "";
            }
          });
          copyTemplate = copyTemplate.replace("{" + key + "}", value);
        });
        templates += copyTemplate;
        // });
      }
    }
    eachLoop.outerHTML = templates;
  });
  return dom.innerHTML;
}


