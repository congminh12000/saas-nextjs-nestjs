import { createHighlighter, type Highlighter } from "shiki";
import type { PostBodyBlock } from "./types";

/**
 * Highlights code blocks at build time (getStaticProps), so no highlighting
 * library is shipped to the browser.
 */

const languages = ["bash", "ts", "tsx", "js", "jsx", "json", "css", "html", "sql", "yaml"];
let highlighter: Promise<Highlighter> | null = null;

function getHighlighter() {
    highlighter ??= createHighlighter({
        themes: ["github-dark-default"],
        langs: languages,
    });
    return highlighter;
}

export async function highlightPostBody(
    blocks: PostBodyBlock[],
): Promise<PostBodyBlock[]> {
    if (!blocks.some((b) => b._type === "code")) {
        return blocks;
    }
    const h = await getHighlighter();
    return blocks.map((b) => {
        if (b._type !== "code") {
            return b;
        }
        const lang = languages.includes(b.language) ? b.language : "text";
        const html = h.codeToHtml(b.code, {
            lang,
            theme: "github-dark-default",
        });
        return { ...b, html };
    });
}
