<!--
============================================================
 StatisticsChart.vue
============================================================
 Компонент графика отображения статистики использорвания точек доступа.
 Массив с статистикой приходит от родительского компонента
 Для каждого столбца данные загружаются по мере отрисовки предшествующего.
============================================================
-->
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
      >{{ isStarted ? `${this.$i18n.t('actions.resume')}` : `${this.$i18n.t('actions.play')}` }}
      </el-button>
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
      >{{ $i18n.t('actions.reset') }}
      </el-button>
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
    },
    aps: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      /** Экземпляр Chart.js, создаётся в initChart() */
      chartInstance: null,
      /** Флаг воспроизведения анимации в моменте */
      isPlaying: false,
      /** Флаг анимации всего цикла */
      isStarted: false,
      /** Длительность анимации роста одного столбца */
      durationPerBar: 3000,
      /** Длитеольность имитации задержки обращения к серверу */
      requestDelay: 500,
      /** Количество загруженных столбцов */
      loadedBars: 0,
      /** Данные для отображения на графике */
      chartData: {
        labels: this.statistics.map(item => item.hour),
        datasets: [{
          label: '',
          data: this.statistics.map(() => 0),
          backgroundColor: 'rgba(36, 86, 108, 0.7)',
          borderColor: 'rgba(36, 86, 108, 1)',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      /** Значения столбцов */
      realData: []
    }
  },
  mounted () {
    /** Создаём экземпляр графика */
    this.initChart()
  },
  beforeDestroy () {
    /** При уничтожении компонента отменяем ожидающий таймер
     * и унитожаем сам график
    */
    if (this.chartInstance) {
      this.chartInstance.destroy()
    }
  },
  methods: {
    /** Первоначальная инициализация графика */
    initChart () {
      /** Берём контекст канваса и создаём экземлар Chart.
       *  Дефолтные данные подставляются из this.chartData
       * */
      const ctx = this.$refs.chartCanvas.getContext('2d')
      this.chartInstance = new Chart(ctx, {
        /** Тип диаграммы — вертикальные столбцы */
        type: 'bar',
        data: this.chartData,
        options: {
          /** Подгоняем под родителя */
          responsive: true,
          /** Пропорции отключаем, делаем высоту на масимум */
          maintainAspectRatio: false,
          /** Отключаем встроенную анимацию */
          animation: false,
          scales: {
            y: {
              /** Ось Y начинается с нуля */
              beginAtZero: true,
              /** Верхняя граница оси — максимум + 1 */
              max: Math.max(...this.statistics.map(item => item.clients)) + 1,
              /** Оставляем только целые числа */
              ticks: { precision: 0 }
            }
          },
          plugins: {
            /** Скрываем легенду */
            legend: { display: false },
            tooltip: {
              /** Конфигурация тултипа:
               *  текущий часчас, количество точек и клиенты */
              callbacks: {
                /** Заголовок подсказки — час, к которому относится столбец */
                title: (items) => {
                  const item = items[0]
                  return this.statistics[item.dataIndex].hour
                },
                label: (item) => `${this.$i18n.t('singleWords.clients')}: ${this.statistics[item.dataIndex].clients}`,
                afterLabel: (item) => {
                  /** мапим клиентов */
                  const idsClient = this.statistics[item.dataIndex].clientIds.map(id => `- ${id}`)
                  /** мапим айдишники точек и подставляем названия */
                  const idsAp = this.statistics[item.dataIndex].apIds.map(id => {
                    const aps = this.aps.filter(el => el.id === id)
                    return aps.length > 0 ? `${aps[0].name}` : `- ${id}`
                  })
                  return `${idsClient.join('\n')}\n\n${this.$i18n.t('singleWords.hardware')}: ${this.statistics[item.dataIndex].apIds.length}\n${idsAp.join('\n')}`
                }
              }
            }
          }
        }
      })
    },
    /**
     * Запуск/возобновление анимации.
     */
    play () {
      if (!this.chartInstance || this.isPlaying) return

      this.isPlaying = true
      this.isStarted = true

      this.animateChart()
        .then(() => {
          this.isPlaying = false
        })
        .catch((error) => {
          this.isPlaying = false
          this.resetChart()
          console.error('Ошибка анимации графика:', error)
        })
    },
    /**
     * Возвращает цепочку промисов, в которой данные столбцов
     * загружаются порциями по одному столбцу за раз
     */
    async animateChart () {
      for (let index = this.loadedBars; index < this.statistics.length; index++) {
        /* Если значение для этого столбца ещё не получено —
          выполняем имимтацию обращения к серверу
        */
        if (index >= this.realData.length) {
          await this.getNextBarData()
        }
        await this.animateBar(index, this.realData[index])
      }
    },
    /**
     * Имитирует обращение к серверу
     * Возвращает undefined, если данных больше нет
     */
    getNextBarData () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const item = this.statistics[this.realData.length]
          if (item) {
            this.realData.push(item.clients)
            console.log('Имитация обращения к серверу')
            resolve(item.clients)
          } else {
            resolve(undefined)
          }
        }, this.requestDelay)
      })
    },
    /**
     * Анимация столбца
     */
    animateBar (index, value) {
      return new Promise((resolve, reject) => {
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
          reject(new Error(`Некорректное значение столбца ${index}`))
          return
        }

        const startTime = Date.now()
        const step = () => {
          if (!this.isPlaying) return

          const progress = Math.min((Date.now() - startTime) / this.durationPerBar, 1)
          this.setBarValue(index, value * progress)

          if (progress < 1) {
            setTimeout(step, 16)
          } else {
            this.loadedBars = index + 1
            resolve()
          }
        }

        step()
      })
    },
    /**
     * Записывает текущее значение в data конкретного столбца, обновляет график бех анимации
     */
    setBarValue (index, value) {
      this.chartData.datasets[0].data[index] = value
      this.chartInstance.update('none')
    },
    /**
     * Пауза: останавливает таймер и сбрасывает isPlaying.
     */
    pause () {
      if (!this.chartInstance || !this.isPlaying) return

      this.isPlaying = false
    },
    /**
     * Полный сброс: останавливает воспроизведение, отменяет таймер
     * и сбрасывает данные графика
     */
    reset () {
      if (!this.chartInstance) return

      this.isPlaying = false
      this.resetChart()
    },
    /**
     * Сбрасывает данные графика в нули и счётчик загруженных столбцов
     */
    resetChart () {
      this.isStarted = false
      this.loadedBars = 0
      this.realData = []
      this.chartData.datasets[0].data = []
      if (this.chartInstance) {
        this.chartInstance.update('none')
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
