<template>
  <el-dialog
    :title="$i18n.t('titles.addAccessPointModal')"
    :visible.sync="dialogFormVisible"
    class="add-ap-modal"
  >
    <el-form
        ref="createForm"
        :model="apData"
        :rules="validations"
        label-width="auto"
      >
        <el-form-item
          :label="$i18n.t('fieldNames.name')"
          prop="name"
        >
          <el-input v-model="apData.name" :placeholder="placeholders.name"/>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('fieldNames.model')"
          prop="model"
        >
          <el-input v-model="apData.model" :placeholder="placeholders.model"/>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('fieldNames.ipAddress')"
          prop="ip"
        >
          <el-input
            v-model="apData.ip"
            :placeholder="placeholders.ip"
          />
        </el-form-item>
        <el-form-item
          :label="$i18n.t('fieldNames.band')"
          prop="band"
        >
          <el-select
            v-model="apData.band"
            :placeholder="placeholders.band"
            style="width: 100%"
          >
            <el-option label="2.4G" value="2.4G" />
            <el-option label="5G" value="5G" />
            <el-option label="6G" value="6G" />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$i18n.t('fieldNames.channel')"
          prop="channel"
        >
          <el-input-number
            v-model="apData.channel"
            :min="1"
            :max="200"
          />
        </el-form-item>
        <el-form-item
          :label="$i18n.t('fieldNames.location')"
          prop="location"
        >
          <el-input v-model="apData.location" :placeholder="placeholders.location"/>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onApplyClick" class="default-btn">{{ $i18n.t('actions.addAccessPoint')}}</el-button>
      <el-button @click="onCloseClick" class="default-cancel-btn">{{ $i18n.t('actions.close')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
 * emits:
 * 'ap-created' - возвращает в нагрзке
 *  данные для созданной точки доступа
 */
import { getValidations, getPlaceholders } from './validation'

const defaultAPData = {
  name: '',
  model: '',
  ip: '',
  band: '',
  channel: 1,
  location: ''
}

export default {
  props: {
    /** value для взаимодесьвия
      * с родительским компонентом\
      * */
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogFormVisible: {
      get () {
        if (this.value) {
          this.resetForm()
        }
        return this.value
      },
      set (val) {
        // Эмитим событие обновления
        this.$emit('input', val)
      },
      immediate: true
    }
  },
  data () {
    return {
      apData: { ...defaultAPData },
      /** Правила поведения и валидации полей */
      validations: getValidations(),
      /** Значения плейсхолдеров для полей */
      placeholders: getPlaceholders()
    }
  },
  watch: {
    /** Отслеживаем изменение локали,
     * чтобы перезаписать
     * текст ошибок ввода для полей формы
     *  */
    '$i18n.locale' () {
      this.validations = getValidations()
      this.placeholders = getPlaceholders()
    }
  },
  methods: {
    onApplyClick () {
      // Проверяем валидность данных формы
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          // Возвращаем родителю данные точки доступа
          this.$emit('ap-created', this.apData)
          /** Вызываем метод сброса состояния формы */
          this.resetForm()
          /** Скрываем форму */
          this.dialogFormVisible = false
        }
      })
    },
    onCloseClick () {
      /** Вызываем метод сброса состояния формы */
      this.resetForm()
      /** Скрываем форму */
      this.dialogFormVisible = false
    },
    resetForm () {
      /** Сбрасываем данные формы */
      this.apData = { ...defaultAPData }
      /** Проверяем наличие формы в DOM-дереве
       * И сбрасываем ошибки валидации формы
       */
      if (this.$refs.createForm) {
        this.$refs.createForm.clearValidate()
      }
    }
  }
}
</script>

<style>
.add-ap-modal  .el-dialog__title {
  padding-left: 30px;
}

.add-ap-modal  .el-dialog__title {
  font-size: 20px !important;
  font-weight: bold;
  line-height: 40px;
}
</style>
