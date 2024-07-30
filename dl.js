import { targetObject } from "./scripts/scripts.js";

window.dataLayer = window.dataLayer || [];
export function headerInteraction(click_text, menu_category, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'header_interaction',
            'click_text': click_text,
            'menu_category': menu_category || click_text,
            'cta_position': cta_position,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}
export function footerInteraction(click_text, menu_category, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'footer_interaction',
            'click_text': click_text,
            'menu_category': menu_category || click_text,
            'cta_position': 'footer',
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}

export function outboundClick(click_text, menu_category, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'outbound_click',
            'click_text': click_text,
            'menu_category': menu_category,
            'cta_position': cta_position,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}

export function navlogin(page_type) {
    try {
        window.dataLayer.push({
            'event': 'nav_login',
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}
export function applyLoanNow(cta_category, loan_type, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'apply_loan_now',
            'cta_category': cta_category,
            'loan_type': loan_type,
            'cta_position': cta_position,
            'page_type': page_type,
        });
    } catch (error) {
        console.warn(error);
    }
}
export function ctaClick(click_text, cta_category, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'cta_click',
            'click_text': click_text,
            'cta_category': cta_category,
            'cta_position': cta_position,
            'page_type': page_type,
        });
    } catch (error) {
        console.warn(error);
    }
}
export function loignClick(click_text, page_type) {
    try {
        window.dataLayer.push({
            'event': 'login',
            'click_text': click_text,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}
export function talkToExpert(cta_category, loan_type, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'talk_to_expert',
            'cta_category': cta_category,
            'loan_type': loan_type,
            'cta_position': cta_position,
            'page_type': page_type,
        });
    } catch (error) {
        console.warn(error);
    }
}
export function bannerClick(click_text, page_type) {
    try {
        window.dataLayer.push({
            'event': 'banner_click',
            'click_text': click_text,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}
export function generateLead(form_name, loan_type, loan_amount, state, branch_city, page_type) {
    try {
        window.dataLayer.push({
            'event': 'generate_lead',
            'form_name': form_name,
            'loan_type': loan_type,
            'loan_amount': loan_amount,
            'state': state,
            'branch_city': branch_city,
            'page_type': page_type,
        });
    } catch (error) {
        console.warn(error);
    }
}
export function errorPopUp(form_name, loan_type, message, page_type) {
    try {
        window.dataLayer.push({
            'event': 'error_pop_up',
            'form_name': form_name,
            'loan_type': loan_type,
            'error_message': message,
            'page_type': page_type,
        });
    } catch (error) {
        console.warn(error);
    }
}
export function thankYouPopUp(form_name, loan_type, page_type) {
    try {
        window.dataLayer.push({
            'event': 'thank_you_pop_up',
            'form_name': form_name,
            'loan_type': loan_type,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}
export function formInteraction(loan_type, action, page_type) {
    try {
        window.dataLayer.push({
            'event': 'form_interaction',
            'loan_type': loan_type,
            'form_action': action,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}
export function resendOtp(click_text, page_type) {
    try {
        window.dataLayer.push({
            'event': 'resend_otp',
            'click_text': click_text,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}
export function verifyOtp(click_text, page_type, user_id) {
    try {
        window.dataLayer.push({
            'event': 'verify_otp',
            'click_text': click_text,
            'page_type': page_type,
            'user_id': user_id,
        });
    } catch (error) {
        console.warn(error);
    }
}

export function faqInteraction(data) {
    try {
        const {click_text} = data;
        window.dataLayer.push({
            'event': 'faq_click',
            'click_text': click_text || "",
            'page_type': targetObject.pageName || "",
        });
    } catch (error) {
        console.warn(error);
    }
}

export function ReadMoreInteraction(data) {
    try {
        const {} = data;
        window.dataLayer.push({
            'event': 'read_more',
            'article_name' : article_name || '',
            'cta_position' : cta_position || '',
            'click_header' : click_header || '',
            'page_type': targetObject.pageName || '',
        });
    } catch (error) {
        console.warn(error);
    }
}