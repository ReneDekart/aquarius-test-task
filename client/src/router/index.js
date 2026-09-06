/** Импортируем Vue, роутер,
 * макеты, компоненты страниц приложения, локализацию i18n
 * */
import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AccessPointsView from '@/pages/access-points/AccessPointsView.vue'
import StatisticsView from '@/pages/statistics/StatisticsView.vue'
import i18n from '@/i18n'
import WelcomeLayout from '@/layouts/WelcomeLayout.vue'

/** Регистрируем плагин vue-router */
Vue.use(VueRouter)

/**
 * =====================
 *  ОСНОВНЫЕ МАРШРУТЫ:
 * =====================
 * ''  - стартовая страница
 * '/'  - коневой маршрут приложения
 *  -- '/access-points'           - страница точек доступа
 *  -- '/statistics'              - страница статистики
 */

/**
 * =====================
 *  МАКЕТЫ:
 * =====================
 * 'WelcomeLayout'            - используется только на стартовой
 * 'DefaultLayout'            - основной макет всего приолжения
 */

const routes = [
  {
    path: '', // пустой путь — стартовая (приветственная) страница
    name: 'welcome', // Уникальное имя для стартовой старницы
    component: WelcomeLayout, // Макет для стартовой
    meta: { title: 'Aquarius WLC' } // Заголовок тсартовой страницы
  },
  {
    path: '/', // корневой путь приложения
    name: 'home',
    meta: { title: 'routes.home.title' }, // заголовок страницы тянем из локали
    redirect: { name: 'access-points' }, // редиректим сразу на страницу с таблицей точек доступа
    component: DefaultLayout, // Дефолтный макет страниц для дочерних маршрутов
    children: [
      {
        name: 'access-points',
        path: '/access-points', // URL страницы с таблицей точек доступа
        component: AccessPointsView, // компонент страницы точек доступа
        meta: { title: 'routes.accessPointsPage.title' } // Заголовок страницы тянем из локали
      },
      {
        name: 'statistics',
        path: '/statistics', // URL страницы статистики
        component: StatisticsView, // компонент страницы статистики
        meta: { title: 'routes.statistics.title' } // Заголовок страницы тянем из локали
      }
    ]
  }
]

/** Создаем экземпляр роутера с history mode */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/** После каждого перехода
 * тянем перевод заголовка из локали
 * и обновляем заголовок страницы
*/
router.afterEach((to) => {
  document.title = to.meta.title || 'Aquarius WLC'

  Vue.nextTick(() => {
    const titleKey = to.meta.title
    if (titleKey) {
      document.title = i18n.t(titleKey)
    }
  })
})

export default router
