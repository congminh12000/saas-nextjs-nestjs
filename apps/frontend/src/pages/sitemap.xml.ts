import type { GetServerSideProps } from "next";
import { absoluteUrl } from "../components/SEO";
import { locales, type Locale } from "../i18n";
import {
    getAllCategoryPaths,
    getAllPostPaths,
    getCategoryTranslations,
    getLatestUpdate,
    getPostBySlug,
    getCategoryBySlug,
} from "../lib/blog/repository";

/**
 * Sitemap built from the blog data, with hreflang alternates for every URL.
 * Served at /sitemap.xml (replaces the old static public/sitemap.xml).
 */

interface Entry {
    paths: Partial<Record<Locale, string>>; // path per locale, no prefix
    lastmod?: string;
    priority: string;
}

function urlXml(entry: Entry): string {
    const alternates = locales
        .filter((l) => entry.paths[l] !== undefined)
        .map(
            (l) =>
                `<xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(entry.paths[l]!, l)}"/>`,
        );
    if (entry.paths.vi !== undefined) {
        alternates.push(
            `<xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(entry.paths.vi, "vi")}"/>`,
        );
    }
    return locales
        .filter((l) => entry.paths[l] !== undefined)
        .map((l) => {
            const loc = absoluteUrl(entry.paths[l]!, l);
            return [
                "<url>",
                `<loc>${loc}</loc>`,
                entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : "",
                `<priority>${entry.priority}</priority>`,
                ...alternates,
                "</url>",
            ].join("");
        })
        .join("\n");
}

export function buildSitemap(): string {
    const entries: Entry[] = [
        { paths: { vi: "/", en: "/" }, lastmod: getLatestUpdate("vi"), priority: "1.0" },
        { paths: { vi: "/blog", en: "/blog" }, lastmod: getLatestUpdate("vi"), priority: "0.8" },
    ];

    const seenPosts = new Set<string>();
    for (const { locale, slug } of getAllPostPaths()) {
        const post = getPostBySlug(locale, slug);
        if (!post || post.seo?.isNoIndex || seenPosts.has(post.id)) continue;
        seenPosts.add(post.id);
        entries.push({
            paths: Object.fromEntries(
                Object.entries(post.translations).map(([l, s]) => [l, `/blog/${s}`]),
            ),
            lastmod: post.updatedAt ?? post.publishedAt,
            priority: "0.7",
        });
    }

    const seenCategories = new Set<string>();
    for (const { locale, slug } of getAllCategoryPaths()) {
        const category = getCategoryBySlug(locale, slug);
        if (!category || seenCategories.has(category.id)) continue;
        seenCategories.add(category.id);
        entries.push({
            paths: Object.fromEntries(
                Object.entries(getCategoryTranslations(category.id)).map(([l, s]) => [
                    l,
                    `/blog/category/${s}`,
                ]),
            ),
            priority: "0.5",
        });
    }

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        entries.map(urlXml).join("\n"),
        "</urlset>",
    ].join("\n");
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.write(buildSitemap());
    res.end();
    return { props: {} };
};

export default function Sitemap() {
    return null;
}
