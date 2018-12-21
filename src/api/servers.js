import createService from '@/utils/request'

const request = createService()

export default {
  getServers() {
    return request({
      method: 'get',
      url: '/admin/servers'
    })
  }
}
