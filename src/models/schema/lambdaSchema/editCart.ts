export default {
    type: "object",
    properties: {
        quantity: { type: 'number' }
    },
    required: ['quantity']
} as const;