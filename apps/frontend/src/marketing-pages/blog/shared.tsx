import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useT, type Locale } from "../../i18n";
import type { BlogImage, Category, CategoryColor, PostSummary } from "../../lib/blog/types";

export const categoryStyles: Record<CategoryColor, { pill: string; text: string; dot: string; border: string }> = {
    accent: {
        pill: "border-accent/40 bg-accent/10 text-accent",
        text: "text-accent",
        dot: "bg-accent",
        border: "border-accent",
    },
    warning: {
        pill: "border-amber-400/40 bg-amber-400/10 text-amber-300",
        text: "text-amber-300",
        dot: "bg-amber-400",
        border: "border-amber-400",
    },
    danger: {
        pill: "border-rose-400/40 bg-rose-400/10 text-rose-300",
        text: "text-rose-300",
        dot: "bg-rose-400",
        border: "border-rose-400",
    },
    brand: {
        pill: "border-violet-400/40 bg-violet-400/10 text-violet-300",
        text: "text-violet-300",
        dot: "bg-violet-400",
        border: "border-violet-400",
    },
};

export function formatDate(iso: string, locale: Locale): string {
    const date = new Date(`${iso}T00:00:00Z`);
    if (locale === "vi") {
        const d = String(date.getUTCDate()).padStart(2, "0");
        const m = String(date.getUTCMonth() + 1).padStart(2, "0");
        return `${d}.${m}.${date.getUTCFullYear()}`;
    }
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
}

export function postHref(slug: string) {
    return `/blog/${slug}`;
}

export function categoryHref(slug: string) {
    return `/blog/category/${slug}`;
}

export function CategoryPill({
    category,
    isLink = true,
    className,
}: {
    category: Category;
    isLink?: boolean;
    className?: string;
}) {
    const classes = clsx(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider",
        categoryStyles[category.color].pill,
        isLink && "transition-colors hover:border-current",
        className,
    );
    return isLink ? (
        <Link href={categoryHref(category.slug)} className={classes}>
            {category.title}
        </Link>
    ) : (
        <span className={classes}>{category.title}</span>
    );
}

export function PostMeta({
    post,
    className,
}: {
    post: Pick<PostSummary, "publishedAt" | "readingMinutes">;
    className?: string;
}) {
    const { locale, t } = useT();
    return (
        <p
            className={clsx(
                "font-mono text-xs uppercase tracking-wider text-security-muted",
                className,
            )}
        >
            <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, locale)}
            </time>
            <span aria-hidden="true"> · </span>
            {t.blog.minRead(post.readingMinutes)}
        </p>
    );
}

/** next/image with the blur placeholder wired up. Parent sets the box size. */
export function BlogPicture({
    image,
    sizes,
    className,
    isPriority = false,
}: {
    image: BlogImage;
    sizes: string;
    className?: string;
    isPriority?: boolean;
}) {
    return (
        <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={isPriority}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            className={clsx("object-cover", className)}
        />
    );
}

export function SectionHeading({
    title,
    label,
    as: Tag = "h2",
}: {
    title: string;
    label?: string;
    as?: "h1" | "h2";
}) {
    return (
        <div>
            <div className="flex items-center gap-4 mb-3">
                <Tag className="font-display text-2xl md:text-3xl text-security-light">
                    {title}
                </Tag>
                <div className="h-px flex-1 bg-security-border" />
            </div>
            {label && (
                <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                    {label}
                </span>
            )}
        </div>
    );
}
