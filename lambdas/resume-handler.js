'use strict'

const resumeHandler = require('graphql')
const schema = require('./lib/schema')

function runQuery (query, claims, variables) {
  if (claims === null) {
    return resumeHandler.graphql(schema.PublicSchema, query, {}, null, variables)
  }
  return resumeHandler.graphql(schema.PrivateSchema, query, {claims: claims}, null, variables)
}

module.exports.handler = (event, context, cb) => {
  console.log('Received event', JSON.stringify(event))

  let claims = null
  if (event.requestContext.authorizer) {
    claims = event.requestContext.authorizer.claims;
    console.log(`Event from user ${claims['cognito:username']} with ID ${claims.sub}`)
  } else {
    console.log('Event from ANONYMOUS')
  }

  const request = JSON.parse(event.body)
  console.log('Request: ' + JSON.stringify(request))
  console.log('Query: ' + JSON.stringify(request.query))
  console.log('Variables: ' + JSON.stringify(request.variables))

  return runQuery(request.query, claims, request.variables)
    .then(response => {
      console.log('Response: ' + JSON.stringify(response))
      const responsified = {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(response)
      }
      console.log('Built response: ' +JSON.stringify(responsified))
      return responsified
    })
    .then(response => cb(null, response))
    .catch(err => cb(err))
}
