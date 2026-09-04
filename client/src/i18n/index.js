import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
import ruLocaleDictionary from './ru-locale'
import enLocaleDictionary from './en-locale'

// Регистрация плагина VueI18n
Vue.use(VueI18n)

// Создание экземпляра VueI18n с настройками языка
const i18n = new VueI18n({
  // Язык по умолчанию
  locale: 'en',
  // Язык, используемый при отсутствии перевода
  fallbackLocale: 'ru',
  // Словари переводов для каждого языка + переводы Element UI
  messages: {
    en: enLocaleDictionary,
    ...enLocale,
    ru: ruLocaleDictionary,
    ...ruLocale
  }
})

// Интеграция с Element UI: передача функции перевода в компоненты Element UI
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
