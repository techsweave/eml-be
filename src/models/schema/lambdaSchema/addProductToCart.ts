export default {
    type: 'object',
    properties: {
        customerId: { type: 'string' },
        productId: { type: 'string' },
        quantity: { type: 'number' }
    },
    required: ['customerId', 'productId', 'quantity']
} as const;