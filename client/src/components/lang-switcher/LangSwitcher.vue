<!--
============================================================
 LangSwitcher.vue
============================================================
 Компонент переключения текущей локали
 Содержит el-dropdown-menu с выводом доступных языков
============================================================
-->
<template>
<el-dropdown
  class="lang-switcher"
  trigger="click"
  @command="changeLanguage"
>
  <el-button
    type="primary"
    size="small"
    circle
    >
      {{ currentLang }}
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item
        v-for="lang in languages"
        :key="lang.value"
        :command="lang.value"
        :disabled="$i18n.locale === lang.value"
      >
        {{ lang.label }}
      </el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>

<script>
export default {
  data () {
    return {
      /** список языков для выбора */
      languages: [
        { value: 'ru', label: 'Русский' },
        { value: 'en', label: 'English' }
      ]
    }
  },
  computed: {
    /** текущий язык */
    currentLang () {
      return this.$i18n.locale.toLocaleUpperCase()
    }
  },
  methods: {
    /** Меняем язык локали */
    changeLanguage (langCode) {
      this.$i18n.locale = langCode
    }
  }
}
</script>

<style>
.lang-switcher .el-button {
  background-color: var(--brand-secondary-color);
  border: none !important;
}

.lang-switcher .el-button:hover, .lang-switcher .el-button:focus {
  background-color: #66d5d3;
}
</style>
