import {
  resourceCRUD
} from '@/api/resources'
import BaseResource from './base'

const crudAPI = resourceCRUD('logs')

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
      type: 'Number',
      edit: false,
      associate: 'Admin',
      associateAs: 'operator'
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

  static queryFilter(query) {
    // will include all by default, to make sure every associate works
    query.include({ all: true, nested: false })
    query.where({ 'type-eq': 'email' })
    return query
  }

  static actions() {
    return {
      disabled: ['destroy', 'create', 'delete', 'edit']
    }
  }
}
