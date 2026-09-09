<!--
============================================================
 AccessPointsTable.vue
============================================================
 Компонент с таблицей.
 Массив с точками доступа приходит от родительского компонента
 События компонента:
 'ap-deleted' - эмитится после пордтверждения удаления точки доступа
============================================================
-->
<template>
    <el-table
      v-loading="isLoading"
      :data="accessPoints"
      style="width: 100%;"
      class="access-points-table"
      >
        <el-table-column
          v-for="(tableColumn, index) in tableColumns"
          :key="index"
          :prop="tableColumn.name"
          :label="$i18n.t(`accessPointTableColumns.${tableColumn.name}`)"
          :width="tableColumn.width"
          :min-width="tableColumn.minWidth"
        />
        <el-table-column
          :label="$t(`accessPointTableColumns.actions`)"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
        <!-- На случай, если данные не пришли, показываем соответствующее сообщение -->
        <template slot="empty">
          <el-empty v-if="!accessPoints.length" :image-size="200" description="No data"></el-empty>
        </template>
    </el-table>
  </template>

<script>
/**
 * emits:
 * 'ap-deleted' - возвращает в нагрзке айдишник точки доступа для удаления
 */
import { tableColumns } from './table-config'

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
      required: true
    },
    /** Список точек доступа */
    accessPoints: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableColumns
    }
  },
  methods: {
    /**  обработчик нажатия на кнопку удаления */
    handleDelete (index, row) {
      this.$confirm(this.$i18n.t('confirmations.deleteAP.message'), '', {
        confirmButtonText: this.$i18n.t('confirmations.deleteAP.applyBtn'),
        cancelButtonText: this.$i18n.t('confirmations.deleteAP.cancelBtn'),
        type: 'warning',
        customClass: 'access-points-table__confirm-delete-box'
      }).then(() => {
        // Возвращаем родителю айдишник точки доступа
        this.$emit('ap-deleted', row.id || null)
      }).catch(() => {
        console.log('canceled')
      })
    }
  }
}
</script>

<style>
.el-button .access-points-table__delete-button {
  background-color: var(--bg-error-color);
}

.access-points-table__confirm-delete-box {
  width: 450px;
}

.access-points-table__confirm-delete-box .el-message-box__content .el-message-box__status.el-icon-warning {
  color: var(--bg-error-color);
}

.access-points-table__confirm-delete-box .el-message-box__content .el-message-box__container {
  font-size: 14px;
  font-weight: bold;
}

.access-points-table__confirm-delete-box .el-message-box__btns .el-button--default {
  padding: 12px 34px;
  color: var(--white-color);
  border: none !important;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  border-radius: var(--btn-border-radius) !important;
}

.access-points-table__confirm-delete-box .el-message-box__btns .el-button--default:nth-child(1) {
    background-color: var(--bg-error-color) !important;
}
.access-points-table__confirm-delete-box .el-message-box__btns .el-button--default:nth-child(1):hover {
  background-color: var(--err-btn-bg-color--hovered) !important;
}

.access-points-table__confirm-delete-box .el-message-box__btns .el-button--default:nth-child(2) {
  background-color: var(--brand-secondary-color) !important;
}

.access-points-table__confirm-delete-box .el-message-box__btns .el-button--default:nth-child(2):hover {
  background-color: var(--btn-bg-color--hovered) !important;
}
</style>
