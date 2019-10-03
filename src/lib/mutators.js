'use strict'

const graphQl = require('graphql')
const lo = require('lodash')
const types = require('./types')
const ddb = require('./dynamo')
const resolvers = require('./resolvers')

const mutations = new graphQl.GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createItem: {
      type: types.ItemType,
      args: {
        item: {
          type: types.InputItemType
        }
      },
      resolve: resolvers.resolveAddItem
    },
    updateItem: {
      type: types.ItemType,
      args: {
        item: {
          type: types.InputItemType
        }
      },
      resolve: resolvers.resolveUpdateItem
    },
    deleteItem: {
      type: types.ItemType,
      args: {
        itemId: {
          type: graphQl.GraphQLString
        }
      },
      resolve: resolvers.resolveDeleteItem
    }
  }
})

module.exports = {
  Mutations: mutations
}
