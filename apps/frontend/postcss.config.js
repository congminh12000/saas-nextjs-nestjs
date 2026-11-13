module.exports = {
    plugins: {
        "@tailwindcss/postcss": { base: __dirname },
        "postcss-focus-visible": {
            replaceWith: "[data-focus-visible-added]",
        },
    },
};
