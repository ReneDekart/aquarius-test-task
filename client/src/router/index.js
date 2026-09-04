import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AccessPointsView from '@/pages/access-points/AccessPointsView.vue'
import StatisticsView from '@/pages/statistics/StatisticsView.vue'
import i18n from '@/i18n'
import WelcomeLayout from '@/layouts/WelcomeLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'welcome',
    component: WelcomeLayout,
    meta: { title: 'Aquarius WLC' }
  },
  {
    path: '/',
    name: 'home',
    meta: { title: 'routes.home.title' },
    redirect: { name: 'access-points' },
    component: DefaultLayout,
    children: [
      {
        name: 'access-points',
        path: '/access-points',
        component: AccessPointsView,
        meta: { title: 'routes.accessPointsPage.title' }
      },
      {
        name: 'statistics',
        path: '/statistics',
        component: StatisticsView,
        meta: { title: 'routes.statistics.title' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Client SPA'

  Vue.nextTick(() => {
    const titleKey = to.meta.title
    if (titleKey) {
      document.title = i18n.t(titleKey)
    }
  })
})

export default router
