<template>
  <div>
    <a-drawer
      title="字段"
      :width="420"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="inline" hide-required-mark>
        <a-form-item :label="drawerInfo && drawerInfo.editorKey+'(中文)'">
          <a-input
            v-decorator="[
                  'nameChi',
                  {initialValue: drawerInfo && drawerInfo[drawerInfo.titleKey]},
                  {
                    rules: [{ required: true, message: '名称(中文)不能为空' }],
                  },
                ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item :label="drawerInfo && drawerInfo.editorKey+'(英文)'">
          <a-input
            v-decorator="[
                  'nameEng',
                  // {initialValue: drawerInfo && drawerInfo[drawerInfo.titleKey]},
                  {
                    rules: [{ required: true, message: '名称(英文)不能为空' }],
                  },
                ]"
            placeholder="请输入名称"
          />
        </a-form-item>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="onClose">
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>

export default {
  name: 'DrawerInfo',
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    visible: false,
    onClose: Function,
    drawerInfo: {}
  },
  data () {
    return {
      form: this.$form.createForm(this),
      targetKeys: [],
      disabled: false,
      showSearch: false,
    }
  },
  computed: {},
  mounted () {
    console.log(this.drawerInfo)
  },
  methods: {
  }
}
</script>

<style scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
</style>
