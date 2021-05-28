<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :exclude="closingPage">
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Vue from 'vue'

export default {
  name: 'About',
  components: {},
  data () {
    return {
      pathList: [],
      transitionName: 'router-slide-right'
    }
  },
  computed: {
    closingPage () {
      return this.$store.state.closingPage
    }
  },
  mounted () {
    // 增加state监听
    this.$onGlobalStateChange && this.$onGlobalStateChange((state, prev) => {
      Vue.prototype.$testMe = state
    })
  },
  methods: {
    ...mapMutations([])
  }
}
</script>
<style scoped>

#app {

}
</style>
