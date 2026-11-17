import clsx from "clsx";
import Link from "next/link";
import { Container } from "../../components/Container";
import { useT } from "../../i18n";
import type { Category, PostSummary } from "../../lib/blog/types";
import { BlogGrid } from "./BlogGrid";
import { categoryHref, categoryStyles } from "./shared";

export function CategoryNav({
    categories,
    activeSlug,
    total,
}: {
    categories: (Category & { count: number })[];
    activeSlug?: string;
    total: number;
}) {
    const { t } = useT();
    const items = [
        { href: "/blog", label: t.blog.all, count: total, isActive: !activeSlug, dot: "bg-security-light" },
        ...categories.map((c) => ({
            href: categoryHref(c.slug),
            label: c.title,
            count: c.count,
            isActive: c.slug === activeSlug,
            dot: categoryStyles[c.color].dot,
        })),
    ];
    return (
        <nav aria-label={t.blog.categoryHeading} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
                {items.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            aria-current={item.isActive ? "page" : undefined}
                            className={clsx(
                                "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                                item.isActive
                                    ? "border-accent/60 bg-accent/10 text-security-light"
                                    : "border-security-border text-security-text hover:border-accent/40 hover:text-security-light",
                            )}
                        >
                            <span className={clsx("h-1.5 w-1.5 rounded-full", item.dot)} />
                            {item.label}
                            <span className="text-security-muted">{item.count}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export function BlogIndexView({
    title,
    label,
    intro,
    posts,
    total,
    categories,
    allTotal,
    activeCategorySlug,
    loadMoreSize,
}: {
    title: string;
    label: string;
    intro: string;
    posts: PostSummary[];
    total: number;
    categories: (Category & { count: number })[];
    allTotal: number;
    activeCategorySlug?: string;
    loadMoreSize: number;
}) {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-security-black" />
            <Container className="relative pt-16 md:pt-24 pb-24">
                <header className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-7">
                        <span className="animate-headline block font-mono text-sm uppercase tracking-wider text-accent">
                            {label}
                        </span>
                        <h1 className="animate-headline mt-4 font-display text-5xl leading-none tracking-tight text-security-light md:text-7xl lg:text-8xl" style={{ animationDelay: "0.1s" }}>
                            {title}
                            <span className="text-accent">_</span>
                        </h1>
                    </div>
                    <p className="animate-headline text-lg leading-relaxed text-security-text lg:col-span-5 lg:pb-3" style={{ animationDelay: "0.2s" }}>
                        {intro}
                    </p>
                </header>

                <div className="mt-12 flex items-center gap-4 border-y border-security-border py-4">
                    <CategoryNav
                        categories={categories}
                        activeSlug={activeCategorySlug}
                        total={allTotal}
                    />
                </div>

                <div className="mt-12">
                    <BlogGrid
                        key={activeCategorySlug ?? "all"}
                        initialPosts={posts}
                        total={total}
                        categorySlug={activeCategorySlug}
                        loadMoreSize={loadMoreSize}
                    />
                </div>
            </Container>
        </div>
    );
}
