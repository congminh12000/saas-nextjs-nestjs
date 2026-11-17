import clsx from "clsx";
import { useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useT } from "../../i18n";
import type { PostSummary } from "../../lib/blog/types";
import { PostCard, type PostCardVariant } from "./PostCard";

/**
 * Asymmetric editorial grid on a 12-column track.
 *
 *   [ featured ............................. ]   first post only
 *   [ tall ........ 7 ][ text ...... 5 ]          text card drops down
 *   [ compact .. 5 ][ overlay ........ 7 ]        zig-zag back, compact sits low
 *   ...repeats every 4 posts
 */
function slotFor(index: number, hasFeatured: boolean): {
    variant: PostCardVariant;
    className: string;
} {
    if (hasFeatured && index === 0) {
        return { variant: "featured", className: "lg:col-span-12" };
    }
    const k = (index - (hasFeatured ? 1 : 0)) % 4;
    switch (k) {
        case 0:
            return { variant: "tall", className: "lg:col-span-7" };
        case 1:
            return { variant: "text", className: "lg:col-span-5 lg:mt-20 lg:self-start" };
        case 2:
            return { variant: "compact", className: "lg:col-span-5 lg:self-end" };
        default:
            return { variant: "overlay", className: "lg:col-span-7" };
    }
}

export function BlogGrid({
    initialPosts,
    total,
    categorySlug,
    loadMoreSize,
    hasFeatured = true,
}: {
    initialPosts: PostSummary[];
    total: number;
    categorySlug?: string;
    loadMoreSize: number;
    hasFeatured?: boolean;
}) {
    const { locale, t } = useT();
    const [posts, setPosts] = useState(initialPosts);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const remaining = total - posts.length;

    async function loadMore() {
        setIsLoading(true);
        setHasError(false);
        try {
            const params = new URLSearchParams({
                locale,
                offset: String(posts.length),
                limit: String(loadMoreSize),
                ...(categorySlug ? { category: categorySlug } : {}),
            });
            const res = await fetch(`/api/blog/posts?${params}`);
            if (!res.ok) throw new Error(String(res.status));
            const data = (await res.json()) as { posts: PostSummary[] };
            setPosts((current) => [
                ...current,
                ...data.posts.filter((p) => !current.some((c) => c.id === p.id)),
            ]);
        } catch {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    if (posts.length === 0) {
        return <p className="mt-12 text-security-text">{t.blog.empty}</p>;
    }

    return (
        <div>
            <ul className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {posts.map((post, index) => {
                    const slot = slotFor(index, hasFeatured);
                    return (
                        <li
                            key={post.id}
                            className={clsx(
                                "animate-headline",
                                slot.className,
                            )}
                            style={{ animationDelay: `${(index % loadMoreSize) * 0.06}s` }}
                        >
                            <PostCard
                                post={post}
                                variant={slot.variant}
                                index={index}
                                isPriority={index === 0}
                            />
                        </li>
                    );
                })}
            </ul>

            <div className="mt-16 flex flex-col items-center gap-3" aria-live="polite">
                {remaining > 0 ? (
                    <button
                        type="button"
                        onClick={loadMore}
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 rounded-md border border-security-border px-6 py-3 font-mono text-sm text-security-light transition-all hover:border-accent/50 hover:text-accent disabled:cursor-wait disabled:opacity-60"
                    >
                        {isLoading
                            ? t.blog.loading
                            : t.blog.loadMore(Math.min(remaining, loadMoreSize))}
                        {!isLoading && <ArrowDownIcon className="h-4 w-4" />}
                    </button>
                ) : (
                    <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                        {t.blog.allLoaded} · {total}/{total}
                    </span>
                )}
                {hasError && (
                    <p className="text-sm text-rose-300">{t.blog.loadError}</p>
                )}
                {remaining > 0 && (
                    <span className="font-mono text-xs text-security-muted">
                        {posts.length}/{total}
                    </span>
                )}
            </div>
        </div>
    );
}
