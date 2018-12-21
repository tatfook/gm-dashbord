import monitorApi from '@/api/monitor'

const monitor = {
  state: {
    currentOnlineNumber: [],
    maxOnlineNumber: [], // 近一个月每天最高在线人数
    todayMaxOnlineNumber: []
  },

  mutations: {
    SET_CURRENT_ONLINE_NUMBER: (state, arr) => {
      state.currentOnlineNumber = arr
    },
    SET_MAX_ONLINE_NUMBER: (state, arr) => {
      state.maxOnlineNumber = arr
    },
    SET_TODAY_MAX_ONLINE_NUMBER: (state, res) => {
      state.todayMaxOnlineNumber = res
    }
  },

  actions: {
    async getCurrentOnlineNumberArr({ commit }) {
      const res = await monitorApi.getCurrentOnlineNumber()
      console.log('currentonline', res)
      commit('SET_CURRENT_ONLINE_NUMBER', res)
    },
    async getMaxOnlineNumberArr({ commit }, { fromDate, toDate }) {
      const res = await monitorApi.getMaxOnlineNumber(fromDate, toDate)
      if (fromDate && toDate) {
        console.log('MaxOnlineNumber', res)
        commit('SET_TODAY_MAX_ONLINE_NUMBER', res)
      } else {
        commit('SET_MAX_ONLINE_NUMBER', res)
      }
    }
  }
}

export default monitor
