import type {
    PortableTextBlock,
    PortableTextSpan,
    PortableTextMarkDefinition,
} from "@portabletext/types";
import type { Locale } from "../../i18n/types";

/**
 * Blog data shapes. They mirror the planned Sanity schema (post, category,
 * author) so the sample repository can later be swapped for GROQ queries
 * without touching the UI.
 */

/** Image as the UI needs it: works for static imports and Sanity CDN assets. */
export interface BlogImage {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** Tiny base64 preview for placeholder="blur" (Sanity: metadata.lqip) */
    blurDataURL?: string;
    caption?: string;
}

/** Detail page layout, chosen per post in the CMS. */
export type PostLayout =
    | "standard" // cover + content + sticky table of contents
    | "feature" // full-bleed cover with title overlay, centered reading column
    | "split" // sticky cover/title panel on the left, content on the right
    | "case-study" // project facts sidebar + wide images
    | "note"; // no cover, short note in a narrow terminal-style column

export type CategoryColor = "accent" | "warning" | "danger" | "brand";

export interface Category {
    id: string;
    slug: string;
    title: string;
    description: string;
    color: CategoryColor;
}

export interface Author {
    name: string;
    role: string;
    bio: string;
    image: BlogImage;
    linkedInUrl: string;
}

export interface CaseStudyFacts {
    client: string;
    role: string;
    year: string;
    stack: string[];
    url?: string;
}

// ---- Portable Text custom blocks -------------------------------------------

export interface PtImageBlock {
    _type: "image";
    _key: string;
    image: BlogImage;
    /** inline = reading column, wide = wider than text, full = edge to edge */
    size?: "inline" | "wide" | "full";
}

export interface PtGalleryBlock {
    _type: "gallery";
    _key: string;
    images: BlogImage[];
}

export interface PtCodeBlock {
    _type: "code";
    _key: string;
    language: string;
    filename?: string;
    code: string;
    /** Pre-highlighted HTML, filled in at build time by highlightPostBody */
    html?: string;
}

export interface PtCalloutBlock {
    _type: "callout";
    _key: string;
    tone: "info" | "tip" | "warning";
    title?: string;
    text: string;
}

export interface PtPullQuoteBlock {
    _type: "pullQuote";
    _key: string;
    text: string;
    cite?: string;
}

// `_type` narrowed to the literal "block" so PostBodyBlock is a proper
// discriminated union.
export type PtTextBlock = Omit<
    PortableTextBlock<
        PortableTextMarkDefinition,
        PortableTextSpan,
        "normal" | "h2" | "h3" | "blockquote",
        "bullet" | "number"
    >,
    "_type"
> & { _type: "block" };

export type PostBodyBlock =
    | PtTextBlock
    | PtImageBlock
    | PtGalleryBlock
    | PtCodeBlock
    | PtCalloutBlock
    | PtPullQuoteBlock;

// ---- Posts -----------------------------------------------------------------

export interface PostSummary {
    id: string;
    locale: Locale;
    slug: string;
    title: string;
    excerpt: string;
    cover: BlogImage;
    category: Category;
    tags: string[];
    publishedAt: string; // ISO date
    updatedAt?: string;
    readingMinutes: number;
    layout: PostLayout;
}

export interface Post extends PostSummary {
    body: PostBodyBlock[];
    caseStudy?: CaseStudyFacts;
    seo?: { title?: string; description?: string; isNoIndex?: boolean };
    /** Slug of this post in each language it exists in */
    translations: Partial<Record<Locale, string>>;
}

export interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}
