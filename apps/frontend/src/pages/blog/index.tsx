import type { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import { SITE_URL, absoluteUrl } from "../../components/SEO";
import { getDictionary, toLocale, useT } from "../../i18n";
import {
    BLOG_LOAD_MORE_SIZE,
    BLOG_PAGE_SIZE,
    getCategories,
    getPostPage,
} from "../../lib/blog/repository";
import type { Category, PostSummary } from "../../lib/blog/types";
import { BlogIndexView } from "../../marketing-pages/blog/BlogIndexView";
import { postHref } from "../../marketing-pages/blog/shared";

interface Props {
    posts: PostSummary[];
    total: number;
    categories: (Category & { count: number })[];
}

export const getStaticProps: GetStaticProps<Props> = ({ locale }) => {
    const l = toLocale(locale);
    const { posts, total } = getPostPage(l, { limit: BLOG_PAGE_SIZE });
    return {
        props: { posts, total, categories: getCategories(l) },
        revalidate: 3600,
    };
};

export default function BlogIndex({ posts, total, categories }: Props) {
    const { locale, t } = useT();
    const blogUrl = absoluteUrl("/blog", locale);
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: t.blog.seoTitle,
            description: t.blog.seoDescription,
            url: blogUrl,
            inLanguage: getDictionary(locale).meta.languageTag,
            author: { "@type": "Person", name: "Phan Công Minh", url: `${SITE_URL}/` },
            blogPost: posts.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: absoluteUrl(postHref(p.slug), locale),
                datePublished: p.publishedAt,
            })),
        },
    ];

    return (
        <Layout
            seoTitle={t.blog.seoTitle}
            seoDescription={t.blog.seoDescription}
            headerTitle="Minh Phan"
            ogType="website"
            jsonLd={jsonLd}
        >
            <BlogIndexView
                title={t.blog.title}
                label={t.blog.label}
                intro={t.blog.intro}
                posts={posts}
                total={total}
                allTotal={total}
                categories={categories}
                loadMoreSize={BLOG_LOAD_MORE_SIZE}
            />
        </Layout>
    );
}
