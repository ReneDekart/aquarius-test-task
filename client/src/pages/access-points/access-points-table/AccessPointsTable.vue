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
    handleDelete (index, row) {
      // Возвращаем родителю айдишник точки доступа
      this.$emit('ap-deleted', row.id || null)
    }
  }
}
</script>

<style scoped>
.el-button .access-points-table__delete-button {
  background-color: var(--bg-error-color);
}
</style>
