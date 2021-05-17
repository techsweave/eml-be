export default {
    type: 'object',
    properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        availability: { type: 'number' },
        discount: { type: 'number' }
    },
    required: ['name', 'price']
}as const;