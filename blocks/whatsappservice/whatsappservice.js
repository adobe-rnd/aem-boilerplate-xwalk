export default function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);
  const renderWhatsAppHTML = renderWhatsAppFactory(props, block);
  block.innerHTML = renderWhatsAppHTML;
}

function renderWhatsAppFactory(props, block) {
  const [frontaImage, description, buttonText, buttonHref, placholder, spantext, uppertext, submitText, tnc, checkbox] = props;

  const checboxHtml =
    checkbox?.textContent.trim() === "true"
      ? `<div class="checkbox-field">
            <label class="cmp-form-options__field-label">
                <input class="cmp-form-options__field cmp-form-options__field--checkbox" name="tnc" value="tnc"
                    type="checkbox">
                <span class="cmp-form-options__field-description">
                    ${tnc.innerHTML}
                </span>
            </label>
            </div>`
      : "";

  const html = `<div class="whats-app-service">
    <div class="front-image">${frontaImage.innerHTML}</div>
    <div class="description">${description.innerHTML}</div>

    <div class="mobile-button">
        <a href="${buttonHref.textContent.trim()}">
            <button>${buttonText.innerHTML}</button>
        </a>
    </div>

    <div class="input-field">

        <div class="cmp-form-text">
            <label for="form-text-1975602141">${uppertext.textContent.trim()}</label>
            <span class="inptContainer"><span class="countryCode">${spantext.textContent.trim()}</span>
                <input class="cmp-form-text__text" data-cmp-hook-form-text="input" type="text" id="form-text-1975602141"
                    placeholder="${placholder.textContent.trim()}" name="number" spellcheck="true"
                    aria-describedby="form-text-1975602141-helpMessage">
            </span>
        </div>

        <div class="button desktopButton">
            <button type="button" id="button" class="cmp-button" disabled="">
                <span class="cmp-button__text">${submitText.textContent.trim()}</span>
            </button>
        </div>
    </div>

    ${checboxHtml}
    
</div>`;

  return html;
}
