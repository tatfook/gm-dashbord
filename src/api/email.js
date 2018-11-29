import createService from '@/utils/request'

const request = createService()

export default {
  send(data) {
    return request({
      method: 'post',
      url: `/admin/emails/${data.id}/send`
    })
  }
}
