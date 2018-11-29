import _ from 'lodash'
import Admin from './admin'
import User from './user'
import Role from './role'
import Email from './email'
import Notice from './notice'

export const resources = {
  Admin,
  User,
  Role,
  Email,
  Notice
}

export const newResource = (name, row) => {
  const Klass = resources[_.upperFirst(name)]
  if (!Klass) throw new Error('Invlid resource: ' + _.upperFirst(name))
  return new Klass(row)
}

export const getResourceClass = (name) => {
  return resources[_.upperFirst(name)]
}

export default {
  resources,
  newResource,
  getResourceClass
}
