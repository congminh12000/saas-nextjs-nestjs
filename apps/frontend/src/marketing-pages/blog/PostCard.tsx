import clsx from "clsx";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { PostSummary } from "../../lib/blog/types";
import {
    BlogPicture,
    CategoryPill,
    PostMeta,
    categoryStyles,
    postHref,
} from "./shared";

export type PostCardVariant =
    | "featured" // full row: big image left, text right
    | "tall" // image on top, large title
    | "text" // no image, big index number, accent top rule
    | "compact" // image on top (16:10), smaller title
    | "overlay"; // title on top of the image

const cardBase =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-security-border bg-security-dark transition-colors hover:border-accent/50";

function IndexNumber({ index, className }: { index: number; className?: string }) {
    return (
        <span
            aria-hidden="true"
            className={clsx("font-mono text-xs tracking-wider text-security-muted", className)}
        >
            {String(index + 1).padStart(2, "0")}
        </span>
    );
}

/** Whole card is clickable; the category pill stays its own link above it. */
function StretchedLink({ post }: { post: PostSummary }) {
    return (
        <Link href={postHref(post.slug)} className="after:absolute after:inset-0 after:z-0 focus:outline-none">
            {post.title}
        </Link>
    );
}

export function PostCard({
    post,
    variant,
    index,
    isPriority = false,
}: {
    post: PostSummary;
    variant: PostCardVariant;
    index: number;
    isPriority?: boolean;
}) {
    const pill = <CategoryPill category={post.category} className="relative z-10" />;

    if (variant === "featured") {
        return (
            <article className={clsx(cardBase, "lg:grid lg:grid-cols-12")}>
                <div className="relative aspect-video lg:col-span-7 lg:aspect-auto lg:min-h-[440px]">
                    <BlogPicture
                        image={post.cover}
                        sizes="(min-width: 1280px) 730px, (min-width: 1024px) 58vw, 100vw"
                        isPriority={isPriority}
                        className="transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                </div>
                <div className="flex flex-col justify-between gap-8 p-6 md:p-10 lg:col-span-5">
                    <div className="flex items-center justify-between gap-4">
                        {pill}
                        <IndexNumber index={index} />
                    </div>
                    <div>
                        <h2 className="font-display text-2xl leading-tight text-security-light md:text-4xl">
                            <StretchedLink post={post} />
                        </h2>
                        <p className="mt-4 text-security-text leading-relaxed">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <PostMeta post={post} />
                        <ArrowUpRightIcon className="h-5 w-5 text-security-muted transition-colors group-hover:text-accent" />
                    </div>
                </div>
            </article>
        );
    }

    if (variant === "overlay") {
        return (
            <article className={clsx(cardBase, "min-h-[380px] md:min-h-[460px]")}>
                <BlogPicture
                    image={post.cover}
                    sizes="(min-width: 1280px) 730px, (min-width: 1024px) 58vw, 100vw"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-security-black via-security-black/70 to-security-black/0" />
                <div className="relative mt-auto flex flex-col gap-4 p-6 md:p-8">
                    <div className="flex items-center justify-between gap-4">
                        {pill}
                        <IndexNumber index={index} className="text-security-text" />
                    </div>
                    <h2 className="font-display text-2xl leading-tight text-security-light md:text-3xl">
                        <StretchedLink post={post} />
                    </h2>
                    <p className="line-clamp-2 text-security-text">{post.excerpt}</p>
                    <PostMeta post={post} className="text-security-text" />
                </div>
            </article>
        );
    }

    if (variant === "text") {
        const style = categoryStyles[post.category.color];
        return (
            <article className={clsx(cardBase, "border-t-2 p-6 md:p-8", style.border)}>
                <div className="flex items-start justify-between gap-4">
                    {pill}
                    <span
                        aria-hidden="true"
                        className={clsx("font-display text-6xl leading-none opacity-80", style.text)}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
                <h2 className="mt-10 font-display text-2xl leading-tight text-security-light md:text-[1.75rem]">
                    <StretchedLink post={post} />
                </h2>
                <p className="mt-4 line-clamp-4 text-security-text leading-relaxed">{post.excerpt}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {post.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs text-security-muted">
                            #{tag}
                        </span>
                    ))}
                </div>
                <PostMeta post={post} className="mt-3" />
            </article>
        );
    }

    const isTall = variant === "tall";
    return (
        <article className={cardBase}>
            <div className={clsx("relative", isTall ? "aspect-[4/3]" : "aspect-[16/10]")}>
                <BlogPicture
                    image={post.cover}
                    sizes={
                        isTall
                            ? "(min-width: 1280px) 730px, (min-width: 1024px) 58vw, 100vw"
                            : "(min-width: 1280px) 520px, (min-width: 1024px) 41vw, 100vw"
                    }
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                    {pill}
                    <IndexNumber index={index} />
                </div>
                <h2
                    className={clsx(
                        "font-display leading-tight text-security-light",
                        isTall ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
                    )}
                >
                    <StretchedLink post={post} />
                </h2>
                <p className={clsx("text-security-text", isTall ? "line-clamp-3" : "line-clamp-2")}>
                    {post.excerpt}
                </p>
                <PostMeta post={post} className="mt-auto pt-2" />
            </div>
        </article>
    );
}
