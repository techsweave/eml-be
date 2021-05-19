export default {
    type: 'object',
    properties: {
        successUrl: { type: 'string' },
        cancelUrl: { type: 'string' }
    },
    required: ['successUrl']
} as const;