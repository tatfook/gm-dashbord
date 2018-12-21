import createService from '@/utils/request'

const request = createService()

export default {
  getLogs(type) {
    return request({
      method: 'get',
      url: `/admin/logs?type=${type}`
    })
  }
}
