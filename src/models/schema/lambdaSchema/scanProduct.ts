export default {
    type: "object",
    properties: {
        filter: {
            type: 'object',
            properties: {
                type: { type: 'string' },
                object: { type: 'any' },
                subject: { type: 'string' },
                lowerBound: { type: 'number' },
                upperBound: { type: 'number' },
                condition: { type: 'object' },
                conditions: {
                    type: 'array',
                    items: {
                        type: 'any'
                    }
                },
            },
            required: ['type']
        },
        indexName: { type: 'string' },
        limit: { type: 'number' },
        pageSize: { type: 'number' },
        // readConsistency: { type: 'string' },
        startKey: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id']
        },
        required: ['limit']
    }
} as const;