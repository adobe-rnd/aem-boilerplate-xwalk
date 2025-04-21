import { targetObject } from './scripts/scripts.js';

window.dataLayer = window.dataLayer || [];
export function headerInteraction(click_text, menu_category, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'header_interaction',
      click_text,
      menu_category: menu_category || click_text,
      cta_position,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function footerInteraction(click_text, menu_category, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'footer_interaction',
      click_text,
      menu_category: menu_category || click_text,
      cta_position: 'footer',
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}

export function outboundClick(click_text, menu_category, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'outbound_click',
      click_text,
      menu_category,
      cta_position,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}

export function navlogin(page_type) {
  try {
    window.dataLayer.push({
      event: 'nav_login',
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function applyLoanNow(cta_category, loan_type, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'apply_loan_now',
      cta_category,
      loan_type,
      cta_position,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function ctaClick(click_text, cta_category, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'cta_click', 
      click_text,
      cta_category,
      cta_position,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function loignClick(click_text, page_type) {
  try {
    window.dataLayer.push({
      event: 'login',
      click_text,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function talkToExpert(cta_category, loan_type, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'talk_to_expert',
      cta_category,
      loan_type,
      cta_position,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function bannerClick(click_text, page_type) {
  try {
    window.dataLayer.push({
      event: 'banner_click',
      click_text,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function generateLead(form_name, loan_type, loan_amount, state, branch_city, page_type) {
  try {
    window.dataLayer.push({
      event: 'generate_lead',
      form_name,
      loan_type,
      loan_amount,
      state,
      branch_city,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function errorPopUp(form_name, loan_type, message, page_type) {
  try {
    window.dataLayer.push({
      event: 'error_pop_up',
      form_name,
      loan_type,
      error_message: message,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function thankYouPopUp(form_name, loan_type, page_type) {
  try {
    window.dataLayer.push({
      event: 'thank_you_pop_up',
      form_name,
      loan_type,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function formInteraction(loan_type, action, page_type) {
  try {
    window.dataLayer.push({
      event: 'form_interaction',
      loan_type,
      form_action: action,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function resendOtp(click_text, page_type) {
  try {
    window.dataLayer.push({
      event: 'resend_otp',
      click_text,
      page_type,
    });
  } catch (error) {
    console.warn(error);
  }
}
export function verifyOtp(click_text, page_type, user_id) {
  try {
    window.dataLayer.push({
      event: 'verify_otp',
      click_text,
      page_type,
      user_id,
    });
  } catch (error) {
    console.warn(error);
  }
}

export function faqInteraction(data) {
  try {
    const { click_text } = data;
    window.dataLayer.push({
      event: 'faq_click',
      click_text: click_text || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function documentRequiredInteraction(data) {
  try {
    const { click_text } = data;
    window.dataLayer.push({
      event: 'document_required',
      click_text: click_text || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function readMoreInteraction(data) {
  try {
    window.dataLayer.push({
      event: 'read_more',
      article_name: data.article_name || '',
      cta_position: data.cta_position || '',
      click_header: data.click_header || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function applyLoanInteraction(data) {
  try {
    window.dataLayer.push({
      event: 'apply_loan_now',
      click_text: data.click_text || '',
      loan_type: targetObject.pageName || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function keyFeaturesInteraction(data) {
  try {
    window.dataLayer.push({
      event: 'key_features',
      click_text: data.click_text || '',
      cta_position: data.cta_position || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function ctaClickInteraction(data) {
  try {
    window.dataLayer.push({
      event: 'cta_click',
      click_text: data.click_text || '',
      cta_position: data.cta_position || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function documentDownloadInteraction(data) {
  try {
    const { click_text } = data;
    window.dataLayer.push({
      event: 'download_document',
      click_text: click_text || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function locateMeInteraction() {
  try {
    window.dataLayer.push({
      event: 'locate_me',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function selectBranchInteraction(data) {
  try {
    const { branch_name, cta_position } = data;
    window.dataLayer.push({
      event: 'select_branch',
      branch_name: branch_name || '',
      cta_position: cta_position || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function intertextLinkingInteraction(data) {
  try {
    const { click_text } = data;
    window.dataLayer.push({
      event: 'intertext_linking',
      click_text: click_text || '',
      page_type: targetObject.pageName || '',
    });
  } catch (error) {
    console.warn(error);
  }
}

export function lpOtpValidate(click_text,loan_type,page_type){
  try {
    window.dataLayer.push({
      event: 'LP_otp_validate',
      click_text: click_text || '',
      loan_type: loan_type || '',
      page_type: page_type || '' 
      });
  } catch (error) {
      console.warn(error); 
  }
}
