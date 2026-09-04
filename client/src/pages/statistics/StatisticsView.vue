<template>
  <el-col v-loading="isLoading">
    <h1>
        {{ $i18n.t('titles.statisticsPageH1') }}
    </h1>
    <StatisticsChart v-if="statistics.length" :statistics="statistics" />
    <el-empty v-else :image-size="200" description="No data"></el-empty>
  </el-col>
</template>

<script>
import StatisticsChart from '@/components/statistics-chart/StatisticsChart.vue'
import statsApi from './api'

export default {
  data () {
    return {
      statistics: [],
      isLoading: false
    }
  },
  components: {
    StatisticsChart
  },
  methods: {
    async getStatistics () {
      /** Включаем отображение спинера */
      this.isLoading = true
      try {
        /** Загружаем статистику */
        const stats = await statsApi.fetchStatisticUsage()
        this.statistics = [...stats]
      } catch (err) {
        console.log(err)
      } finally {
        /** отключаем отображение спинера */
        /** Установим задержку для демонстрации работы лоадера */
        setTimeout(() => { this.isLoading = false }, 1500)
      }
    }
  },
  mounted () {
    this.getStatistics()
  }
}
</script>
