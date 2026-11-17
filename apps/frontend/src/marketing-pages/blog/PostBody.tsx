import clsx from "clsx";
import { useState } from "react";
import {
    PortableText,
    type PortableTextComponents,
} from "@portabletext/react";
import {
    CheckIcon,
    ClipboardDocumentIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useT } from "../../i18n";
import { tableOfContents } from "../../lib/blog/pt";
import type {
    PostBodyBlock,
    PtCalloutBlock,
    PtCodeBlock,
    PtGalleryBlock,
    PtImageBlock,
    PtPullQuoteBlock,
} from "../../lib/blog/types";
import { BlogPicture } from "./shared";

/**
 * Breakout sizes are relative to the reading column. `wide` pushes past the
 * column on large screens; `full` spans the viewport.
 */
export type Breakout = "none" | "left" | "center";

const wideClass: Record<Breakout, string> = {
    none: "",
    left: "lg:-ml-16 xl:-ml-24", // sidebar on the right: grow leftwards only
    center: "lg:-mx-16 xl:-mx-24", // centered column: grow both ways
};

function sizeClass(size: "inline" | "wide" | "full", mode: Breakout): string {
    if (size === "inline" || mode === "none") return "";
    if (size === "full" && mode === "center") {
        return "relative left-1/2 w-screen -translate-x-1/2";
    }
    return wideClass[mode];
}

function CopyButton({ text }: { text: string }) {
    const { t } = useT();
    const [isCopied, setIsCopied] = useState(false);
    return (
        <button
            type="button"
            onClick={() => {
                void navigator.clipboard?.writeText(text).then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 1500);
                });
            }}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-security-muted transition-colors hover:text-accent"
        >
            {isCopied ? (
                <CheckIcon className="h-3.5 w-3.5 text-accent" />
            ) : (
                <ClipboardDocumentIcon className="h-3.5 w-3.5" />
            )}
            {isCopied ? t.blog.copied : t.blog.copyCode}
        </button>
    );
}

function CodeBlock({ value }: { value: PtCodeBlock }) {
    return (
        <figure className="my-8 overflow-hidden rounded-xl border border-security-border bg-security-darker shadow-terminal">
            <figcaption className="flex items-center justify-between gap-4 border-b border-security-border bg-security-dark px-4 py-2.5">
                <div className="flex items-center gap-3">
                    <span className="flex gap-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    </span>
                    <span className="font-mono text-xs text-security-muted">
                        {value.filename ?? value.language}
                    </span>
                </div>
                <CopyButton text={value.code} />
            </figcaption>
            {value.html ? (
                <div
                    className="blog-code overflow-x-auto p-4 text-[13px] leading-6"
                    dangerouslySetInnerHTML={{ __html: value.html }}
                />
            ) : (
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-security-light">
                    <code>{value.code}</code>
                </pre>
            )}
        </figure>
    );
}

const calloutStyles = {
    info: { box: "border-violet-400/60 bg-violet-400/5", icon: InformationCircleIcon, color: "text-violet-300" },
    tip: { box: "border-accent/60 bg-accent/5", icon: LightBulbIcon, color: "text-accent" },
    warning: { box: "border-amber-400/60 bg-amber-400/5", icon: ExclamationTriangleIcon, color: "text-amber-300" },
};

function Callout({ value }: { value: PtCalloutBlock }) {
    const style = calloutStyles[value.tone];
    const Icon = style.icon;
    return (
        <aside className={clsx("my-8 flex gap-4 rounded-r-xl border-l-2 p-5", style.box)}>
            <Icon className={clsx("mt-0.5 h-5 w-5 flex-shrink-0", style.color)} />
            <div>
                {value.title && (
                    <p className={clsx("mb-1 font-mono text-sm", style.color)}>{value.title}</p>
                )}
                <p className="text-security-text leading-relaxed">
                    <InlineCode text={value.text} />
                </p>
            </div>
        </aside>
    );
}

/** Renders `code` spans inside plain-string fields (callouts). */
function InlineCode({ text }: { text: string }) {
    return (
        <>
            {text.split(/(`[^`]+`)/g).map((part, i) =>
                part.startsWith("`") ? (
                    <code key={i} className="inline-code">
                        {part.slice(1, -1)}
                    </code>
                ) : (
                    part
                ),
            )}
        </>
    );
}

function PullQuote({ value, mode }: { value: PtPullQuoteBlock; mode: Breakout }) {
    return (
        <figure className={clsx("my-14 border-y border-security-border py-10", wideClass[mode])}>
            <span aria-hidden="true" className="block font-display text-6xl leading-none text-accent">
                “
            </span>
            <blockquote className="mt-2 font-display text-2xl leading-snug text-security-light md:text-3xl">
                {value.text}
            </blockquote>
            {value.cite && (
                <figcaption className="mt-4 font-mono text-xs uppercase tracking-wider text-security-muted">
                    {value.cite}
                </figcaption>
            )}
        </figure>
    );
}

