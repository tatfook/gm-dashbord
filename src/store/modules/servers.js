import serversApi from '@/api/servers'

const servers = {
  state: {
    serversInfo: {}
  },

  mutations: {
    SET_SERVERSINFO: (state, serversInfo) => {
      state.serversInfo = serversInfo
    }
  },

  actions: {
    async getServersInfo({ commit }) {
      const serversInfo = await serversApi.getServers()
      commit('SET_SERVERSINFO', serversInfo)
    }
  }
}

export default servers
