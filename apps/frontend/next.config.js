/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Vietnamese stays on "/", English lives under "/en". No Accept-Language
    // redirects so URLs stay stable for search engines.
    i18n: {
        locales: ["vi", "en"],
        defaultLocale: "vi",
        localeDetection: false,
    },
    output: "standalone",
    images: {
        // AVIF is ~20-30% smaller than WebP; browsers without AVIF fall back to WebP
        formats: ["image/avif", "image/webp"],
    },

    experimental: {
        scrollRestoration: true,
    },
    // Add empty turbopack config to silence Turbopack warning
    turbopack: {
        // Pin the monorepo root so a stray lockfile in a parent folder isn't picked up
        root: require("path").join(__dirname, "../.."),
        resolveAlias: {
            // Handle .js extension resolution for TypeScript files
        },
    },
    async rewrites() {
        return [
            {
                source: "/noctis-website-proposal",
                destination: "/noctis-website-proposal.html",
            },
            {
                source: "/plaus/js/script.js",
                destination: "https://plausible.io/js/script.js",
            },
            {
                source: "/plaus/api/event",
                destination: "https://plausible.io/api/event",
            },
        ];
    },
};

module.exports = nextConfig;