function Figure({ value, mode }: { value: PtImageBlock; mode: Breakout }) {
    const size = value.size ?? "inline";
    const isFullBleed = size === "full" && mode === "center";
    const ratio = value.image.width / value.image.height;
    return (
        <figure className={clsx("my-10", sizeClass(size, mode))}>
            <div
                className={clsx(
                    "relative overflow-hidden border border-security-border bg-security-dark",
                    isFullBleed ? "border-x-0" : "rounded-xl",
                )}
                style={{ aspectRatio: String(ratio) }}
            >
                <BlogPicture
                    image={value.image}
                    sizes={
                        isFullBleed
                            ? "100vw"
                            : size === "wide"
                              ? "(min-width: 1280px) 960px, 100vw"
                              : "(min-width: 768px) 720px, 92vw"
                    }
                />
            </div>
            {value.image.caption && (
                <figcaption className="mt-3 font-mono text-xs text-security-muted">
                    {value.image.caption}
                </figcaption>
            )}
        </figure>
    );
}

function Gallery({ value, mode }: { value: PtGalleryBlock; mode: Breakout }) {
    return (
        <div className={clsx("my-10 grid grid-cols-1 gap-4 sm:grid-cols-2", wideClass[mode])}>
            {value.images.map((image) => (
                <figure key={image.src}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-security-border">
                        <BlogPicture image={image} sizes="(min-width: 1280px) 480px, (min-width: 640px) 50vw, 100vw" />
                    </div>
                    <figcaption className="mt-2 font-mono text-xs text-security-muted">{image.alt}</figcaption>
                </figure>
            ))}
        </div>
    );
}

export function PostBody({
    blocks,
    breakout = "none",
}: {
    blocks: PostBodyBlock[];
    /** How wide images, galleries and pull quotes may grow past the column */
    breakout?: Breakout;
}) {
    const headingIds = new Map(tableOfContents(blocks).map((h) => [h.key, h.id]));

    const components: PortableTextComponents = {
        block: {
            normal: ({ children }) => (
                <p className="my-5 text-[17px] leading-8 text-security-text">{children}</p>
            ),
            h2: ({ children, value }) => {
                const id = headingIds.get(value._key ?? "");
                return (
                    <h2 id={id} className="group mt-14 mb-4 scroll-mt-24 font-display text-2xl leading-tight text-security-light md:text-3xl">
                        <a href={`#${id}`} className="no-underline">
                            {children}
                            <span aria-hidden="true" className="ml-2 text-accent opacity-0 transition-opacity group-hover:opacity-100">#</span>
                        </a>
                    </h2>
                );
            },
            h3: ({ children, value }) => (
                <h3 id={headingIds.get(value._key ?? "")} className="mt-10 mb-3 scroll-mt-24 font-display text-xl text-security-light">
                    {children}
                </h3>
            ),
            blockquote: ({ children }) => (
                <blockquote className="my-8 border-l-2 border-accent pl-5 text-lg leading-8 text-security-light">
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }) => <ul className="my-6 space-y-3">{children}</ul>,
            number: ({ children }) => <ol className="blog-ol my-6 space-y-3">{children}</ol>,
        },
        listItem: {
            bullet: ({ children }) => (
                <li className="flex gap-3 text-[17px] leading-8 text-security-text">
                    <span aria-hidden="true" className="mt-3.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>{children}</span>
                </li>
            ),
            number: ({ children }) => (
                <li className="blog-ol-item flex gap-3 text-[17px] leading-8 text-security-text">
                    <span>{children}</span>
                </li>
            ),
        },
        marks: {
            strong: ({ children }) => <strong className="font-semibold text-security-light">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => <code className="inline-code">{children}</code>,
            link: ({ children, value }) => {
                const href = String(value?.href ?? "#");
                const isExternal = /^https?:\/\//.test(href);
                return (
                    <a
                        href={href}
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-security-light underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
                    >
                        {children}
                    </a>
                );
            },
        },
        types: {
            code: ({ value }) => <CodeBlock value={value as PtCodeBlock} />,
            callout: ({ value }) => <Callout value={value as PtCalloutBlock} />,
            pullQuote: ({ value }) => <PullQuote value={value as PtPullQuoteBlock} mode={breakout} />,
            image: ({ value }) => <Figure value={value as PtImageBlock} mode={breakout} />,
            gallery: ({ value }) => <Gallery value={value as PtGalleryBlock} mode={breakout} />,
        },
    };

    return (
        <div className="blog-body">
            <PortableText value={blocks as never} components={components} />
        </div>
    );
}
