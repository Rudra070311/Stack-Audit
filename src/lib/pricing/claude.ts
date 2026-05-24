export const CLAUDE_PRICING = {
    Free: {
        price: 0,
        seats: 1,
    },

    Pro: {
        price: 20,
        seats: 1,
    },

    Max: {
        price: 100,
        seats: 1,
    },

    Team: {
        price: 30,
        seats: 5,
    },

    Enterprise: {
        price: null,
        seats: null,
    },

    "API Direct": {
        price: "variable",
        seats: null,
    },
} as const;