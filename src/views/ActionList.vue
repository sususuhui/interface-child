<template>
  <a-card class="action">
    <div slot="title">
      <a-button type="dashed">
        <a-icon type="plus"/>
      </a-button>
    </div>
    <a-radio-group slot="extra" :value="size" @change="handleSizeChange" v-if="authority === 'true'">
      <a-radio-button value="small">
        编辑
      </a-radio-button>
      <a-radio-button value="use">
        使用
      </a-radio-button>
    </a-radio-group>
    <a-button slot="extra" type="primary" size="small" v-if="authority === 'true'" @click="saveActions">
      保存
    </a-button>
    <a-button slot="extra" type="default" size="small" @click="runAction">
      运行
    </a-button>
    <a-form-model v-if="form.actionList && form.actionList.length" :model="form" ref="ruleForm" :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 12 }">
      <el-timeline>
        <el-timeline-item
          v-for="(item,index) in form.actionList"
          :key="index"
          :class="item.status === 'success'? 'left':''"
          :timestamp="item.time"
          placement="top"
          :type="item.status"
          :icon="item.status === 'success'? timeLineAttr.successIcon:timeLineAttr.errorIcon"
          :size="timeLineAttr.size">
          <el-card style="width: 40%">
            <div class="content">
              <div class="title">

                <a @click="toPureHtml(index)">脚本{{ test }}</a>
              </div>

              <div @click="showDraw(item)">
                <a-form-model-item label="名称" :style="used? 'border:none':null"
                                   :rules="{required:true,message:'名称不能为空', trigger: 'blur'}"
                                   :prop="'actionList.' + index + '.name'">
                  <a-input
                    :key="index"
                    v-model="item.name"
                  />
                </a-form-model-item>
              </div>
              <div @click="showDraw(item)">
                <a-form-model-item label="状态" :style="used? 'border:none':null">
                  <a-tag :color="item.status === 'success'?'green':'red'">
                    {{ item.status === 'success' ? '成功' : '失败' }}
                  </a-tag>
                </a-form-model-item>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </a-form-model>
    <ResultInfo v-else/>
    <DrawerInfo v-if="visible" :visible="visible" :onClose="onClose" :drawerInfo="drawerInfo"/>
  </a-card>
</template>

<script>
import ResultInfo from '../components/ResultInfo'
import DrawerInfo from '../components/DrawerInfo'

export default {
  components: {
    ResultInfo,
    DrawerInfo
  },
  data () {
    return {
      size: 'use',
      visible: false,
      timeLineAttr: {
        size: 'large',
        successIcon: 'el-icon-circle-check',
        errorIcon: 'el-icon-circle-close'
      },
      form: {
        actionList: [{
          id: 1,
          name: '显示名称',
          description: '这里是描述',
          python: [],
          configs: [],
          status: 'success',
          tag: '映射',
          time: new Date().toLocaleString()
        }, {
          id: 2,
          name: '显示名称',
          description: '这里是描述',
          python: [],
          configs: [],
          status: 'danger',
          tag: '取数',
          time: new Date().toLocaleString()
        }, {
          id: 3,
          name: '显示名称',
          description: '这里是描述',
          python: [],
          configs: [],
          status: 'success',
          tag: '存数',
          time: new Date().toLocaleString()
        }, {
          id: 4,
          name: '显示名称',
          description: '这里是描述',
          python: [],
          configs: [],
          status: 'danger',
          tag: '校验',
          time: new Date().toLocaleString()
        }],
      },
      formLayout: 'horizontal',
      drawerInfo: null,
      used: true,
      authority: localStorage.getItem('authority'),
      nameList: [],
      test: ''
    }
  },
  mounted () {
    console.log(this)
    console.log(this.$testMe)
    this.$testMe ? this.test = JSON.stringify(this.$testMe.actionList) : null
    console.log(this.$testMe ? console.log(this.$testMe.fn('蠢啦蠢啦')) : null)
    // 增加state监听
    this.$onGlobalStateChange && this.$onGlobalStateChange((state, prev) => {
      console.log(state, '====')
    })
  },
  methods: {
    /**
     * 前往编辑页面
     */
    goEditor () {
      console.log(this.$route)
      const vm = this
      this.$router.push(`/action/EditorAction?id=${this.$route.query.id}`)
    },
    handleSizeChange (e) {
      this.size = e.target.value
      if (this.size === 'use') {
        this.used = true
      } else {
        this.used = false
      }
    },
    /**
     * 运行action
     */
    runAction () {
      console.log('23242')
      console.log(this)
    },
    onClose () {
      this.visible = false
    },
    showDraw (item) {
      if (!this.used) {
        this.drawerInfo = item
        this.visible = true
      }
    },
    toPureHtml (index) {
      this.$store.state.openOrChangeTags({
        path: '/python',
        name: `脚本-${index}`,
        id: index.toString(),
      })
    },
    saveActions () {
      this.$refs.ruleForm.validate(valid => {
        console.log(valid)
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log(this.form.actionList)
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

  .ant-input {
    border: 0;
    border-bottom: 1px solid #d9d9d9;
  }

  .content {
    position: relative;

    .title {
      position: absolute;
      right: 0
    }
  }


}

/deep/ .ant-form-item {
  width: 80%;

  &:hover {
    border: 1px solid #b2d2c8;
  }

  &:focus {
    border: none
  }
}

/deep/ .el-timeline-item__tail {
  height: 200%;
}

/deep/ .el-timeline-item__node {
  width: 28px;
  height: 28px;
  left: -10px;
  top: 44%;

  .el-timeline-item__icon {
    font-size: 16px;
  }
}

.ant-btn {
  margin-left: 10px;
}


</style>
