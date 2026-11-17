import Head from "next/head";
import { useRouter } from "next/router";
import {
    defaultLocale,
    getDictionary,
    localePrefix,
    locales,
    toLocale,
    type Locale,
} from "../i18n";
import type { LocaleAlternates } from "./LanguageSwitch";

export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://minhphan.vercel.app"
).replace(/\/$/, "");

export const config = {
    defaultSiteTitle: "Minh Phan",
    ogImage: "/og-image.jpg",
    linkedInUrl: "https://linkedin.com/in/minh-phan-2bb344166",
};

/** Absolute URL of `path` (no locale prefix) in `locale`. */
export function absoluteUrl(path: string, locale: Locale): string {
    const clean = path === "/" ? "" : path;
    const url = `${SITE_URL}${localePrefix(locale)}${clean}`;
    return url === SITE_URL ? `${SITE_URL}/` : url;
}

function withTrailingRoot(url: string): string {
    return url === SITE_URL ? `${SITE_URL}/` : url;
}

export default function SEO({
    description,
    title,
    siteTitle,
    canonicalUrl,
    alternates,
    ogType = "profile",
    ogImage,
    isNoIndex = false,
    jsonLd,
    article,
}: {
    description?: string;
    title?: string;
    siteTitle?: string;
    canonicalUrl?: string;
    alternates?: LocaleAlternates;
    ogType?: string;
    ogImage?: { url: string; width: number; height: number; alt: string };
    isNoIndex?: boolean;
    jsonLd?: object[];
    article?: {
        publishedTime: string;
        modifiedTime?: string;
        section: string;
        tags: string[];
    };
}) {
    const router = useRouter();
    const locale = toLocale(router?.locale);
    const t = getDictionary(locale);

    description = description || t.meta.defaultDescription;
    title = title || t.meta.homeTitle;
    siteTitle = siteTitle || config.defaultSiteTitle;

    // router.asPath never contains the locale prefix in the Pages Router.
    const currentPath = (router?.asPath || "/").split(/[?#]/)[0];
    const pathFor = (l: Locale): string | undefined =>
        alternates ? alternates[l] : currentPath;

    canonicalUrl =
        canonicalUrl ||
        withTrailingRoot(absoluteUrl(pathFor(locale) ?? currentPath, locale));

    const hreflangLinks = locales
        .map((l) => {
            const path = pathFor(l);
            return path === undefined
                ? null
                : { hrefLang: l, href: withTrailingRoot(absoluteUrl(path, l)) };
        })
        .filter((x): x is { hrefLang: Locale; href: string } => x !== null);
    const xDefault = hreflangLinks.find((l) => l.hrefLang === defaultLocale);

    const image = ogImage || {
        url: `${SITE_URL}${config.ogImage}`,
        width: 1200,
        height: 630,
        alt: t.meta.portraitAlt,
    };
    const fullTitle = `${title} | ${siteTitle}`;

    const structuredData = jsonLd || [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteTitle,
            url: `${SITE_URL}/`,
            inLanguage: t.meta.languageTag,
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Phan Công Minh",
            alternateName: "Minh Phan",
            jobTitle: "Full-stack Developer",
            url: `${SITE_URL}/`,
            image: `${SITE_URL}${config.ogImage}`,
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
            {isNoIndex && <meta name="robots" content="noindex, follow" />}
            <link rel="canonical" href={canonicalUrl} />
            {hreflangLinks.map((l) => (
                <link
                    key={`hreflang-${l.hrefLang}`}
                    rel="alternate"
                    hrefLang={l.hrefLang}
                    href={l.href}
                />
            ))}
            {xDefault && (
                <link rel="alternate" hrefLang="x-default" href={xDefault.href} />
            )}

            <meta property="og:type" content={ogType} />
            <meta property="og:locale" content={t.meta.ogLocale} />
            {locales
                .filter((l) => l !== locale && pathFor(l) !== undefined)
                .map((l) => (
                    <meta
                        key={`og-locale-${l}`}
                        property="og:locale:alternate"
                        content={getDictionary(l).meta.ogLocale}
                    />
                ))}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={image.url} />
            <meta property="og:image:width" content={String(image.width)} />
            <meta property="og:image:height" content={String(image.height)} />
            <meta property="og:image:alt" content={image.alt} />
            {article && (
                <>
                    <meta property="article:published_time" content={article.publishedTime} />
                    {article.modifiedTime && (
                        <meta property="article:modified_time" content={article.modifiedTime} />
                    )}
                    <meta property="article:author" content={config.linkedInUrl} />
                    <meta property="article:section" content={article.section} />
                    {article.tags.map((tag) => (
                        <meta key={`article-tag-${tag}`} property="article:tag" content={tag} />
                    ))}
                </>
            )}
            {ogType === "profile" && (
                <>
                    <meta property="profile:first_name" content="Minh" />
                    <meta property="profile:last_name" content="Phan Công" />
                </>
            )}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image.url} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </Head>
    );
}
