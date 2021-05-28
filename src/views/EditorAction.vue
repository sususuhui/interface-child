<template>
  <a-card title="action流程信息" class="action">
    <a-radio-group slot="extra" :value="size" @change="handleSizeChange">
      <a-radio-button value="small">
        编辑
      </a-radio-button>
      <a-radio-button value="default">
        使用
      </a-radio-button>
    </a-radio-group>
    <a-button slot="extra" type="primary" size="small">
      保存
    </a-button>
    <div class="action-list">
      <div v-if="actionList && actionList.length">
        <a-collapse v-model="activeKey">
          <a-collapse-panel v-for="(item,index) in actionList" :key="index.toString()"
                            :header="'action基本信息'+(index+1)">
            <a-form-model layout="inline" :model="form">
              <a-row>
                <a-col :span="8">
                  <a-form-model-item label="名称" style="width: 100%" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-input name="name" @focus="showDraw('name','名称',item)" placeholder="请输入名称" v-model="form.name"
                             :defaultValue="item.name"/>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item label="描述" style="width: 100%" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-input @focus="showDraw('description','描述',item)" name="description" v-model="form.description"
                             :defaultValue="item.description"
                             placeholder="请填写描述信息" type="textarea"/>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item label="标签" style="width: 100%" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-select @focus="showDraw('tag','标签',item)" v-model="form.region" placeholder="请选择相应的标签">
                      <a-select-option value="shanghai">
                        取数
                      </a-select-option>
                      <a-select-option value="beijing">
                        映射
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-model-item label="脚本" style="width: 100%" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-select mode="multiple" @focus="showDraw('python','脚本',item)" v-model="form.python"
                              placeholder="请选择相应的标签">
                      <a-select-option value="apple">
                        apple.py
                      </a-select-option>
                      <a-select-option value="peach">
                        peach.py
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <ResultInfo v-else/>
    </div>
    <div class="btn" v-if="visible">
      <DrawerInfo :visible="visible" :onClose="onClose" :drawerInfo="drawerInfo"/>
      <a-button type="primary">
        添加
      </a-button>
    </div>
  </a-card>
</template>

<script>
import { mapMutations } from 'vuex'
import DrawerInfo from '../components/DrawerInfo'
import ResultInfo from '../components/ResultInfo'

export default {
  components: {
    DrawerInfo,
    ResultInfo
  },
  data () {
    return {
      visible: false,//是否显示修改字段的抽屉
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      activeKey: ['0'],
      size: 'small',
      form: {//正在编辑的表单的数据
        name: '',
        description: '',
        configs: [],
        python: []
      },
      actionList: [{
        name: '显示名称',
        description: '这里是描述',
        python: [],
        configs: [],
        status: 'success',
        tag: '映射',
        time: new Date().toLocaleString()
      }, {
        name: '显示名称1',
        description: '这里是描述1',
        python: [],
        configs: [],
        status: 'danger',
        tag: '取数',
        time: new Date().toLocaleString()
      }, {
        name: '显示名称2',
        description: '这里是描述2',
        python: [],
        configs: [],
        status: 'success',
        tag: '存数',
        time: new Date().toLocaleString()
      }, {
        name: '显示名称3',
        description: '这里是描述3',
        python: [],
        configs: [],
        status: 'danger',
        tag: '校验',
        time: new Date().toLocaleString()
      }],
      drawerInfo: {},//传递给drawer组件的数据
    }
  },
  watch: {},
  mounted () {
    console.log()
  },
  methods: {
    ...mapMutations([]),
    handleSizeChange (e) {
      this.size = e.target.value
    },
    showDraw (key, editorKey, item) {
      console.log(editorKey)
      this.drawerInfo = {
        titleKey: key,
        ...item,
        editorKey: editorKey
      }
      this.visible = !this.visible
      console.log(item)
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
<style scoped lang="less">
.action {
  margin: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .action-list {
    .ant-collapse {
      margin-bottom: 24px !important;
    }
  }

  .btn {
    text-align: center;
  }
}

.ant-btn-primary {
  margin-left: 10px;
}

</style>
