import Vue from 'vue'
import VueRouter from 'vue-router'
import ActionList from '../views/ActionList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/sub-app-2'
  },
  {
    path: '/sub-app-2',
    name: 'actionList',
    component: ActionList
  }
]

export default routes
