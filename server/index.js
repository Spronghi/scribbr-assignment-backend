'use strict'

class Server {
  constructor ({ name, version, service, config, requirements = [] }) {
    this.requirements = requirements
    this.service = service
    this.name = name
    this.version = version
    this.config = config
    this.imported = []
  }

  async importRequirements (fastify) {
    try {
      await Promise.all(this.requirements.map(requirement => requirement(fastify)))
    } catch (error) {
      console.log(`Cannot import requirement requirements: ${error}`)
    }

    return this
  }

  async loadSettings (fastify) {
    const { name, version, config } = this

    fastify.register(require('fastify-cors'), { origin: '*' })
    fastify.register(require('fastify-swagger'), {
      exposeRoute: true,
      swagger: {
        info: { title: `${name} ${process.env.NODE_ENV || 'no-env'}`, version },
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        exposeRoute: true
      }
    })

    fastify.decorate('config', config)
    fastify.addHook('preHandler', async ({ log, params, body, query }) => log.debug({ params, body, query }))
    fastify.addHook('onRoute', ({ url, method }) => console.log({ url, method }))
  }

  async listen () {
    return async (fastify) => {
      await this.loadSettings(fastify)
      await this.importRequirements(fastify)
      await this.service(fastify)
    }
  }
}

module.exports = Server
