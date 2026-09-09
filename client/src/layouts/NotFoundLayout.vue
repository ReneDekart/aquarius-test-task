<!--
  ============================================================
  NotFoundLayout.vue
  ============================================================
   Страница 404
  ============================================================
-->
<template>
  <el-container direction="vertical" class="notfound-layout__wrapper">
    <el-header>
      <!-- Переключатель языка в шапке страницы -->
      <LangSwitcher />
    </el-header>
    <el-main>
      <el-container justify="center" direction="vertical" align="center">
        <!-- Логотип продукта -->
        <img src="@/assets/images/aquarius.svg" class="notfound-layout__logo-img"/>
        <el-col class="welcome-layout__content-wrapper">
          <h1>{{ $i18n.t('singleWords.notFound') }}</h1>
          <router-link
            :to="{ name: 'welcome'}"
            custom v-slot="{ navigate }"
            class="notfound-layout__link-btn"
          >
            <el-button
              link
              type="primary"
              @click="navigate"
            >
              {{ $i18n.t('actions.toMain') }}
            </el-button>
          </router-link>
        </el-col>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import LangSwitcher from '@/components/lang-switcher/LangSwitcher.vue'

export default {
  name: 'NotFoundLayout',
  components: {
    LangSwitcher
  }
}
</script>

<style>
.notfound-layout__wrapper {
  background-image: url("../assets/images/services.svg"), var(--main-bg-color);
  height: 100%;
}

.notfound-layout__wrapper .el-header {
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 16px 20px;
}

.notfound-layout__content-wrapper {
  padding-top: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.notfound-layout__logo-img {
  height: 60px;
}

.notfound-layout__link-btn {
  border-radius: var(--btn-border-radius) !important;
  background-color: var(--brand-secondary-color) !important;
  border: none !important;
}

.notfound-layout__link-btn:hover {
  background-color: #52b9b8 !important;
}
</style>
