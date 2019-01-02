import createService from '@/utils/request'

const request = createService()

export default {
  list(params) {
    return request({
      method: 'post',
      url: '/admin/logs/search',
      data: { ...params, 'type-eq': 'email' }
    })
  }
}
