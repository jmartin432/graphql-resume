'use strict'

const graphQl = require('graphql')
const lo = require('lodash')
const types = require('./types')
const ddb = require('./dynamo')
const resolvers = require('./resolvers')

const queries = new graphQl.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ping: {
      type: graphQl.GraphQLString,
      resolve () {
        return 'pong'
      }
    },
    item: {
      type: types.ItemType,
      args: {
        userId: {
          type: graphQl.GraphQLString
        },
        itemId: {
          type: graphQl.GraphQLString
        }
      },
      resolve: resolvers.resolveItem
    },
    fieldItems: {
      type: new graphQl.GraphQLList(types.ItemType),
      args: {
        userId: {
          type: graphQl.GraphQLString
        },
        field: {
          type: graphQl.GraphQLString
        }
      },
      resolve: resolvers.resolveFieldItems
    },
    resumeItems: {
      type: new graphQl.GraphQLList(types.ItemType),
      args: {
        userId: {
          type: graphQl.GraphQLString
        }
      },
      resolve: resolvers.resolveResumeItems
    }
  }
})

module.exports = {
  Queries: queries,
}