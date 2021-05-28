import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paramData: null,
    openOrChangeTags: null,
    closeTags: null,
    worktab: {
      list: [],
      current: {}
    },
    closingPage: ''
  },
  getters: {
    getParamData: state => {
      return state.paramData
    },
  },
  mutations: {
    setParamData (state, payload) {
      state.paramData = payload
    },
    setFunction (state, payload) {
      state[payload.name] = payload.fun
    },
    worktabRemove (state, p) {
      // 关闭标签
      let ind = state.worktab && state.worktab.list && state.worktab.list.findIndex(s => s.name === p)
      if (ind > -1) {
        // 清理 keep alive - start
        state.closingPage = state.worktab.list[ind].name
        // 清理 keep alive - end
        state.worktab.list.splice(ind, 1)
      }
      if (p === state.worktab.current.name) {
        // 是当前页，返回上一页
        router.back()
      }
    },
    worktabRoute (state, p) {
      let ind = state.worktab && state.worktab.list && state.worktab.list.findIndex(s => s.name === p.to.name)
      if (ind > -1) {
        // 标签已存在
        state.worktab.current = state.worktab.list[ind]
      } else {
        // 标签不存在，现在新建
        state.worktab && state.worktab.list && state.worktab.list.push(p.to)
        state.worktab.current = p.to
      }
      state.closingPage = ''
    }
  },
  actions: {},
  modules: {},
})
