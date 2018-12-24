import createService from '@/utils/request'

const request = createService()

export default {
  list(params) {
    return request({
      method: 'get',
      url: '/admin/logs',
      params: params
    })
  }
}
