'use strict';

const graphQl = require('graphql');
const types = require('./types');
const mutators = require('./mutators');
const queries = require('./queries');

const privateSchema = new graphQl.GraphQLSchema({
  mutation: mutators.Mutations,
  query: queries.Queries
});

const publicSchema = new graphQl.GraphQLSchema({
  query: queries.Queries
});

module.exports = {
  PrivateSchema: privateSchema,
  PublicSchema: publicSchema
};
