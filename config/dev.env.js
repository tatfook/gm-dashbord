'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://gm-node-dev.keepwork.com/v0"'
  BASE_API: '"http://127.0.0.1:7001/v0"'
})
