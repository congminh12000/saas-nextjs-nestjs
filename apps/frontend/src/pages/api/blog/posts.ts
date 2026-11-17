import type { NextApiRequest, NextApiResponse } from "next";
import { toLocale } from "../../../i18n";
import { BLOG_LOAD_MORE_SIZE, getPostPage } from "../../../lib/blog/repository";

/** Paged post summaries for the blog's "load more" button. */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method not allowed" });
    }
    const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
    const offset = Math.max(0, Number.parseInt(first(req.query.offset) ?? "0", 10) || 0);
    const limit = Math.min(
        12,
        Math.max(1, Number.parseInt(first(req.query.limit) ?? "", 10) || BLOG_LOAD_MORE_SIZE),
    );
    const category = first(req.query.category) || undefined;

    const page = getPostPage(toLocale(first(req.query.locale)), {
        offset,
        limit,
        categorySlug: category,
    });
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json(page);
}
