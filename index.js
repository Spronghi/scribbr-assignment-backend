'use strict'

const Mongo = require('@spronghi/mongo')
const Server = require('@spronghi/server')
const service = require('./invoices')
const config = require('./invoices-v1.json')

module.exports = new Server({
  name: 'invoices',
  version: 'v1',
  requirements: [Mongo],
  config,
  service
}).listen()
