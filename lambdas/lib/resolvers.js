'use strict';

const lo = require('lodash');
const ddb = require('./dynamo');
const uuid = require('uuid/v1')

function logResolver(resolver, c, a){
  console.log(`In resolver for ${resolver} type`);
  console.log('Context ' + JSON.stringify(c))
  console.log('Args ' + JSON.stringify(a))
}

function getUserId(c, a){
  let id = null
  if (c.claims) {
    id = c.claims['cognito:username'];
    console.log(`User ID from CLAIMS: ${id}`)
  } else {
    id = a.userId;
    console.log(`User ID from ARGS: ${id}`)
  }
  return id;
}

function buildItem(userId, itemId, args) {
  return {
    userId: userId,
    itemId: itemId,
    field: args.item.field,
    name: args.item.name,
    role: args.item.role,
    location: args.item.location,
    phoneNumber: args.item.phoneNumber,
    email: args.item.email,
    website: args.item.website,
    startDate: args.item.startDate,
    endDate: args.item.endDate,
    award: args.item.award,
    bulletPoints: args.item.bulletPoints,
    additionalInfo: args.item.additionalInfo,
    summary: args.item.summary
  }
}

function resolveUsers (context, args){
  logResolver('USERS', context, args);
}

function resolveItem (context, args) {
  logResolver('ITEM', context, args);
  let userId = null
  const params = {
    Key: {
      userId: getUserId(context, args),
      itemId: args.itemId
    }
  }
  console.log('Dynamo Params: ' + JSON.stringify(params))
  return ddb.ResumeDB.get(params).promise().then(data => {
    console.log('Got back data: ' + JSON.stringify(data));
    return data.Item;
  })
}

function resolveFieldItems (context, args) {
  logResolver('FIELD ITEMS', context, args)
  const params = {
    IndexName: 'user_x_field',
    KeyConditionExpression: 'userId = :u and field = :f',
    ExpressionAttributeValues: {
      ':u': getUserId(context, args),
      ':f': args.field
    }
  };
  console.log('Dynamo Params: ' + JSON.stringify(params))
  return ddb.ResumeDB.query(params).promise().then(data => {
    console.log('Got back data:' + JSON.stringify(data));
    return data.Items
  })
}

function resolveResumeItems(context, args) {
  logResolver("RESUME ITEMS", context, args);
  const params = {
    KeyConditionExpression: 'userId = :u',
    ExpressionAttributeValues: {
      ':u': getUserId(context, args)
    }
  };
  console.log('Dynamo Params: ' + JSON.stringify(params))
  return ddb.ResumeDB.query(params).promise().then(data => {
    console.log('Got back data:' + JSON.stringify(data));
    return data.Items
  })
}

function resolveAddItem(context, args) {
  logResolver('CREATE ITEM')
  const item = buildItem(context.claims['cognito:username'], uuid(), args)
  const params = {
    Item: item,
    ConditionExpression: "attribute_not_exists(userId) AND attribute_not_exists(id)"
  }
  console.log('Dynamo Params: ' + JSON.stringify(params))
  return ddb.ResumeDB.put(params).promise().then(() => {
    console.log('Successfully wrote to DynamoDB')
    return item
  })
}

function resolveDeleteItem(context, args) {
  logResolver('DELETE ITEM')
  const userId = context.claims['cognito:username']
  const params = {
    Key: {
      userId: userId,
      itemId: args.itemId
    }
  };
  console.log('Dynamo Params: ' + JSON.stringify(params))
  return ddb.ResumeDB.delete(params).promise().then(() => {
    console.log('Successfully deleted item from DynamoDB')
    return {
      userId: userId,
      itemId: args.itemId
    }
  })
}

function resolveUpdateItem(context, args) {
  logResolver('UPDATE ITEM')
  const item = buildItem(context.claims['cognito:username'], args.item.itemId, args)
  const params = {
    Item: item
  };
  console.log('Dynamo Params: ' + JSON.stringify(params))
  return ddb.ResumeDB.put(params).promise().then(() => {
    console.log('Successfully wrote to DynamoDB')
    return item
  })
}

module.exports = {
  resolveItem: resolveItem,
  resolveFieldItems: resolveFieldItems,
  resolveResumeItems: resolveResumeItems,
  resolveUpdateItem: resolveUpdateItem,
  resolveAddItem: resolveAddItem,
  resolveDeleteItem: resolveDeleteItem
}
