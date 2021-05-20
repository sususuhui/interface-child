<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
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

export default {
  name: 'About',
  data () {
    return {
      pathList: [],
      transitionName: 'router-slide-right'
    }
  },
  mounted () {
    this.state = this.$route.query.id
  },
  methods: {
    ...mapMutations([])
  }
}
</script>
<style scoped>

</style>
