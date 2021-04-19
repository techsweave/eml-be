import type { AWS } from '@serverless/typescript';

import {getProduct, getCart, createProduct, createCart, createCheckout} from '@functions';


const serverlessConfiguration: AWS = {
  service: 'eml-be',

  frameworkVersion: '2',

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-central-1',
    lambdaHashingVersion: '20201221',

    apiGateway: {
      shouldStartNameWithService: true,
      minimumCompressionSize: 1024,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      REGION: '${self:provider.region}',
      STAGE: '${self:provider.stage}',
      PRODUCTS_TABLE: '${self:custom.productsTable}',
      CARTS_TABLE: '${self:custom.cartsTable}',
      STRIPE_SECRET_KEY: '${sel:custom.stripeSecretKey'
    },

    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:*',
        ],
        Resource: ['*']
      }
    ]
  },

  custom: {
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',
    productsTable: 'products-table',
    cartsTable: 'carts-table',
    stripeSecretKey: 'sk_test_51IgsmkDGejH30endCMGNwVS7q3fhrhyG4lggmRijVkVqJwCbAnNh5ZuxKkPn30ljIrDOCLmxF5f7EkR2xOdATNdB004YsbVQqe', //DA CAMBIARE
    cognitoPoolID: 'eu-central-1_mM30b9ZY4', //DA CAMBIARE
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8008,
        inMemory: true,
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      },
      migration: {
        dir: 'offline/migrations',
      },
      customDomain: {
        domainName: 'api.techSWEave.shop',
        basePath: '${self:provider.stage}',
        stage: '${self:provider.stage}',
        createRoute53Record: true,
      }
    },
  },

  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-bundle',
    'serverless-dynamodb-local',
    'serverless-domain-manager',
  ],

  package: {
    individually: true,
  },

  resources: {
    Resources: {
      productsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.products_table}',
          AttributeDefinitions: [
            { AttributeName: 'ID', AttributeType: 'S' }
          ],
          KeySchema: [
            { AttributeName: 'ID', KeyType: 'HASH' }
          ]
        }
      },
      cartsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.carts_table}',
          AttributeDefinitions: [
            { AttributeName: 'ID', AttributeType: 'S' }
          ],
          KeySchema: [
            { AttributeName: 'ID', KeyType: 'HASH' }
          ]
        }
      },
      ApiGatewayAuthorizer: {
        Type: 'AWS::ApiGateway::Authorizer',
        Properties: {
          AuthorizerResultTtlInSeconds: 300,
          IdentitySource: 'method.request.header.Authorization',
          Name: 'Cognito',
          RestApiId: 'eu-central-1_mM30b9ZY4', //DA CAMBIARE
          Type: 'COGNITO_USER_POOLS',
          ProviderARNs: [
            { arn: 'arn:aws:cognito-idp:eu-central-1:371413113666:userpool/eu-central-1_mM30b9ZY4' } //DA CAMBIARE
          ]
        }
      }
    },
  },
  // import the function via paths
  functions: {
    getProduct,
    getCart,
    createProduct,
    createCart,
    createCheckout
  },
  };

  module.exports = serverlessConfiguration;


//   USERPOOL:
//     ID: 'eu-central-1_mM30b9ZY4'
// ARN: 'arn:aws:cognito-idp:eu-central-1:371413113666:userpool/eu-central-1_mM30b9ZY4'

