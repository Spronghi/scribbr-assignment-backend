'use strict'

const { NotFound } = require('http-errors')
const { ObjectId } = require('@spronghi/mongo/dependencies')
const constants = require('./constants')

module.exports.get = async (request) => {
  const { id } = request.params
  const payload = await request.collection().findOne({ _id: ObjectId(id) })
  if (!payload) throw new NotFound()
  return payload
}

module.exports.getAll = (request) => {
  return request.collection().find().toArray()
}

module.exports.post = async (request, response) => {
  const { body: entity } = request

  request.collection()

  entity.created = new Date()
  entity.status = constants.status.OPEN
  const { insertedId } = await request.collection().insertOne(entity)
  entity._id = insertedId
  return entity
}

module.exports.put = async (request) => {
  const { body: entity, params } = request
  const { id } = params

  entity.updated = new Date()
  await request.collection().findOneAndUpdate({ _id: ObjectId(id) }, { $set: entity }, { upsert: true })
  entity._id = id
  return entity
}

module.exports.patch = async (request) => {
  const { body: entity, params } = request
  const { id } = params

  entity.updated = new Date()
  await request.collection().findOneAndUpdate({ _id: ObjectId(id) }, { $set: entity }, { upsert: true })
  entity._id = id
  return entity
}

module.exports.delete = async (request) => {
  const { id } = request.params
  const { deletedCount } = await request.collection().removeOne({ _id: ObjectId(id) })
  if (!deletedCount) throw new NotFound()
  return { id }
}
