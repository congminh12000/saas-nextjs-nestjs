import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import { toLocale, useT } from "../../../i18n";
import {
    BLOG_LOAD_MORE_SIZE,
    BLOG_PAGE_SIZE,
    getAllCategoryPaths,
    getCategories,
    getCategoryBySlug,
    getCategoryTranslations,
    getPostPage,
} from "../../../lib/blog/repository";
import type { Category, PostSummary } from "../../../lib/blog/types";
import { BlogIndexView } from "../../../marketing-pages/blog/BlogIndexView";
import { categoryHref } from "../../../marketing-pages/blog/shared";

interface Props {
    category: Category;
    posts: PostSummary[];
    total: number;
    allTotal: number;
    categories: (Category & { count: number })[];
    translations: Partial<Record<string, string>>;
}

export const getStaticPaths: GetStaticPaths = () => ({
    paths: getAllCategoryPaths().map(({ locale, slug }) => ({
        params: { slug },
        locale,
    })),
    fallback: "blocking",
});

export const getStaticProps: GetStaticProps<Props> = ({ params, locale }) => {
    const l = toLocale(locale);
    const slug = String(params?.slug ?? "");
    const category = getCategoryBySlug(l, slug);
    if (!category) {
        return { notFound: true, revalidate: 60 };
    }
    const { posts, total } = getPostPage(l, {
        limit: BLOG_PAGE_SIZE,
        categorySlug: slug,
    });
    return {
        props: {
            category,
            posts,
            total,
            allTotal: getPostPage(l, { limit: 0 }).total,
            categories: getCategories(l),
            translations: getCategoryTranslations(category.id),
        },
        revalidate: 3600,
    };
};

export default function BlogCategory({
    category,
    posts,
    total,
    allTotal,
    categories,
    translations,
}: Props) {
    const { t } = useT();
    const alternates = Object.fromEntries(
        Object.entries(translations)
            .filter(([, s]) => s)
            .map(([l, s]) => [l, categoryHref(s as string)]),
    );
    return (
        <Layout
            seoTitle={`${category.title} | ${t.blog.title}`}
            seoDescription={category.description}
            headerTitle="Minh Phan"
            ogType="website"
            alternates={alternates}
        >
            <BlogIndexView
                title={category.title}
                label={`~/blog/${category.slug}`}
                intro={category.description}
                posts={posts}
                total={total}
                allTotal={allTotal}
                categories={categories}
                activeCategorySlug={category.slug}
                loadMoreSize={BLOG_LOAD_MORE_SIZE}
            />
        </Layout>
    );
}
