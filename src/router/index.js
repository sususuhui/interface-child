import Vue from 'vue'
import VueRouter from 'vue-router'
import ActionList from '../views/ActionList.vue'
import EditorAction from '../views/EditorAction.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/action'
  },
  {
    path: '/action',
    name: 'ActionList',
    component: ActionList,
    meta: {
      keepAlive: true,
      tabName: 'action列表'
    }
  },
  {
    path: '/action/EditorAction',
    name: 'EditorAction',
    component: EditorAction,
    meta: {
      keepAlive: true,
      tabName: 'action编辑'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/seeplnApiMain',
  routes
})
router.beforeEach((to, from, next) => {
  next()
  //保存路由信息
  store.commit('worktabRoute', {
    to: {
      name: to.name ? to.name : '',
      tabName: (to.meta && to.meta.tabName) ? to.meta.tabName : '',
      path: to.path
    },
    from: {
      name: from.name ? from.name : '',
      tabName: (from.meta && from.meta.tabName) ? from.meta.tabName : '',
      path: from.path
    }
  })
  return
})

export default router
