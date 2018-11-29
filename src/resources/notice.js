import {
  resourceCRUD
} from '@/api/resources'
import _ from 'lodash'
import noticeApi from '@/api/notice'
import BaseResource from './base'
import store from '@/store'

const crudAPI = _.merge({}, resourceCRUD('notices'), noticeApi)

const statusMap = [{
  key: 0,
  value: '未发送'
},
{
  key: 1,
  value: '已发送'
}]

export default class Notice extends BaseResource {
  static attributes() {
    return [
      {
        name: 'id',
        type: 'Number',
        edit: false
      },
      {
        name: 'adminId',
        required: true,
        type: 'Number',
        edit: false,
        associate: 'Admin',
        default: () => { return store.getters.currentUser.id }
      },
      {
        name: 'status',
        required: true,
        type: 'Number',
        edit: true,
        component: 'select',
        default: () => { return 0 },
        options: statusMap,
        filter: (value) => {
          for (const option of statusMap) {
            if (option.key === value) return option.value
          }
          return value
        }
      },
      {
        name: 'content',
        required: true,
        type: 'String',
        component: 'text'
      },
      {
        name: 'serverIds',
        type: 'String',
        component: 'text'
      },
      {
        name: 'createdAt',
        type: 'Date',
        edit: false
      },
      {
        name: 'updatedAt',
        type: 'Date',
        edit: false
      }
    ]
  }

  static api() {
    return crudAPI
  }

  static actions() {
    return {
      disabled: ['destroy', 'show'],
      extra: [
        {
          name: 'send',
          func: (row) => { this.api().send(row) },
          button: 'warning'
        }
      ]
    }
  }
}
