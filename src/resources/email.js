import {
  resourceCRUD
} from '@/api/resources'
import emailApi from '@/api/email'
import BaseResource from './base'
import store from '@/store'
import _ from 'lodash'

const crudAPI = _.merge({}, resourceCRUD('emails'), emailApi)

const addresseeTypeMap = [{
  key: 0,
  value: '全服'
},
{
  key: 1,
  value: '单服'
},
{
  key: 2,
  value: '个人'
}]

const mailTypeMap = [{
  key: 0,
  value: '普通'
},
{
  key: 1,
  value: '带附件'
}]

const showPriorityMap = [{
  key: 0,
  value: '普通'
},
{
  key: 1,
  value: '置顶'
}]

const boolMap = [{
  key: 0,
  value: '否'
},
{
  key: 1,
  value: '是'
}]

const statusMap = [{
  key: 0,
  value: '未发送'
},
{
  key: 1,
  value: '已发送'
}]

export default class Email extends BaseResource {
  static attributes() {
    return [
      {
        name: 'id',
        type: 'Number',
        edit: false
      },
      {
        name: 'mid',
        type: 'String',
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
        name: 'sender',
        required: true,
        type: 'String'
      },
      {
        name: 'title',
        required: true,
        type: 'String'
      },
      {
        name: 'content',
        required: true,
        type: 'String',
        component: 'text'
      },
      {
        name: 'addresseeType',
        required: true,
        type: 'Number',
        component: 'select',
        default: () => { return 0 },
        options: addresseeTypeMap,
        filter: (value) => {
          for (const option of addresseeTypeMap) {
            if (option.key === value) return option.value
          }
          return value
        }
      },
      {
        name: 'receivers',
        type: 'String',
        component: 'text'
      },
      {
        name: 'mailType',
        type: 'Number',
        required: true,
        default: () => { return 0 },
        component: 'select',
        options: mailTypeMap,
        filter: (value) => {
          for (const option of mailTypeMap) {
            if (option.key === value) return option.value
          }
          return value
        }
      },
      {
        name: 'attachments',
        type: 'String'
      },
      {
        name: 'validTime',
        type: 'Number',
        default: () => { return 3600 }
      },
      {
        name: 'showPriority',
        required: true,
        type: 'Number',
        default: () => { return 0 },
        component: 'select',
        options: showPriorityMap,
        filter: (value) => {
          for (const option of showPriorityMap) {
            if (option.key === value) return option.value
          }
          return value
        }
      },
      {
        name: 'isDestroy',
        type: 'Number',
        default: () => { return 0 },
        component: 'select',
        options: boolMap,
        filter: (value) => {
          for (const option of boolMap) {
            if (option.key === value) return option.value
          }
          return value
        }
      },
      {
        name: 'isPopping',
        type: 'Number',
        default: () => { return 0 },
        component: 'select',
        options: boolMap,
        filter: (value) => {
          for (const option of boolMap) {
            if (option.key === value) return option.value
          }
          return value
        }
      },
      {
        name: 'delayAt',
        type: 'Date'
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
      disabled: ['destroy'],
      extra: [
        {
          name: 'send',
          func: async(row) => { await this.api().send(row) },
          button: 'warning',
          confirm: this.i18nBase('resources.Email.confirm.publish')
        }
      ]
    }
  }
}
