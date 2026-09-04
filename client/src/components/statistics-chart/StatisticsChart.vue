<template>
  <div class="statistics-chart__wrapper">
    <div style="position: relative; height: 350px; width: 100%">
      <canvas ref="chartCanvas"></canvas>
    </div>

    <div class="statistics-chart__controls">
      <el-button
        link
        type="primary"
        class="statistics-chart__btn-start"
        :disabled="isPlaying"
        @click="play"
      >{{ isStarted ? `${ this.$i18n.t('actions.resume') }` : `${ this.$i18n.t('actions.play') }` }}</el-button>
      <el-button
        link
        type="danger"
        class="statistics-chart__btn-pause"
        :disabled="!isPlaying"
        @click="pause"
      >
        {{ $i18n.t('actions.pause') }}
      </el-button>
      <el-button
        link
        type="info"
        class="default-cancel-btn"
        @click="reset"
      >{{ $i18n.t('actions.reset') }}</el-button>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'StatisticsChart',
  props: {
    statistics: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      chartInstance: null,
      isPlaying: false,
      isStarted: false,
      durationPerBar: 3000,
      delayPerBar: 3000,
      elapsedTime: 0,
      startTime: null,
      timerId: null,
      chartData: {
        labels: this.statistics.map(item => item.hour),
        datasets: [{
          label: 'Клиенты',
          data: this.statistics.map(() => 0),
          backgroundColor: 'rgba(36, 86, 108, 0.7)',
          borderColor: 'rgba(36, 86, 108, 1)',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      realData: this.statistics.map(item => item.clients)
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    /** очищаем */
    this.clearTimer()
    if (this.chartInstance) {
      this.chartInstance.destroy()
    }
  },
  methods: {
    initChart () {
      const ctx = this.$refs.chartCanvas.getContext('2d')
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            y: {
              beginAtZero: true,
              max: Math.max(...this.statistics.map(item => item.clients)) + 1,
              ticks: { precision: 0 }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => {
                  const item = items[0]
                  return this.statistics[item.dataIndex].hour
                },
                label: (item) => `Клиенты: ${this.statistics[item.dataIndex].clients}`,
                afterLabel: (item) => this.statistics[item.dataIndex].clientIds.map(id => `- ${id}`)
              }
            }
          }
        }
      })
    },
    play () {
      if (!this.chartInstance || this.isPlaying) return

      const totalExpectedTime = (this.realData.length - 1) * this.delayPerBar + this.durationPerBar
      if (this.elapsedTime >= totalExpectedTime) {
        this.elapsedTime = 0
        this.isStarted = false
      }

      this.isPlaying = true
      this.isStarted = true
      this.startTime = Date.now() - this.elapsedTime

      this.clearTimer()
      this.timerId = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime
        this.renderFrame()
        if (this.elapsedTime >= totalExpectedTime) {
          this.isPlaying = false
          this.clearTimer()
        }
      }, 16)

      this.renderFrame()
    },
    pause () {
      if (!this.chartInstance || !this.isPlaying) return

      this.isPlaying = false
      this.clearTimer()
      this.elapsedTime = Date.now() - this.startTime
      this.renderFrame()
    },
    renderFrame () {
      const values = this.realData.map((value, index) => {
        const start = index * this.delayPerBar
        const end = start + this.durationPerBar
        if (this.elapsedTime <= start) return 0
        if (this.elapsedTime >= end) return value
        return value * ((this.elapsedTime - start) / this.durationPerBar)
      })
      this.chartData.datasets[0].data = values
      this.chartInstance.update('none')
    },
    reset () {
      if (!this.chartInstance) return

      this.isPlaying = false
      this.isStarted = false
      this.clearTimer()
      this.elapsedTime = 0
      this.renderFrame()
    },

    clearTimer () {
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = null
      }
    }
  }
}
</script>

<style scoped>
.statistics-chart__wrapper {
  width: 100%;
  margin: 30px 0;
  padding: 25px;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.statistics-chart__controls {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.statistics-chart__btn-start {
  border-radius: var(--btn-border-radius) !important;
  background-color: var(--brand-secondary-color) !important;
  border: none !important;
}

.statistics-chart__btn-start:hover:not(:disabled) {
  background-color: #52b9b8 !important;
  color: #fff !important;
}

.statistics-chart__btn-pause {
  border-radius: var(--btn-border-radius) !important;
  background-color: #f4f4f5 !important;
  border: none !important;
  color: #606266 !important;
}

.statistics-chart__btn-pause:hover:not(:disabled) {
  background-color: #606266 !important;
  color: #fff !important;
}
</style>
