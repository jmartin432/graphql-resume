'use strict'

const AWS = require('aws-sdk')
AWS.config.setPromisesDependency(Promise)

const resumes = new AWS.DynamoDB.DocumentClient({
  params: {TableName: process.env.RESUME_DB}
})

module.exports = {
  ResumeDB: resumes,
}