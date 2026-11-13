import Head from "next/head";
import { useRouter } from "next/router";

export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://minhphan.vercel.app"
).replace(/\/$/, "");

export const config = {
    defaultSiteTitle: "Minh Phan",
    defaultTitle: "Phan Công Minh (Full-stack Developer)",
    defaultDescription:
        "Phan Công Minh - Full-stack Developer với hơn 5 năm kinh nghiệm phát triển ứng dụng web bằng Next.js, NestJS, TypeScript và PostgreSQL.",
    ogImage: "/og-image.jpg",
    linkedInUrl: "https://linkedin.com/in/minh-phan-2bb344166",
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
    const router = useRouter();
    description = description || config.defaultDescription;
    title = title || config.defaultTitle;
    siteTitle = siteTitle || config.defaultSiteTitle;

    // Canonical = site origin + current path without query string / hash
    const path = (router?.asPath || "/").split(/[?#]/)[0];
    canonicalUrl = canonicalUrl || `${SITE_URL}${path === "/" ? "/" : path}`;

    const ogImageUrl = `${SITE_URL}${config.ogImage}`;
    const fullTitle = `${title} | ${siteTitle}`;

    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteTitle,
            url: `${SITE_URL}/`,
            inLanguage: "vi-VN",
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Phan Công Minh",
            alternateName: "Minh Phan",
            jobTitle: "Full-stack Developer",
            url: `${SITE_URL}/`,
            image: ogImageUrl,
            sameAs: [config.linkedInUrl],
            knowsAbout: [
                "Next.js",
                "React",
                "Vue.js",
                "TypeScript",
                "NestJS",
                "Node.js",
                "PHP",
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "Docker",
            ],
            alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Trường Đại học Nguyễn Tất Thành",
            },
        },
    ];

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Phan Công Minh" />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content="profile" />
            <meta property="og:locale" content="vi_VN" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Phan Công Minh - Full-stack Developer" />
            <meta property="profile:first_name" content="Minh" />
            <meta property="profile:last_name" content="Phan Công" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </Head>
    );
}
