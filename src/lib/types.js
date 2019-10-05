'use strict';

const resolvers = require('./resolvers');
const graphQl = require('graphql');

const itemConfigFields = {
  userId: {
    type: graphQl.GraphQLString
  },
  itemId: {
    type: graphQl.GraphQLString
  },
  field: {
    type: graphQl.GraphQLString
  },
  summary: {
    type: graphQl.GraphQLString
  },
  name: {
    type: graphQl.GraphQLString
  },
  role: {
    type: graphQl.GraphQLString
  },
  phoneNumber: {
    type: graphQl.GraphQLString
  },
  website: {
    type: graphQl.GraphQLString
  },
  email: {
    type: graphQl.GraphQLString,
  },
  location: {
    type: graphQl.GraphQLString,
  },
  startDate: {
    type: graphQl.GraphQLString,
  },
  endDate: {
    type: graphQl.GraphQLString,
  },
  award: {
    type: graphQl.GraphQLString,
  },
  bulletPoints: {
    type: graphQl.GraphQLList(graphQl.GraphQLString)
  },
  additionalInfo: {
    type: graphQl.GraphQLString,
  }
}

const userType = new graphQl.GraphQLObjectType({
  name: 'User',
  fields: {
    userId: graphQl.GraphQLString
  }
});

const itemType = new graphQl.GraphQLObjectType({
  name: 'Item',
  fields: itemConfigFields
});

const inputItemType = new graphQl.GraphQLInputObjectType({
  name: 'InputItem',
  fields: itemConfigFields
});

module.exports = {
  UserType: userType,
  ItemType: itemType,
  InputItemType: inputItemType
};
