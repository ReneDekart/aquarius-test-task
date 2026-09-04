export default {
  en: {
    fieldValidationErrors: {
      name: {
        isEmpty: 'Enter access point name',
        invalidLength: 'The name must be between 3 and 50 characters long.'
      },
      model: {
        isEmpty: 'Enter access point model',
        invalidLength: 'The name of model must be between 3 and 50 characters long.'
      },
      ip: {
        isEmpty: 'Enter ip-address',
        invalidIp: 'Invalid ip-address'
      },
      band: {
        isEmpty: 'Select band'
      },
      location: {
        isEmpty: 'Enter location',
        invalidLength: 'The name of location must be between 3 and 50 characters long.'
      }
    },
    fieldPlaceHolders: {
      ip: '###.###.###.###',
      band: 'Select band',
      name: 'Input access point name',
      location: 'Input access point location',
      model: 'Input access point model'
    }
  },
  ru: {
    fieldValidationErrors: {
      name: {
        isEmpty: 'Введите наименование точки доступа',
        invalidLength: 'Название должно содержать от 3 до 5000 символов'
      },
      model: {
        isEmpty: 'Введите модель точки доступа',
        invalidLength: 'Название модели должно содержать от 3 до 50 символов'
      },
      ip: {
        isEmpty: 'Введите ip-адрес',
        invalidIp: 'Некорректный ip-адрес'
      },
      band: {
        isEmpty: 'Выберите диапазон'
      },
      location: {
        isEmpty: 'Укажите локацию',
        invalidLength: 'Название локации должно содержать от 3 до 50 символов'
      }
    },
    fieldPlaceHolders: {
      ip: '###.###.###.###',
      band: 'Укажите диапазон',
      name: 'Введите наименование точки доступа',
      location: 'Укажите локацию точки доступа',
      model: 'Укажите модель точки доступа'
    }
  }
}
