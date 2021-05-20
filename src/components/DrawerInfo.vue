<template>
  <div>
    <a-drawer
      title="新建action"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '名称不能为空' }],
                  },
                ]"
                placeholder="请输入名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="标签">
              <a-select
                v-decorator="[
                  'tag',
                  {
                    rules: [{ required: true, message: '标签选择不能为空' }],
                  },
                ]"
                placeholder="请选择对应的标签"
              >
                <a-select-option value="get" key="0">
                  取数
                </a-select-option>
                <a-select-option value="map" key="1">
                  映射
                </a-select-option>
                <a-select-option value="save" key="2">
                  存数
                </a-select-option>
                <a-select-option value="check" key="3">
                  校验
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="描述">
              <a-textarea
                v-decorator="[
                  'description',
                  {
                    rules: [{ required: true, message: '描述不能为空' }],
                  },
                ]"
                :rows="4"
                placeholder="请填写描述信息"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="配置选择">
              <a-transfer
                :data-source="mockData"
                :target-keys="tableTargetKeys"
                :disabled="disabled"
                :show-search="showSearch"
                :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
                :show-select-all="false"
                @change="onChangeTable"
              >
                <template
                  slot="children"
                  slot-scope="{
          props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
          on: { itemSelectAll, itemSelect },
        }"
                >
                  <a-table
                    :row-selection="
            getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })
          "
                    :columns="direction === 'left' ? leftColumns : rightColumns"
                    :data-source="filteredItems"
                    size="small"
                    :style="{ pointerEvents: listDisabled ? 'none' : null }"
                    :custom-row="
            ({ key, disabled: itemDisabled }) => ({
              on: {
                click: () => {
                  if (itemDisabled || listDisabled) return;
                  itemSelect(key, !selectedKeys.includes(key));
                },
              },
            })
          "
                  />
                </template>
              </a-transfer>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="脚本选择">
              <a-transfer
                class="tree-transfer"
                :data-source="dataSource"
                :target-keys="targetKeys"
                :render="item => item.title"
                :show-select-all="false"
                @change="onChange"
              >
                <template
                  slot="children"
                  slot-scope="{ props: { direction, selectedKeys }, on: { itemSelect } }"
                >
                  <a-tree
                    v-if="direction === 'left'"
                    blockNode
                    checkable
                    checkStrictly
                    defaultExpandAll
                    :checkedKeys="[...selectedKeys, ...targetKeys]"
                    :treeData="treeData"
                    @check="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect);
            }
          "
                    @select="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect);
            }
          "
                  />
                </template>
              </a-transfer>
            </a-form-item>
          </a-col>
        </a-row>
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
import difference from 'lodash/difference';

//=====脚本信息=======
const treeData = [
  {key: '0-0', title: '0-0'},
  {
    key: '0-1',
    title: '0-1',
    children: [
      {key: '0-1-0', title: '0-1-0'},
      {key: '0-1-1', title: '0-1-1'},
    ],
  },
  {key: '0-2', title: '0-3'},
];

const transferDataSource = [];

function flatten(list = []) {
  list.forEach(item => {
    transferDataSource.push(item);
    flatten(item.children);
  });
}

flatten(JSON.parse(JSON.stringify(treeData)));

function isChecked(selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1;
}

function handleTreeData(data, targetKeys = []) {
  data.forEach(item => {
    item['disabled'] = targetKeys.includes(item.key);
    if (item.children) {
      handleTreeData(item.children, targetKeys);
    }
  });
  return data;
}

//=====脚本信息=======

//=====配置信息=======
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
  });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
];
//=====配置信息=======

export default {
  name: 'DrawerInfo',
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    visible: false,
    onClose: Function
  },
  data() {
    return {
      form: this.$form.createForm(this),
      targetKeys: [],
      dataSource: transferDataSource,
      mockData,
      tableTargetKeys: originTargetKeys,
      disabled: false,
      showSearch: false,
      leftColumns: leftTableColumns,
      rightColumns: rightTableColumns,
    };
  },
  computed: {
    treeData() {
      return handleTreeData(treeData, this.targetKeys);
    },
  },
  created() {
    console.log(this.props)
  },
  methods: {
    onChange(targetKeys) {
      console.log('Target Keys:', targetKeys);
      this.targetKeys = targetKeys;
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      const {eventKey} = e.node;
      itemSelect(eventKey, !isChecked(checkedKeys, eventKey));
    },
    onChangeTable(nextTargetKeys) {
      this.tableTargetKeys = nextTargetKeys;
    },
    getRowSelection({disabled, selectedKeys, itemSelectAll, itemSelect}) {
      return {
        getCheckboxProps: item => ({props: {disabled: disabled || item.disabled}}),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({key}) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys);
          itemSelectAll(diffKeys, selected);
        },
        onSelect({key}, selected) {
          itemSelect(key, selected);
        },
        selectedRowKeys: selectedKeys,
      };
    },
  }
};
</script>

<style scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
</style>
