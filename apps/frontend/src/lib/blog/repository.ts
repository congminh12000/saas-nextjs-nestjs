import { locales, type Locale } from "../../i18n/types";
import { readingMinutes } from "./pt";
import type { SamplePost } from "./sample/define";
import { categoryIds, getCategory, type CategoryId } from "./sample/meta";
import { lighthousePost, i18nPost, redisPost } from "./sample/posts-engineering";
import { scummyBearsPost, tnkmPost } from "./sample/posts-case-study";
import { aiPost, remotePost, darkUiPost, proposalPost } from "./sample/posts-other";
import type { Category, Post, PostSummary } from "./types";

/**
 * Blog data access. Today it reads the bundled sample posts; when Sanity is
 * connected, replace the bodies of these functions with GROQ queries and keep
 * the signatures, so pages and components stay unchanged.
 */

export const BLOG_PAGE_SIZE = 5; // first screen: 1 featured + 4 cards
export const BLOG_LOAD_MORE_SIZE = 4;

const samplePosts: SamplePost[] = [
    aiPost,
    lighthousePost,
    i18nPost,
    scummyBearsPost,
    tnkmPost,
    remotePost,
    darkUiPost,
    redisPost,
    proposalPost,
];

function toPost(sample: SamplePost, locale: Locale): Post {
    const c = sample.content[locale];
    return {
        id: sample.id,
        locale,
        slug: c.slug,
        title: c.title,
        excerpt: c.excerpt,
        cover: {
            src: sample.cover.src,
            width: sample.cover.width,
            height: sample.cover.height,
            blurDataURL: sample.cover.blurDataURL,
            alt: c.coverAlt,
        },
        category: getCategory(sample.category, locale),
        tags: sample.tags,
        publishedAt: sample.publishedAt,
        ...(sample.updatedAt ? { updatedAt: sample.updatedAt } : {}),
        readingMinutes: readingMinutes(c.body),
        layout: sample.layout,
        body: c.body,
        ...(c.caseStudy ? { caseStudy: c.caseStudy } : {}),
        translations: Object.fromEntries(
            locales.map((l) => [l, sample.content[l].slug]),
        ),
    };
}

export function toSummary(post: Post): PostSummary {
    const {
        body: _body,
        caseStudy: _caseStudy,
        seo: _seo,
        translations: _translations,
        ...summary
    } = post;
    return summary;
}

function allPosts(locale: Locale): Post[] {
    return samplePosts
        .map((s) => toPost(s, locale))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostPage(
    locale: Locale,
    { offset = 0, limit = BLOG_PAGE_SIZE, categorySlug }: {
        offset?: number;
        limit?: number;
        categorySlug?: string;
    } = {},
): { posts: PostSummary[]; total: number } {
    const filtered = allPosts(locale).filter(
        (p) => !categorySlug || p.category.slug === categorySlug,
    );
    return {
        posts: filtered.slice(offset, offset + limit).map(toSummary),
        total: filtered.length,
    };
}

export function getPostBySlug(locale: Locale, slug: string): Post | null {
    return allPosts(locale).find((p) => p.slug === slug) ?? null;
}

export function getAllPostPaths(): { locale: Locale; slug: string }[] {
    return locales.flatMap((locale) =>
        allPosts(locale).map((p) => ({ locale, slug: p.slug })),
    );
}

export function getCategories(
    locale: Locale,
): (Category & { count: number })[] {
    const posts = allPosts(locale);
    return categoryIds
        .map((id) => getCategory(id, locale))
        .map((c) => ({
            ...c,
            count: posts.filter((p) => p.category.id === c.id).length,
        }))
        .filter((c) => c.count > 0);
}

export function getCategoryBySlug(
    locale: Locale,
    slug: string,
): Category | null {
    return getCategories(locale).find((c) => c.slug === slug) ?? null;
}

/** Slug of a category in every language, for hreflang and the switch. */
export function getCategoryTranslations(
    categoryId: string,
): Partial<Record<Locale, string>> {
    if (!categoryIds.includes(categoryId as CategoryId)) {
        return {};
    }
    return Object.fromEntries(
        locales.map((l) => [l, getCategory(categoryId as CategoryId, l).slug]),
    );
}

export function getAllCategoryPaths(): { locale: Locale; slug: string }[] {
    return locales.flatMap((locale) =>
        getCategories(locale).map((c) => ({ locale, slug: c.slug })),
    );
}

/** Previous (older) and next (newer) posts, plus up to 3 related ones. */
export function getPostNeighbours(post: Post): {
    previous: PostSummary | null;
    next: PostSummary | null;
    related: PostSummary[];
} {
    const posts = allPosts(post.locale);
    const index = posts.findIndex((p) => p.id === post.id);
    const others = posts.filter((p) => p.id !== post.id);
    const related = [
        ...others.filter((p) => p.category.id === post.category.id),
        ...others.filter(
            (p) =>
                p.category.id !== post.category.id &&
                p.tags.some((t) => post.tags.includes(t)),
        ),
        ...others,
    ]
        .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
        .slice(0, 3)
        .map(toSummary);
    return {
        next: index > 0 ? toSummary(posts[index - 1]) : null,
        previous:
            index >= 0 && index < posts.length - 1
                ? toSummary(posts[index + 1])
                : null,
        related,
    };
}

export function getLatestUpdate(locale: Locale): string | undefined {
    const posts = allPosts(locale);
    return posts.reduce<string | undefined>((latest, p) => {
        const d = p.updatedAt ?? p.publishedAt;
        return !latest || d > latest ? d : latest;
    }, undefined);
}
