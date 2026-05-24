export const GEMINI_PRICING = {
    Pro: {
        price: 20,
        seats: 1,
    },

    Ultra: {
        price: 250,
        seats: 1,
    },

    API: {
        price: "variable",
        seats: null,
    },
} as const;