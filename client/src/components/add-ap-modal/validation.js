import i18n from '@/i18n'
import locales from './locales'

export function getValidations () {
  /** Расширяем локализацию */
  Object.keys(locales).forEach(locale => {
    i18n.mergeLocaleMessage(locale, locales[locale])
  })

  /** Возвращаем объект
   * с настрофками валидайии
   * полей формы\
   * */
  return {
    name: [
      {
        required: true,
        message: i18n.t('fieldValidationErrors.name.isEmpty'),
        trigger: 'blur'
      },
      {
        min: 3,
        max: 50,
        message: i18n.t('fieldValidationErrors.name.invalidLength'),
        trigger: 'blur'
      }
    ],

    model: [
      {
        required: true,
        message: i18n.t('fieldValidationErrors.model.isEmpty'),
        trigger: 'blur'
      },
      {
        min: 3,
        max: 50,
        message: i18n.t('fieldValidationErrors.model.invalidLength'),
        trigger: 'blur'
      }
    ],

    ip: [
      {
        required: true,
        message: i18n.t('fieldValidationErrors.ip.isEmpty'),
        trigger: 'blur'
      },
      {
        pattern: /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/,
        message: i18n.t('fieldValidationErrors.ip.invalidIp'),
        trigger: 'blur'
      }
    ],

    band: [
      {
        required: true,
        message: i18n.t('fieldValidationErrors.band.isEmpty'),
        trigger: 'change'
      }
    ],

    location: [
      {
        required: true,
        message: i18n.t('fieldValidationErrors.location.isEmpty'),
        trigger: 'blur'
      },
      {
        min: 3,
        max: 50,
        message: i18n.t('fieldValidationErrors.location.invalidLength'),
        trigger: 'blur'
      }
    ]

  }
}

/** Возвращает текст плейсхолдеров в зависимости от локали */
export function getPlaceholders () {
  return {
    ip: i18n.t('fieldPlaceHolders.ip'),
    band: i18n.t('fieldPlaceHolders.band'),
    name: i18n.t('fieldPlaceHolders.name'),
    location: i18n.t('fieldPlaceHolders.location'),
    model: i18n.t('fieldPlaceHolders.model')
  }
}
