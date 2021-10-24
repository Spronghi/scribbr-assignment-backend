'use strict'

const tags = ['invoices']

const properties = {
  _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
  name: { type: 'string' },
  description: { type: 'string' },
  email: { type: 'string' },
  telephone: { type: 'string' },
  street: { type: 'string' },
  houseNo: { type: 'string' },
  postalCode: { type: 'string' },
  city: { type: 'string' },
  country: { type: 'string' },
  timestamp: { type: 'string', format: 'date-time' },
  dueDate: { type: 'string', format: 'date' },
  invoiceNo: { type: 'string' },
  amount: { type: 'number' },
  currency: { type: 'string', default: 'EUR' },
  status: { type: 'string', enum: ['open', 'paid', 'outstanding', 'late'] }
}

const params = {
  type: 'object',
  required: ['id'],
  properties: {
    id: properties._id
  },
  additionalProperties: false
}

const querystring = {
  type: 'object',
  properties: {}
}
const item = {
  type: 'object',
  required: ['description', 'subtotal'],
  properties: {
    description: properties.description,
    subtotal: properties.amount,
    currency: properties.currency
  },
  additionalProperties: false
}

const address = {
  type: 'object',
  required: ['street', 'houseNo', 'postalCode', 'city', 'country'],
  properties: {
    street: properties.street,
    houseNo: properties.houseNo,
    postalCode: properties.postalCode,
    city: properties.city,
    country: properties.country
  },
  additionalProperties: false
}

const contact = {
  type: 'object',
  required: ['name', 'email', 'telephone', 'address'],
  properties: {
    name: properties.name,
    email: properties.email,
    telephone: properties.telephone,
    address: address
  },
  additionalProperties: false
}

const model = {
  type: 'object',
  required: ['_id', 'from', 'to', 'invoiceNo', 'amount'],
  properties: {
    _id: properties._id,
    from: contact,
    to: contact,
    created: properties.timestamp,
    dueDate: properties.dueDate,
    invoiceNo: properties.invoiceNo,
    amount: properties.amount,
    status: properties.status,
    currency: properties.currency,
    items: {
      type: 'array',
      items: item,
      default: []
    }
  },
  additionalProperties: false
}

const post = (properties => {
  return {
    type: 'object',
    required: model.required.filter(r => r !== '_id'),
    properties,
    additionalProperties: false
  }
})({ ...model.properties })

const put = (post => {
  delete post.properties._id
  return post
})(post)

module.exports.put = {
  tags,
  params,
  body: put,
  response: {
    200: model
  }
}

module.exports.patch = {
  tags,
  params,
  body: put,
  response: {
    200: model
  }
}

module.exports.post = {
  tags,
  body: post,
  response: {
    200: model
  }
}

module.exports.delete = {
  tags,
  params,
  response: {
    200: {
      id: properties._id
    }
  }
}

module.exports.get = {
  tags,
  params,
  response: {
    200: model
  }
}

module.exports.getAll = {
  tags,
  querystring,
  response: {
    200: {
      type: 'array',
      items: model
    }
  }
}
