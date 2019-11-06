Looking for a job, I was constantly updating my resume, and 
because I wanted to learn GraphQL I decided to store my resume 
in an AWS Dynamo Database accessible through a GraphQL endpoint.

This is still being developed and I am making a React App for the front-end. 

This project is built through AWS CloudFormation and the Serverless framework.

The Template creates the following resources:

* And API Gateway
* A Dynamo Database
* AWS Cognito User Pool for handling API authentication
* Two Lambda functions, one for API handler and one that just 
tests the authorization

The endpoint is authenticated but only for POSTing and PUTting Data. 
Anonymous users can perform GET requests

