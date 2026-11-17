import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon,
    LinkIcon,
} from "@heroicons/react/24/outline";
import { LinkedInIcon } from "../../components/LinkedInIcon";
import { useT } from "../../i18n";
import type { Author, CaseStudyFacts, Post, PostSummary, TocItem } from "../../lib/blog/types";
import { PostCard } from "./PostCard";
import { CategoryPill, PostMeta, postHref } from "./shared";

export function Breadcrumb({ post }: { post: Pick<Post, "category"> }) {
    const { t } = useT();
    return (
        <nav aria-label="Breadcrumb" className="font-mono text-xs tracking-wider text-security-muted">
            <Link href="/blog" className="hover:text-accent transition-colors">~/blog</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/blog/category/${post.category.slug}`} className="hover:text-accent transition-colors">
                {post.category.slug}
            </Link>
            <span className="sr-only"> · {t.blog.title}</span>
        </nav>
    );
}

/** Category, title, excerpt and meta. Reused by every layout. */
export function PostTitle({
    post,
    className,
    titleClassName,
}: {
    post: Post;
    className?: string;
    titleClassName?: string;
}) {
    return (
        <div className={className}>
            <div className="animate-headline flex flex-wrap items-center gap-3">
                <CategoryPill category={post.category} />
                <PostMeta post={post} />
            </div>
            <h1
                className={clsx(
                    "animate-headline mt-6 font-display leading-[1.1] tracking-tight text-security-light",
                    titleClassName ?? "text-4xl md:text-5xl lg:text-6xl",
                )}
                style={{ animationDelay: "0.08s" }}
            >
                {post.title}
            </h1>
            <p className="animate-headline mt-6 text-lg leading-relaxed text-security-text md:text-xl" style={{ animationDelay: "0.16s" }}>
                {post.excerpt}
            </p>
        </div>
    );
}

export function TableOfContents({ items, className }: { items: TocItem[]; className?: string }) {
    const { t } = useT();
    const [activeId, setActiveId] = useState(items[0]?.id);

    useEffect(() => {
        const headings = items
            .map((i) => document.getElementById(i.id))
            .filter((el): el is HTMLElement => el !== null);
        if (headings.length === 0) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: "0px 0px -70% 0px" },
        );
        headings.forEach((h) => observer.observe(h));
        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;
    return (
        <nav aria-label={t.blog.toc} className={className}>
            <p className="font-mono text-xs uppercase tracking-wider text-security-muted">{t.blog.toc}</p>
            <ul className="mt-4 space-y-1 border-l border-security-border">
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={clsx(
                                "-ml-px block border-l py-1.5 text-sm transition-colors",
                                item.level === 3 ? "pl-7" : "pl-4",
                                item.id === activeId
                                    ? "border-accent text-security-light"
                                    : "border-transparent text-security-muted hover:text-security-light",
                            )}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

/** Collapsible table of contents for small screens. */
export function MobileToc({ items }: { items: TocItem[] }) {
    const { t } = useT();
    if (items.length === 0) return null;
    return (
        <details className="group my-8 rounded-xl border border-security-border bg-security-dark lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-mono text-xs uppercase tracking-wider text-security-text">
                {t.blog.toc}
                <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="space-y-2 border-t border-security-border px-5 py-4">
                {items.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                        <a href={`#${item.id}`} className="text-sm text-security-text hover:text-accent">
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </details>
    );
}

export function ShareLinks({ url, title, className }: { url: string; title: string; className?: string }) {
    const { t } = useT();
    const [isCopied, setIsCopied] = useState(false);
    const linkClass =
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-security-border text-security-text transition-colors hover:border-accent/50 hover:text-accent";
    return (
        <div className={clsx("flex items-center gap-2", className)}>
            <span className="mr-2 font-mono text-xs uppercase tracking-wider text-security-muted">{t.blog.share}</span>
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={linkClass}
            >
                <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
                href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className={clsx(linkClass, "font-mono text-sm")}
            >
                𝕏
            </a>
            <button
                type="button"
                aria-label={t.blog.copyLink}
                title={isCopied ? t.blog.copied : t.blog.copyLink}
                onClick={() => {
                    void navigator.clipboard?.writeText(url).then(() => {
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 1500);
                    });
                }}
                className={linkClass}
            >
                {isCopied ? <CheckIcon className="h-4 w-4 text-accent" /> : <LinkIcon className="h-4 w-4" />}
            </button>
        </div>
    );
}

