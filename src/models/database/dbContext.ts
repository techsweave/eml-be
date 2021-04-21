import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';

// Client Setting
const client = new DynamoDB({
    apiVersion: 'latest',
    region: process.env.REGION
});

// Wrapper of DynamoDb database
const dbContext = new DataMapper({ client: client });

export default dbContext;