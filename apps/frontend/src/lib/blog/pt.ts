import type {
    BlogImage,
    PostBodyBlock,
    PtCalloutBlock,
    PtCodeBlock,
    PtTextBlock,
    TocItem,
} from "./types";

/**
 * Tiny builders for Portable Text, used by the sample posts. Inline syntax
 * inside text: **bold**, *italic*, `code`, [label](https://url).
 */

let keyCounter = 0;
const nextKey = () => `k${(keyCounter++).toString(36)}`;

function parseInline(text: string): Pick<PtTextBlock, "children" | "markDefs"> {
    const children: PtTextBlock["children"] = [];
    const markDefs: NonNullable<PtTextBlock["markDefs"]> = [];
    const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let last = 0;
    for (const match of text.matchAll(pattern)) {
        const index = match.index ?? 0;
        if (index > last) {
            children.push(span(text.slice(last, index)));
        }
        const token = match[0];
        if (token.startsWith("**")) {
            children.push(span(token.slice(2, -2), ["strong"]));
        } else if (token.startsWith("`")) {
            children.push(span(token.slice(1, -1), ["code"]));
        } else if (token.startsWith("[")) {
            const [, label, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(token) ?? [];
            const markKey = nextKey();
            markDefs.push({ _key: markKey, _type: "link", href });
            children.push(span(label ?? href ?? "", [markKey]));
        } else {
            children.push(span(token.slice(1, -1), ["em"]));
        }
        last = index + token.length;
    }
    if (last < text.length) {
        children.push(span(text.slice(last)));
    }
    return { children, markDefs };
}

function span(text: string, marks: string[] = []) {
    return { _type: "span" as const, _key: nextKey(), text, marks };
}

function block(
    style: "normal" | "h2" | "h3" | "blockquote",
    text: string,
    listItem?: "bullet" | "number",
): PtTextBlock {
    return {
        _type: "block",
        _key: nextKey(),
        style,
        ...(listItem ? { listItem, level: 1 } : {}),
        ...parseInline(text),
    };
}

export const p = (text: string) => block("normal", text);
export const h2 = (text: string) => block("h2", text);
export const h3 = (text: string) => block("h3", text);
export const quote = (text: string) => block("blockquote", text);
export const ul = (...items: string[]) =>
    items.map((item) => block("normal", item, "bullet"));
export const ol = (...items: string[]) =>
    items.map((item) => block("normal", item, "number"));

export const code = (
    language: string,
    source: string,
    filename?: string,
): PtCodeBlock => ({
    _type: "code",
    _key: nextKey(),
    language,
    ...(filename ? { filename } : {}),
    code: source.replace(/^\n/, "").replace(/\s+$/, ""),
});

export const callout = (
    tone: PtCalloutBlock["tone"],
    text: string,
    title?: string,
): PtCalloutBlock => ({
    _type: "callout",
    _key: nextKey(),
    tone,
    text,
    ...(title ? { title } : {}),
});

export const pullQuote = (text: string, cite?: string) => ({
    _type: "pullQuote" as const,
    _key: nextKey(),
    text,
    ...(cite ? { cite } : {}),
});

export const img = (
    image: BlogImage,
    size: "inline" | "wide" | "full" = "inline",
) => ({ _type: "image" as const, _key: nextKey(), image, size });

export const gallery = (...images: BlogImage[]) => ({
    _type: "gallery" as const,
    _key: nextKey(),
    images,
});

/** Flattens nested arrays produced by ul()/ol() into one body array. */
export const body = (...blocks: (PostBodyBlock | PostBodyBlock[])[]) =>
    blocks.flat();

// ---- Derived data ----------------------------------------------------------

export function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function blockText(block: PostBodyBlock): string {
    switch (block._type) {
        case "block":
            return block.children.map((c) => ("text" in c ? c.text : "")).join("");
        case "callout":
            return `${block.title ?? ""} ${block.text}`;
        case "pullQuote":
            return block.text;
        case "code":
            return block.code;
        default:
            return "";
    }
}

/** ~220 words per minute; code counts at half speed. */
export function readingMinutes(blocks: PostBodyBlock[]): number {
    const words = blocks.reduce((total, b) => {
        const count = blockText(b).split(/\s+/).filter(Boolean).length;
        return total + (b._type === "code" ? count / 2 : count);
    }, 0);
    return Math.max(1, Math.round(words / 220));
}

export function tableOfContents(
    blocks: PostBodyBlock[],
): (TocItem & { key: string })[] {
    const used = new Map<string, number>();
    return blocks.flatMap((b) => {
        if (b._type !== "block" || (b.style !== "h2" && b.style !== "h3")) {
            return [];
        }
        const text = blockText(b);
        const base = slugify(text) || "section";
        const seen = used.get(base) ?? 0;
        used.set(base, seen + 1);
        return [
            {
                key: b._key,
                id: seen ? `${base}-${seen}` : base,
                text,
                level: b.style === "h2" ? 2 : 3,
            } as TocItem & { key: string },
        ];
    });
}
