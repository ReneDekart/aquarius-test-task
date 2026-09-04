import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import i18n from './i18n/index.js'
import http from './api/http.js'

import '@/assets/styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/common.css'
import '@/assets/styles/element-variables.css'

/** Убираем сообщение в консоли о режиме разработки */
Vue.config.productionTip = false

/** Регистрируем плагин для работы с либой Element-ui */
Vue.use(ElementUI)

/** Регистрируем обертку для работы с запросами */
Vue.prototype.$http = http

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
