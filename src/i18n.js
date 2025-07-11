import i18next from 'i18next';

import en from './locales/en.json';
import tr from './locales/tr.json';

import { store } from './store/index.js';

const currentLang = store.getState().settings.language || 'en';

i18next.init({
  lng: currentLang,     
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    tr: { translation: tr }
  }
});

export default i18next;