export function AuthorCard({ author }: { author: Author }) {
    const { t } = useT();
    return (
        <div className="flex flex-col gap-5 rounded-2xl border border-security-border bg-security-dark p-6 sm:flex-row sm:items-center">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-security-border">
                <Image src={author.image.src} alt={author.image.alt} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1">
                <p className="font-mono text-xs uppercase tracking-wider text-security-muted">{t.blog.writtenBy}</p>
                <p className="mt-1 font-display text-lg text-security-light">
                    {author.name} <span className="text-security-muted">· {author.role}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-security-text">{author.bio}</p>
            </div>
            <a
                href={author.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-md border border-security-border px-4 py-2 font-mono text-sm text-security-light transition-colors hover:border-accent/50 hover:text-accent sm:self-center"
            >
                LinkedIn <LinkedInIcon className="h-4 w-4" />
            </a>
        </div>
    );
}

export function CaseStudyFactsCard({ facts }: { facts: CaseStudyFacts }) {
    const { t } = useT();
    const rows = [
        { label: t.blog.caseStudy.client, value: facts.client },
        { label: t.blog.caseStudy.role, value: facts.role },
        { label: t.blog.caseStudy.year, value: facts.year },
    ];
    return (
        <div className="rounded-2xl border border-security-border bg-security-dark p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{t.blog.caseStudy.heading}</p>
            <dl className="mt-5 space-y-4">
                {rows.map((row) => (
                    <div key={row.label} className="border-b border-security-border pb-4">
                        <dt className="font-mono text-xs uppercase tracking-wider text-security-muted">{row.label}</dt>
                        <dd className="mt-1 text-security-light">{row.value}</dd>
                    </div>
                ))}
                <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-security-muted">{t.blog.caseStudy.stack}</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                        {facts.stack.map((s) => (
                            <span key={s} className="rounded-full border border-security-border px-3 py-1 text-xs text-security-text">
                                {s}
                            </span>
                        ))}
                    </dd>
                </div>
            </dl>
            {facts.url && (
                <a
                    href={facts.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-sm text-security-black transition-all hover:bg-accent-dim hover:shadow-glow"
                >
                    {t.blog.caseStudy.visit}
                    <ArrowRightIcon className="h-4 w-4" />
                </a>
            )}
        </div>
    );
}

export function PostFooter({
    previous,
    next,
    related,
}: {
    previous: PostSummary | null;
    next: PostSummary | null;
    related: PostSummary[];
}) {
    const { t } = useT();
    const navCard = (post: PostSummary, dir: "previous" | "next") => (
        <Link
            href={postHref(post.slug)}
            className={clsx(
                "group flex flex-col gap-2 rounded-2xl border border-security-border bg-security-dark p-6 transition-colors hover:border-accent/50",
                dir === "next" && "sm:items-end sm:text-right",
            )}
        >
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-security-muted">
                {dir === "previous" && <ArrowLeftIcon className="h-3.5 w-3.5" />}
                {dir === "previous" ? t.blog.previous : t.blog.next}
                {dir === "next" && <ArrowRightIcon className="h-3.5 w-3.5" />}
            </span>
            <span className="font-display text-lg leading-snug text-security-light group-hover:text-accent transition-colors">
                {post.title}
            </span>
        </Link>
    );

    return (
        <div className="mt-20 space-y-20 pt-16">
            {(previous || next) && (
                <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>{previous && navCard(previous, "previous")}</div>
                    <div>{next && navCard(next, "next")}</div>
                </nav>
            )}
            {related.length > 0 && (
                <section>
                    <div className="mb-8 flex items-center gap-4">
                        <h2 className="font-display text-2xl text-security-light md:text-3xl">{t.blog.related}</h2>
                        <div className="h-px flex-1 bg-security-border" />
                        <Link href="/blog" className="font-mono text-xs uppercase tracking-wider text-security-text hover:text-accent">
                            {t.blog.allPosts} →
                        </Link>
                    </div>
                    <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {related.map((post, index) => (
                            <li key={post.id}>
                                <PostCard post={post} variant="compact" index={index} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
