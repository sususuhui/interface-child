<template>
  <div>
    <div class="explain-title">
      <a-button class="editable-add-btn" @click="showDrawer">
        添加
      </a-button>
      <div class="explain-body">
        <div v-for="(item,index) in circleMap" :key="index" class="explain">
          <div class="circle-status" :style="item.color"></div>
          <div>{{ item.text }}</div>
        </div>
      </div>
    </div>
    <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">
      <template
        v-for="col in ['name', 'description','config','python','use','tag']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-switch :default-checked="text === 'Y'? true:false" v-show="record.editable && (col === 'use')"
                    checked-children="启动" un-checked-children="关闭"/>
          <a-input
            v-if="record.editable && (col === 'name' || col ==='description')"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <a-input-search
            v-if="record.editable && (col === 'config' || col ==='python')"
            :value="text"
            placeholder="请选择"
          />
          <a-select v-if="record.editable && col === 'tag'" default-value="lucy" style="width: 100%">
            <a-select-option value="jack">
              Jack
            </a-select-option>
          </a-select>
          <template v-else-if="!record.editable && (col === 'name' || col ==='description')">
            {{ text }}
          </template>
          <template v-else-if="!record.editable && (col === 'config' || col ==='python')">
            <a>{{ text }}</a>
          </template>
          <template v-else-if="!record.editable && col === 'use'">
            <a-switch checked-children="启动" un-checked-children="关闭" :checked="text === 'Y'? true:false"/>
          </template>
          <template v-else-if="!record.editable && col === 'tag'">
            <a-tag :color="record.tag.color">{{ record.tag.text }}</a-tag>
          </template>
        </div>
      </template>
      <span slot="status" slot-scope="text, record">
      <div class="circle-status" :style="record.status.color"></div>
    </span>
      <span slot="daily">
      <a>日志</a>
    </span>
      <span slot="action" slot-scope="text, record">
         <span v-if="record.editable">
          <a @click="() => save(record.key)">保存</a>
            <a-divider type="vertical"/>
          <a-popconfirm title="确定取消吗?" @confirm="() => cancel(record.key)">
            <a>取消</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a href="javascript:;" :disabled="editingKey !== ''" @click="showDrawer">添加</a>
          <a-divider type="vertical"/>
          <a href="javascript:;" :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
           <a-divider type="vertical"/>
           <a-popconfirm
             title="确定删除该action吗?"
             @confirm="() => onDelete(record.key)"
           >
          <a href="javascript:;" :disabled="editingKey !== ''">删除</a>
        </a-popconfirm>
        </span>
    </span>
    </a-table>
    <DrawerInfo :visible="visible" :onClose="onClose"/>
  </div>
</template>

<script scoped>
import DrawerInfo from '../components/DrawerInfo'

const circleMap = {
  0: {
    color: 'background: #52c41a',
    text: '成功'
  },
  1: {
    color: 'background: rgb(255, 96, 59)',
    text: '失败'
  },
  2: {
    color: 'background: #1890ff',
    text: '警告'
  },
  3: {
    color: 'background: #faad14',
    text: '审核'
  }
}
const tagMap = {
  0: {
    color: '#26A69A',
    text: '取数'
  },
  1: {
    color: '#52c41a',
    text: '映射'
  },
  2: {
    color: '#faad14',
    text: '存数'
  },
  3: {
    color: 'rgb(255, 96, 59)',
    text: '校验'
  }
}
const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    width: '5%',
    sorter: (a, b) => a.number - b.number
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: '10%',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '标签',
    dataIndex: 'tag',
    key: 'tag',
    width: '10%',
    scopedSlots: { customRender: 'tag' }
  },
  {
    title: '配置',
    dataIndex: 'config',
    key: 'config',
    width: '10%',
    scopedSlots: { customRender: 'config' }
  },
  {
    title: '脚本',
    dataIndex: 'python',
    key: 'python',
    width: '10%',
    scopedSlots: { customRender: 'python' }
  },
  {
    title: '是否启用',
    dataIndex: 'use',
    key: 'use',
    width: '10%',
    scopedSlots: { customRender: 'use' }
  },
  {
    title: '日志',
    dataIndex: 'daily',
    key: 'daily',
    width: '10%',
    scopedSlots: { customRender: 'daily' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: '8%',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '12%',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: 1,
    number: 1,
    name: 'action测试1',
    status: circleMap[Math.floor(Math.random() * 10) % 4],
    tag: tagMap[Math.floor(Math.random() * 10) % 4],
    description: '这是一段描述',
    config: '配置1',
    python: 'python1',
    use: 'Y',
    children: [
      {
        key: 11,
        name: 'action测试1-1',
        use: 'N',
        description: '这是一段描述',
        tag: tagMap[Math.floor(Math.random() * 10) % 4],
        status: circleMap[Math.floor(Math.random() * 10) % 4],
        config: '配置1',
        python: 'python1'
      },
      {
        key: 12,
        name: 'action测试1-2',
        use: 'Y',
        description: '这是一段描述',
        tag: tagMap[Math.floor(Math.random() * 10) % 4],
        status: circleMap[Math.floor(Math.random() * 10) % 4],
        config: '配置1',
        python: 'python1',
        children: [
          {
            key: 121,
            name: 'action测试1-2-1',
            use: 'N',
            description: '这是一段描述',
            tag: tagMap[Math.floor(Math.random() * 10) % 4],
            status: circleMap[Math.floor(Math.random() * 10) % 4],
            config: '配置1',
            python: 'python1'
          }
        ]
      }
    ]
  },
  {
    key: 2,
    number: 2,
    name: 'action测试2',
    use: 'N',
    description: '这是一段描述',
    status: circleMap[Math.floor(Math.random() * 10) % 4],
    tag: tagMap[Math.floor(Math.random() * 10) % 4],
    config: '配置1',
    python: 'python1'
  }
]
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

export default {
  components: {
    DrawerInfo
  },
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      columns,
      rowSelection,
      expandedRowKeys: [],
      circleMap,
      editingKey: '',
      visible: false
    }
  },
  methods: {
    onDelete (key) {
      console.log(key)
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter(item => key === item.key)[0]
      const targetCache = newCacheData.filter(item => key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      this.editingKey = ''
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
<style scoped>
.explain-title {
  display: flex;
  margin: 10px 20px;
  justify-content: space-between;
}

.explain-body {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.explain {
  display: flex;
  line-height: 15px;
  margin: 0 5px;
}

.circle-status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.editable-add-btn:hover, .editable-add-btn:focus {
  color: #26A69A;
  background-color: #fff;
  border-color: #26A69A;
}

a {
  color: #26A69A;
}
</style>
