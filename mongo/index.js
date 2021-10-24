'use strict'

const { MongoClient } = require('mongodb')

module.exports = async (fastify) => {
  try {
    const { url, database } = fastify.config.mongo
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect()

    console.log(`connected to mongo on ${url} and database ${database}`)

    fastify.log.debug('mongodb is available at ' + url)
    fastify.decorate('database', client.db(database))
    fastify.addHook('onClose', () => client.close())
  } catch (error) {
    const { url, database } = fastify.config.mongo
    console.log(`cannot connect to mongo on ${url} and database ${database}`)
  }
}
