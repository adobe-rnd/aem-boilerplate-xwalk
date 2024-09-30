
export function imgWithLinkAnalytics(createDiv) {
  createDiv?.addEventListener("click", function (e) {
    try {
      const click_text = click_textel.innerText.trim();
      const menu_category = menu_categoryel.innerText.trim();
      if (block.closest(".footer") && click_text && menu_category) outboundClick(click_text, menu_category, "footer", targetObject.pageName);
      if (block.closest(".download-piramal-wrapper") && click_text && menu_category) ctaClick(click_text, menu_category, menu_category, targetObject.pageName);
    } catch (error) {
      console.warn(error);
    }
  })
}