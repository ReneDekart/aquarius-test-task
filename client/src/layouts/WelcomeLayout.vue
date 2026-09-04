<template>
  <el-container direction="vertical" class="welcome-layout__wrapper">
    <el-header>
      <LangSwitcher />
    </el-header>
    <el-main>
      <el-container justify="center" direction="vertical" align="center">
        <img src="@/assets/images/aquarius.svg" class="welcome-layout__logo-img"/>
        <el-col class="welcome-layout__content-wrapper">
          <h1>Auqarius WLC</h1>
          <span>{{ $i18n.t('singleWords.version') }} 2.048.36P15</span>
          <router-link
            :to="{ name: 'home'}"
            custom v-slot="{ navigate }"
            class="welcome-layout__link-btn"
          >
            <el-button
              link
              type="primary"
              @click="navigate"
            >
              {{ $i18n.t('actions.goToControl') }}
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
  components: {
    LangSwitcher
  }
}
</script>

<style>
.welcome-layout__wrapper {
  background-image: url("../assets/images/services.svg"), var(--main-bg-color);
  height: 100%;
}

.welcome-layout__wrapper .el-header {
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 16px 20px;
}

.welcome-layout__content-wrapper {
  padding-top: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.welcome-layout__logo-img {
  height: 60px;
}

.welcome-layout__link-btn {
  border-radius: var(--btn-border-radius) !important;
  background-color: var(--brand-secondary-color) !important;
  border: none !important;
}

.welcome-layout__link-btn:hover {
  background-color: #52b9b8 !important;
}
</style>
