import createService from '@/utils/request'

const request = createService()

export default {
  getCurrentOnlineNumber() {
    return request({
      method: 'get',
      url: '/admin/servers/online'
    })
  },
  getMaxOnlineNumber(fromDate, toDate) {
    return request({
      method: 'get',
      url: (fromDate && toDate) ? `/admin/servers/online/max?from=${fromDate}&to=${toDate}` : '/admin/servers/online/max'
    })
  }
}
