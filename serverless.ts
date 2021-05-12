import type { AWS } from '@serverless/typescript';

import { getProduct, getCart, createProduct, deleteProduct, createCart, createCheckout, scanProduct, updateProduct } from '@functions/index';


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
            STRIPE_SECRET_KEY: '${self:custom.stripeSecretKey}'
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
        stripeSecretKey: 'sk_test_51Ij41SF20K2KHUILxXq9l5A2CbPS6VtYNmH4Ij0PPZyxatNDMTyovfiFjdYtOaQvbrDCokLPhorse1BxVPNXt1jW0032wODV69',
        cognitoPoolID: 'eu-central-1_eciEUvwzp',
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
            // customDomain: {
            //     domainName: 'api.techSWEave.shop',
            //     basePath: '${self:provider.stage}',
            //     stage: '${self:provider.stage}',
            //     createRoute53Record: true,
            // }
        },
        webpack: {
            includeModules: true,
        }
    },

    plugins: [
        'serverless-webpack',
        'serverless-offline',
        'serverless-dynamodb-local',
    ],

    package: {
        individually: true,
    },

    resources: {
        Resources: {
            productsTable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    TableName: '${self:custom.productsTable}',
                    AttributeDefinitions: [
                        { AttributeName: 'id', AttributeType: 'S' }
                    ],
                    KeySchema: [
                        { AttributeName: 'id', KeyType: 'HASH' }
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: "5",
                        WriteCapacityUnits: "5"
                    }
                },

            },
            cartsTable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    TableName: '${self:custom.cartsTable}',
                    AttributeDefinitions: [
                        { AttributeName: 'id', AttributeType: 'S' }
                    ],
                    KeySchema: [
                        { AttributeName: 'id', KeyType: 'HASH' }
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: "5",
                        WriteCapacityUnits: "5"
                    }
                }
            },
            //TODO
            //An error occurred: ApiGatewayAuthorizer - Invalid API identifier specified 780844780884:eu-central-1_eciEUvwzp (Service: AmazonApiGateway; Status Code: 404; Error Code: NotFoundException; Request ID: 8f13cde5-8392-4ddc-889c-3da757643788; Proxy: null).
            // ApiGatewayAuthorizer: {
            //     Type: 'AWS::ApiGateway::Authorizer',
            //     Properties: {
            //         AuthorizerResultTtlInSeconds: 300,
            //         IdentitySource: 'method.request.header.Authorization',
            //         Name: 'Cognito',
            //         RestApiId: 'eu-central-1_eciEUvwzp',
            //         Type: 'COGNITO_USER_POOLS',
            //         ProviderARNs: [
            //             'arn:aws:cognito-idp:eu-central-1:780844780884:userpool/eu-central-1_eciEUvwzp',
            //         ]
            //     }
            // }
        },
    },
    // import the function via paths
    functions: {
        getProduct,
        getCart,
        createProduct,
        createCart,
        createCheckout,
        scanProduct,
        updateProduct
    },
};

module.exports = serverlessConfiguration;


//   USERPOOL:
//     ID: 'eu-central-1_eciEUvwzp'
// ARN: 'arn:aws:cognito-idp:eu-central-1:780844780884:userpool/eu-central-1_eciEUvwzp'

