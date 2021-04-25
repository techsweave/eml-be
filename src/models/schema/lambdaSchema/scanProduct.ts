export default {
    type: "object",
    properties: {
        filter: { type: 'string' },
        indexName: { type: 'string' },
        limit: { type: 'number' },
        pageSize: { type: 'number' },
        readConsistency: { type: 'string' },
        startKey: { type: 'string' },
    }
} as const;