<template>
  <div>
    <a-tabs type="editable-card" :animated="true" v-model="activeTab" @edit="onEdit" @change="clickTab"
            :hideAdd="true">
      <a-tab-pane
        v-for="t in worktabs"
        :key="t.name"
        :tab="t.tabName"
        :closable="t.name !== 'ActionList'"
      >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  created () {
    // // 进来不是主页时等list加载后再更新一次current
    // setTimeout(() => {
    //   this.activeTab = this.$store.state.worktab.current.name
    // }, 500)
  },
  watch: {
    '$store.state.worktab.current' (tab) {
      this.activeTab = tab && tab.name
    }
  },
  computed: {
    worktabs () {
      return this.$store.state.worktab.list
    }
  },
  data () {
    return {
      activeTab: 'ActionList'
    }
  },
  mounted () {
  },
  methods: {
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    remove (targetKey) {
      this.$store.commit('worktabRemove', targetKey)
    },
    clickTab (activeKey) {
      const newData = this.$store.state.worktab && this.$store.state.worktab.list.filter((temp) => activeKey === temp.name)
      this.$router.push(newData && newData.length ? `${newData[0].path}?id=${this.$store.state.paramData.id}` : '')
    },
  }
}
</script>
<style scoped text="less">
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
}

</style>
