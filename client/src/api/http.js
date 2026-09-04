import axios from 'axios'

// Создаем экземпляр axios и настраиваем
const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Перехватчик запросов
http.interceptors.request.use(
  (config) => {
    /** Авторизации и прочих особенностей
     * в тестовом задании нет,
     * поэтому настройку конфига можно опустить
     * */
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Перехватчик ответов
http.interceptors.response.use(
  (response) => {
    // Для удобства будем возвращать сразу данные
    return response.data
  },
  (error) => {
    // Обработка ошибок
    /** TODO: Доработать обработку ошибок, если останется время */
    if (error.response) {
      switch (error.response.status) {
        case 500:
          console.error('Ошибка сервера (500)')
          break
        case 400:
          console.error('Ошибка в запросе (404)')
          break
        case 404:
          console.error('Не найдено (404)')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default http
