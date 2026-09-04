<template>
  <el-col class="access-points-view">
    <el-row type="flex" justify="space-between">
        <el-row class="access-points-view__header">
          <h1>{{ $i18n.t('titles.accessPointsPageh1') }} </h1>
          <p>{{ $i18n.t('paragraphs.apListbyWLC') }}</p>
        </el-row>
      <el-col>
        <el-row class="access-points-view__add-btn__wrapper">
          <el-button
            icon="el-icon-plus"
            class="access-points-view__add-btn default-btn"
            @click="onAddAPClick"
          >
            {{ $i18n.t('actions.addApToTable') }}
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <AccessPointsTable
        :is-loading="isLoading"
        :access-points="accessPoints"
        @ap-deleted="onAPDeleted"
      />
    </el-row>
    <AddApModal v-model="isModalOpen" @ap-created="onAPCreated"/>
  </el-col>
</template>

<script>
import AddApModal from '@/components/add-ap-modal/AddApModal.vue'
import AccessPointsTable from './access-points-table/AccessPointsTable.vue'
import apsApi from './api.js'

export default {
  components: {
    AccessPointsTable,
    AddApModal
  },
  data () {
    return {
      /** Флаг для открытия модалки добавления точки */
      isModalOpen: false,
      /** Список отчек доступа */
      accessPoints: [],
      /** флаг для отображения спинера во время выполнения запросов */
      isLoading: false
    }
  },
  methods: {
    onAddAPClick () {
      this.isModalOpen = true
    },
    async onAPCreated (apData) {
      /** Включаем отображение спинера */
      this.isLoading = true
      try {
        /** отправляем на сервер данные для новой точки */
        await apsApi.createAccessPoint(apData)
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
        /** Загружаем новый массив с точками */
        await this.getAccsessPoints()
      }
    },
    async onAPDeleted (apId) {
      /** Включаем отображение спинера */
      this.isLoading = true
      try {
        /** Удаляем точку по её айдишнику */
        await apsApi.deleteAccessPoint(apId)
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
        /** Загружаем новый массив с точками */
        await this.getAccsessPoints()
      }
    },
    async getAccsessPoints () {
      /** Включаем отображение спинера */
      this.isLoading = true
      try {
        /** Загружаем список точек */
        this.accessPoints = await apsApi.fetchAccessPoints()
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
    this.getAccsessPoints()
  }
}
</script>

<style>
.access-points-view__header {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.access-points-view__add-btn__wrapper {
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
  padding-bottom: 14px;
}
</style>
