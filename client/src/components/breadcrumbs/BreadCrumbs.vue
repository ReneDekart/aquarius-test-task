<template>
  <el-breadcrumb separator="/" class="bread-crumbs__wrapper">
    <el-breadcrumb-item :to="{ path: '/' }" class="bread-crumbs__item">
      <span>{{ $i18n.t('routes.home.title') }}</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="item.path"
      class="bread-crumbs__item"
    >
      <span v-if="index === breadcrumbs.length - 1">
        {{ $i18n.t(item.meta.title) }}
      </span>
      <router-link v-else :to="item.redirect || item.path">
        {{ $i18n.t(item.meta.title) }}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: []
    }
  },
  watch: {
    $route: {
      handler: 'getBreadcrumbs',
      immediate: true
    }
  },
  methods: {
    getBreadcrumbs () {
      /** Ищем совпадения */
      const matchedRoutes = this.$route.matched.filter(item => item.meta && item.meta.title)
      /** Удаляем ссылку на домашнюю, так как она захардкожена в шаблоне */
      if (matchedRoutes[0]?.name === 'home') {
        matchedRoutes.shift()
      }
      this.breadcrumbs = matchedRoutes
    }
  }
}
</script>

<style scoped>
.bread-crumbs__wrapper {
  width: auto;
  color: var(--white-color);
}

.el-breadcrumb__item:last-child .el-breadcrumb__inner span {
  color: var(--text-gray-color);
}

.bread-crumbs__item .el-breadcrumb__inner.is-link span {
  color: var(--text-light-color);
}

.bread-crumbs__item .el-breadcrumb__separator {
  color: var(--text-wlighthite-color);
}
</style>
