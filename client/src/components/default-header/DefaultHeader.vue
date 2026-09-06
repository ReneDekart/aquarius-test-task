<!--
============================================================
 DefaultHeader.vue
============================================================
 Компонент шапки страницы
 Содержит хлебные крошки и кнопку переключения языка
============================================================
-->
<template>
  <el-header class="default-header__container">
    <el-row type="flex" justify="space-between">
      <!-- Компонент хлебными крошками -->
      <BreadCrumbs />
      <!-- Компонент перенключения языка -->
      <LangSwitcher />
    </el-row>
  </el-header>
</template>

<script>
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs.vue'
import LangSwitcher from '@/components/lang-switcher/LangSwitcher.vue'

export default {
  components: {
    BreadCrumbs,
    LangSwitcher
  }
}
</script>

<style>
.default-header__container.el-header {
  background-color: var(--brand-color);
  width: 100%;
  padding: 0;
  display: flex;
}

.default-header__container.el-header .el-row {
  align-items: center;
  padding: 16px 20px;
  width: 100%;
}
</style>
