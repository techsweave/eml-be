export default {
    type: "object",
    properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        avaiability: { type: 'number' },
        discount: { type: 'number' }
    },
    required: ['name', 'price']
}as const;