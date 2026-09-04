<template>
  <el-aside class="side-menu__wrapper">
    <el-menu
      :router=true
      :default-active="$route.path"
      class="side-menu__container"
    >
      <div class="side-menu__logo-img__wrapper">
        <img src="@/assets/images/aquarius.svg" class="side-menu__logo-img"/>
      </div>
      <el-divider class="side-menu__top__divider"/>
      <div class="side-menu__items__wrapper">
        <el-menu-item
          index="/access-points"
          :route="{ name: 'access-points' }"
          class="side-menu__item"
        >
          <i class="el-icon-s-unfold"></i>
          <span>{{ $t('routes.accessPointsPage.sideMenuTitle') }}</span>
        </el-menu-item>
        <el-menu-item
          index="/statistics"
          :route="{ name: 'statistics' }"
          class="side-menu__item"
        >
          <i class="el-icon-s-data"></i>
          <span>{{ $t('routes.statistics.sideMenuTitle') }}</span>
        </el-menu-item>
      </div>
      <el-divider class="side-menu__bottom-didvider"/>
      <div class="side-menu__control-version">
        <span>WLC</span>
        <span>{{ $i18n.t('singleWords.version') }} 2.048.36P15</span>
      </div>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.side-menu__wrapper {
  height: 100%;
}

.side-menu__container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.side-menu__control-version {
  padding: 12px;
  width: 100%;
  text-align: center;
}

.side-menu__control-version > span {
  display: block;
}

.side-menu__control-version > span:first-child {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: var(--brand-color);
}

.side-menu__control-version > span:nth-child(2) {
  font-size: 12px;
  font-weight: normal;
  text-align: center;
}

.side-menu__top__divider {
  margin: 0;
}

.side-menu__items__wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-menu-item {
  display: flex;
  align-items: center;
  color: var(--brand-color);
  font-size: 16px;
  font-weight: bold;
}

.el-menu-item.is-active {
  color: #007BB0;
}

.side-menu__bottom-didvider {
  margin: 0;
}

.side-menu__logo-img__wrapper {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.side-menu__logo-img {
  height: 20px;
}
</style>
