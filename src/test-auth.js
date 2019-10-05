'use strict';

module.exports.handler = (event, context, callback) => {
    console.log('Received Event: ', event);
    const response = {
        message: `Hello there, ${event.requestContext.authorizer.claims.name}, your user ID is ${event.requestContext.authorizer.claims.sub}`,
        method: `This is an authorized ${event.httpMethod} to Lambda from your API`,
    };
    callback(
        null,
        {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(response)
        }
    )
  //test comment
};