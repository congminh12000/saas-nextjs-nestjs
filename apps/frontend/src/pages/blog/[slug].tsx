import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import { SITE_URL, absoluteUrl } from "../../components/SEO";
import { getDictionary, toLocale, useT, type Locale } from "../../i18n";
import { highlightPostBody } from "../../lib/blog/highlight";
import {
    getAllPostPaths,
    getPostBySlug,
    getPostNeighbours,
} from "../../lib/blog/repository";
import { getAuthor } from "../../lib/blog/sample/meta";
import type { Author, Post, PostSummary } from "../../lib/blog/types";
import { PostView } from "../../marketing-pages/blog/PostLayouts";
import { categoryHref, postHref } from "../../marketing-pages/blog/shared";

interface Props {
    post: Post;
    author: Author;
    previous: PostSummary | null;
    next: PostSummary | null;
    related: PostSummary[];
}

export const getStaticPaths: GetStaticPaths = () => ({
    paths: getAllPostPaths().map(({ locale, slug }) => ({ params: { slug }, locale })),
    fallback: "blocking",
});

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
    const l = toLocale(locale);
    const post = getPostBySlug(l, String(params?.slug ?? ""));
    if (!post) {
        return { notFound: true, revalidate: 60 };
    }
    const neighbours = getPostNeighbours(post);
    return {
        props: {
            post: { ...post, body: await highlightPostBody(post.body) },
            author: getAuthor(l),
            ...neighbours,
        },
        revalidate: 3600,
    };
};

export default function BlogPost({ post, author, previous, next, related }: Props) {
    const { locale, t } = useT();
    const url = absoluteUrl(postHref(post.slug), locale);
    const coverUrl = `${SITE_URL}${post.cover.src}`;
    const alternates = Object.fromEntries(
        (Object.entries(post.translations) as [Locale, string | undefined][])
            .filter(([, slug]) => slug)
            .map(([l, slug]) => [l, postHref(slug as string)]),
    );

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: [coverUrl],
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            inLanguage: getDictionary(locale).meta.languageTag,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            articleSection: post.category.title,
            keywords: post.tags.join(", "),
            author: {
                "@type": "Person",
                name: author.name,
                url: `${SITE_URL}/`,
                sameAs: [author.linkedInUrl],
            },
            publisher: { "@type": "Person", name: author.name, url: `${SITE_URL}/` },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: t.blog.title, item: absoluteUrl("/blog", locale) },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: post.category.title,
                    item: absoluteUrl(categoryHref(post.category.slug), locale),
                },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
        },
    ];

    return (
        <Layout
            seoTitle={post.seo?.title || post.title}
            seoDescription={post.seo?.description || post.excerpt}
            headerTitle="Minh Phan"
            alternates={alternates}
            ogType="article"
            ogImage={{
                url: coverUrl,
                width: post.cover.width,
                height: post.cover.height,
                alt: post.cover.alt,
            }}
            isNoIndex={post.seo?.isNoIndex}
            jsonLd={jsonLd}
            article={{
                publishedTime: post.publishedAt,
                modifiedTime: post.updatedAt,
                section: post.category.title,
                tags: post.tags,
            }}
        >
            <PostView
                key={post.id}
                post={post}
                author={author}
                url={url}
                previous={previous}
                next={next}
                related={related}
            />
        </Layout>
    );
}
