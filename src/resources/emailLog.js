import {
  resourceCRUD
} from '@/api/resources'
import emailLogApi from '@/api/emailLog'
import BaseResource from './base'
import _ from 'lodash'

const crudAPI = _.merge({}, resourceCRUD('emailLog'), emailLogApi)

export default class EmailLog extends BaseResource {
  static attributes() {
    return [{
      name: 'id',
      type: 'Number',
      edit: false
    },
    {
      name: 'resourceId',
      type: 'Number',
      edit: false
    },
    {
      name: 'type',
      type: 'String',
      edit: false
    },
    {
      name: 'operatorId',
      type: 'String',
      edit: false
    },
    {
      name: 'detail',
      type: 'String',
      edit: false
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
      disabled: ['destroy', 'create', 'delete', 'edit']
    }
  }
}
