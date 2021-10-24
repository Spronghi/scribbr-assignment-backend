'use strict'

const schemas = require('./schemas')
const handlers = require('./handlers')

module.exports = async (fastify) => {
  const { database, config } = fastify
  const { api } = config.service

  fastify.decorateRequest('collection', () => database.collection('characters'))

  fastify.get(`${api}/:id`, { schema: schemas.get }, handlers.get)
  fastify.get(api, { schema: schemas.getAll }, handlers.getAll)
  fastify.post(api, { schema: schemas.post }, handlers.post)
  fastify.put(`${api}/:id`, { schema: schemas.put }, handlers.put)
  fastify.patch(`${api}/:id`, { schema: schemas.patch }, handlers.patch)
  fastify.delete(`${api}/:id`, { schema: schemas.delete }, handlers.delete)
}
