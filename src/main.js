import './public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.less'
import Antd from 'ant-design-vue/es'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Antd)
let instance = null

function render (props = {}) {
  const {
    container,
  } = props
  store.commit('setFunction', {
    fun: props.openOrChangeTags,
    name: 'openOrChangeTags'
  })
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 确保子应用能单独访问,为true表示处于qiankun环境
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// function storeTest (props) {
//   props.onGlobalStateChange &&
//   props.onGlobalStateChange(
//     (value, prev) => console.log(props,
//       value, prev),
//     true
//   )
//   props.setGlobalState &&
//   props.setGlobalState(props)
// }

export async function bootstrap (props) {
  // console.log('[vue] vue app bootstraped');
}

export async function mount (props) {
  console.log(props)
  // 设置通讯
  Vue.prototype.$onGlobalStateChange = props.actions.onGlobalStateChange
  Vue.prototype.$setGlobalState = props.actions.setGlobalState
  // storeTest()
  render(props)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}


