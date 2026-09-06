<!--
  ============================================================
   DefaultLayout.vue
  ============================================================
   Основной макет приложения.
   Содержит:
   - боковое меню навигации (SideMenu) слева;
   - общую шапку страницы (DefaultHeader) сверху;
   - компонент маршрутизации <router-view>.
  ============================================================
-->
<template>
<el-container class="default-layout__wrapper">
  <!-- Боковое меню навигации -->
  <SideMenu />
  <el-container class="default-layout__content-wrapper" direction="vertical">
    <!-- Общая шапка приложения -->
    <DefaultHeader />
    <el-main>
      <!-- Выводим компонент активного дочернего маршрута -->
      <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import SideMenu from '@/components/side-menu/SideMenu.vue'
import DefaultHeader from '@/components/default-header/DefaultHeader.vue'

export default {
  components: {
    SideMenu,
    DefaultHeader
  }
}
</script>

<style>
.default-layout__wrapper {
  height: 100%;
}

.default-layout__content-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
