import { fetchAPI } from "../../scripts/scripts.js";

let data;
export default async function getSelectedLanguage(selectedLanguage, apiUrl = '/api/neeyat-muti-lang.json') {
    if (!data) {
        const resp = await fetchAPI('GET', apiUrl);
        data = await resp.json();
    }
    const selectedLanguageData = data.data.filter(data => (selectedLanguage.toLowerCase() === data.language.toLowerCase()))
    if (selectedLanguageData.length) {
        return selectedLanguageData[0]
    }
    return data.data.filter(data => (data.language === 'english'))[0];
}