import Head from "next/head";

export const config = {
    defaultSiteTitle: "Minh Phan Tools",
    defaultTitle: "Home",
    defaultDescription:
        "Have an idea for a product? Skip straight to the good stuff - providing valuable features to your customers. Minh Phan has all the technology sorted.",
};
export default function SEO({
    description,
    title,
    siteTitle,
    canonicalUrl,
}: {
    description?: string;
    title?: string;
    siteTitle?: string;
    canonicalUrl?: string;
}) {
    description = description || config.defaultDescription;
    title = title || config.defaultTitle;
    siteTitle = siteTitle || config.defaultSiteTitle;
    canonicalUrl = canonicalUrl || "";

    const ogImageUrl = "";

    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteTitle,
            url: "",
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Minh Phan",
            url: "",
            sameAs: [
                "",
                "",
            ],
        },
        // NOTE: If you want to include a SoftwareApplication schema for rich results,
        // Google requires real "aggregateRating" or "review" data.
        // Until we have reviews, keep this commented out to avoid structured data errors.
        // {
        //     "@context": "https://schema.org",
        //     "@type": "SoftwareApplication",
        //     name: siteTitle,
        //     applicationCategory: "DeveloperApplication",
        //     operatingSystem: "Web",
        //     url: "https://useMinh Phan.dev",
        //     description,
        //     offers: {
        //         "@type": "Offer",
        //         price: "0",
        //         priceCurrency: "USD",
        //     },
        // },
    ];

    return (
        <Head>
            <title>{`${title} | ${siteTitle}`}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImageUrl} />

            {/* <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@minhphan" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} /> */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </Head>
    );
}
