import coverLighthouse from "../../../images/blog/cover-lighthouse.jpg";
import coverI18n from "../../../images/blog/cover-i18n.jpg";
import coverRedis from "../../../images/blog/cover-redis.jpg";
import { body, callout, code, h2, h3, p, quote, ul } from "../pt";
import { definePost } from "./define";

export const lighthousePost = definePost({
    id: "lighthouse",
    layout: "standard",
    category: "engineering",
    tags: ["Next.js", "Performance", "SEO"],
    publishedAt: "2026-11-14",
    cover: coverLighthouse,
    content: {
        vi: {
            slug: "toi-uu-lighthouse-tu-62-len-96-cho-website-nextjs",
            title: "Tối ưu Lighthouse từ 62 lên 96 cho website Next.js",
            excerpt:
                "Những thay đổi cụ thể đã đưa điểm Performance trên mobile của portfolio này từ 62 lên 96, mà không phải viết lại giao diện.",
            coverAlt: "Đồng hồ điểm Lighthouse 96 và biểu đồ cột tăng dần",
            body: body(
                p(
                    "Trước khi tối ưu, trang chủ của portfolio này đạt **62 điểm Performance trên mobile** và 91 trên desktop. Giao diện không nặng, nhưng có vài thói quen mặc định trong template làm trang tải chậm hơn cần thiết.",
                ),
                h2("Đo trước khi sửa"),
                p(
                    "Mình chạy Lighthouse bằng CLI để có số liệu ổn định hơn so với chạy trong DevTools:",
                ),
                code(
                    "bash",
                    `npx lighthouse https://minhphan.vercel.app \\
  --preset=perf --form-factor=mobile \\
  --output=json --output-path=./report.json`,
                ),
                p(
                    "Ba vấn đề lớn nhất: font tải từ Google Fonts chặn render, trang được render lại trên server ở mỗi request, và ảnh không khai báo `sizes` nên trình duyệt tải bản lớn hơn cần thiết.",
                ),
                h2("Tự host font bằng next/font"),
                p(
                    "Thay thẻ `<link>` Google Fonts bằng `next/font/google`. Font được tải về lúc build và phục vụ từ chính domain của site, có `font-display: swap` và preload sẵn.",
                ),
                code(
                    "tsx",
                    `import { IBM_Plex_Sans } from "next/font/google";

const plexSans = IBM_Plex_Sans({
    subsets: ["latin", "vietnamese"],
    weight: ["400", "500", "600"],
    display: "swap",
});`,
                    "src/pages/_app.tsx",
                ),
                callout(
                    "tip",
                    "Nhớ thêm subset `vietnamese`, nếu không chữ có dấu sẽ rơi về font hệ thống và nhảy layout khi font thật tải xong.",
                ),
                h2("Chuyển trang chủ sang SSG"),
                p(
                    "Trang chủ không có nội dung riêng cho từng người dùng, nên dùng `getStaticProps` để dựng sẵn lúc build và phục vụ từ CDN. TTFB giảm rõ rệt.",
                ),
                h2("Ảnh: sizes, AVIF và priority"),
                ...ul(
                    "Khai báo `sizes` khớp với độ rộng hiển thị thật của từng ảnh.",
                    "Bật `formats: [\"image/avif\", \"image/webp\"]` trong `next.config.js`.",
                    "Chỉ ảnh lớn nhất trên màn hình đầu tiên được `priority`.",
                ),
                h3("Hoãn những gì không cần ngay"),
                p(
                    "Thư viện OpenTelemetry phía client được tách thành chunk riêng và chỉ nạp qua `requestIdleCallback`, sau khi trang đã hiển thị.",
                ),
                h2("Kết quả"),
                p(
                    "Sau khi deploy: **96 điểm mobile, 100 điểm desktop**, Accessibility, Best Practices và SEO đều 100. Không thay đổi nào ở trên cần viết lại component.",
                ),
                quote(
                    "Phần lớn điểm Lighthouse bị mất không nằm ở code của bạn, mà ở các mặc định không ai xem lại.",
                ),
            ),
        },
        en: {
            slug: "taking-a-nextjs-site-from-62-to-96-on-lighthouse",
            title: "Taking a Next.js site from 62 to 96 on Lighthouse",
            excerpt:
                "The specific changes that moved this portfolio's mobile Performance score from 62 to 96, without rewriting the UI.",
            coverAlt: "Lighthouse score gauge showing 96 next to rising bars",
            body: body(
                p(
                    "Before tuning, this portfolio's homepage scored **62 for mobile Performance** and 91 on desktop. The UI is not heavy, but a few template defaults made it load slower than it needed to.",
                ),
                h2("Measure before you change anything"),
                p("I ran Lighthouse from the CLI for steadier numbers than DevTools gives:"),
                code(
                    "bash",
                    `npx lighthouse https://minhphan.vercel.app \\
  --preset=perf --form-factor=mobile \\
  --output=json --output-path=./report.json`,
                ),
                p(
                    "The three biggest problems: render-blocking Google Fonts, server rendering on every request, and images without `sizes`, so browsers downloaded larger files than needed.",
                ),
                h2("Self-host fonts with next/font"),
                p(
                    "Replace the Google Fonts `<link>` with `next/font/google`. Fonts are downloaded at build time and served from your own domain, with `font-display: swap` and preloading.",
                ),
                code(
                    "tsx",
                    `import { IBM_Plex_Sans } from "next/font/google";

const plexSans = IBM_Plex_Sans({
    subsets: ["latin", "vietnamese"],
    weight: ["400", "500", "600"],
    display: "swap",
});`,
                    "src/pages/_app.tsx",
                ),
                callout(
                    "tip",
                    "Include every subset your content uses. Missing glyphs fall back to a system font and shift the layout when the real font arrives.",
                ),
                h2("Move the homepage to SSG"),
                p(
                    "The homepage has no per-user content, so `getStaticProps` builds it once and serves it from the CDN. Time to first byte drops noticeably.",
                ),
                h2("Images: sizes, AVIF and priority"),
                ...ul(
                    "Give every image a `sizes` value that matches its real rendered width.",
                    "Enable `formats: [\"image/avif\", \"image/webp\"]` in `next.config.js`.",
                    "Mark only the largest above-the-fold image as `priority`.",
                ),
                h3("Defer what is not needed yet"),
                p(
                    "The client-side OpenTelemetry SDK moved into its own chunk and loads through `requestIdleCallback`, after the page is visible.",
                ),
                h2("Result"),
                p(
                    "After deploying: **96 on mobile, 100 on desktop**, with Accessibility, Best Practices and SEO all at 100. None of these changes required rewriting a component.",
                ),
                quote(
                    "Most lost Lighthouse points are not in your code, but in defaults nobody revisited.",
                ),
            ),
        },
    },
});

export const i18nPost = definePost({
    id: "i18n",
    layout: "standard",
    category: "engineering",
    tags: ["Next.js", "i18n", "SEO"],
    publishedAt: "2026-11-10",
    cover: coverI18n,
    content: {
        vi: {
            slug: "website-da-ngon-ngu-voi-nextjs-pages-router",
            title: "Website đa ngôn ngữ với Next.js Pages Router",
            excerpt:
                "Cách thêm tiếng Anh cho một site tiếng Việt: routing theo locale, từ điển có kiểu, hreflang và nút chuyển ngôn ngữ.",
            coverAlt: "Chữ VI và EN đặt cạnh nhau, ngăn bởi một đường thẳng",
            body: body(
                p(
                    "Pages Router có sẵn i18n routing, không cần thư viện ngoài. Điều cần quyết định là ngôn ngữ nào nằm ở URL gốc và có tự chuyển hướng theo trình duyệt hay không.",
                ),
                h2("Cấu hình locale"),
                code(
                    "js",
                    `module.exports = {
    i18n: {
        locales: ["vi", "en"],
        defaultLocale: "vi",
        localeDetection: false,
    },
};`,
                    "next.config.js",
                ),
                p(
                    "Tiếng Việt giữ URL `/`, tiếng Anh ở `/en`. Tắt `localeDetection` để URL ổn định, tránh việc Googlebot bị chuyển hướng sang ngôn ngữ khác.",
                ),
                h2("Từ điển có kiểu"),
                p(
                    "Mỗi ngôn ngữ là một object cùng kiểu `Dictionary`. Thêm khoá mới mà quên dịch một bên, TypeScript báo lỗi ngay lúc build.",
                ),
                code(
                    "ts",
                    `export function useT() {
    const { locale } = useRouter();
    const current = toLocale(locale);
    return { locale: current, t: dictionaries[current] };
}`,
                    "src/i18n/index.ts",
                ),
                h2("SEO cho hai ngôn ngữ"),
                ...ul(
                    "Mỗi trang có `canonical` trỏ về chính nó trong đúng ngôn ngữ.",
                    "Thêm `hreflang` cho vi, en và `x-default`.",
                    "`og:locale` đổi theo ngôn ngữ, kèm `og:locale:alternate`.",
                ),
                callout(
                    "warning",
                    "Bài blog có slug khác nhau giữa hai ngôn ngữ, nên phải truyền đường dẫn của bản dịch vào hreflang. Dùng chung đường dẫn hiện tại sẽ tạo link hỏng.",
                    "Cẩn thận với slug",
                ),
                h2("Nút chuyển ngôn ngữ"),
                p(
                    "Nút `VI | EN` dùng `Link` với prop `locale`. Nếu bài chưa có bản dịch, ngôn ngữ đó được làm mờ thay vì dẫn tới trang 404.",
                ),
            ),
        },
        en: {
            slug: "multilingual-websites-with-nextjs-pages-router",
            title: "Multilingual websites with the Next.js Pages Router",
            excerpt:
                "Adding English to a Vietnamese site: locale routing, typed dictionaries, hreflang and a language switch.",
            coverAlt: "The letters VI and EN side by side, split by a line",
            body: body(
                p(
                    "The Pages Router ships with i18n routing, no extra library needed. The real decisions are which language owns the root URL and whether to redirect based on the browser.",
                ),
                h2("Configure locales"),
                code(
                    "js",
                    `module.exports = {
    i18n: {
        locales: ["vi", "en"],
        defaultLocale: "vi",
        localeDetection: false,
    },
};`,
                    "next.config.js",
                ),
                p(
                    "Vietnamese keeps `/`, English lives under `/en`. Turning off `localeDetection` keeps URLs stable and stops crawlers from being redirected.",
                ),
                h2("Typed dictionaries"),
                p(
                    "Each language is an object of the same `Dictionary` type. Add a key and forget one translation, and TypeScript fails the build.",
                ),
                code(
                    "ts",
                    `export function useT() {
    const { locale } = useRouter();
    const current = toLocale(locale);
    return { locale: current, t: dictionaries[current] };
}`,
                    "src/i18n/index.ts",
                ),
                h2("SEO in two languages"),
                ...ul(
                    "Every page has a `canonical` pointing at itself in its own language.",
                    "Add `hreflang` for vi, en and `x-default`.",
                    "Switch `og:locale` per language, plus `og:locale:alternate`.",
                ),
                callout(
                    "warning",
                    "Blog posts have different slugs per language, so hreflang must use each translation's own path. Reusing the current path produces broken links.",
                    "Watch the slugs",
                ),
                h2("The language switch"),
                p(
                    "The `VI | EN` switch uses `Link` with a `locale` prop. When a post has no translation, that language is dimmed instead of linking to a 404.",
                ),
            ),
        },
    },
});

export const redisPost = definePost({
    id: "redis",
    layout: "note",
    category: "engineering",
    tags: ["Redis", "Backend", "NestJS"],
    publishedAt: "2026-10-02",
    cover: coverRedis,
    content: {
        vi: {
            slug: "ghi-chu-redis-cho-cache-session-va-queue",
            title: "Ghi chú: Redis cho cache, session và queue",
            excerpt:
                "Ba cách dùng Redis hay gặp nhất trong một backend NestJS, và lỗi dễ mắc ở mỗi cách.",
            coverAlt: "Chồng đĩa dữ liệu với các lệnh SET, GET, LPUSH",
            body: body(
                p(
                    "Ghi chú ngắn cho chính mình: ba việc Redis làm tốt trong hầu hết dự án, và một lỗi đi kèm mỗi việc.",
                ),
                h2("1. Cache"),
                code(
                    "ts",
                    `const cached = await redis.get(key);
if (cached) return JSON.parse(cached);

const fresh = await loadFromDb(id);
await redis.set(key, JSON.stringify(fresh), "EX", 300);
return fresh;`,
                ),
                p(
                    "**Lỗi hay gặp:** quên xoá cache khi dữ liệu thay đổi. Luôn gắn TTL, và xoá key ngay trong hàm cập nhật.",
                ),
                h2("2. Session"),
                p(
                    "Lưu session trong Redis cho phép chạy nhiều instance mà người dùng không bị đăng xuất. **Lỗi hay gặp:** để session không có thời hạn, Redis đầy dần theo thời gian.",
                ),
                h2("3. Queue"),
                p(
                    "Dùng BullMQ cho việc chạy nền: gửi email, xử lý ảnh, đồng bộ dữ liệu. **Lỗi hay gặp:** job không idempotent, chạy lại khi retry sẽ gửi email hai lần.",
                ),
                callout(
                    "info",
                    "Tách Redis cho cache và cho queue nếu có thể. Chính sách xoá key khi đầy bộ nhớ của cache có thể xoá luôn job đang chờ.",
                ),
            ),
        },
        en: {
            slug: "note-redis-for-cache-sessions-and-queues",
            title: "Note: Redis for cache, sessions and queues",
            excerpt:
                "The three most common Redis uses in a NestJS backend, and the easy mistake that comes with each.",
            coverAlt: "Stacked data disks with SET, GET and LPUSH commands",
            body: body(
                p(
                    "A short note to self: three jobs Redis does well in almost every project, and one mistake that comes with each.",
                ),
                h2("1. Cache"),
                code(
                    "ts",
                    `const cached = await redis.get(key);
if (cached) return JSON.parse(cached);

const fresh = await loadFromDb(id);
await redis.set(key, JSON.stringify(fresh), "EX", 300);
return fresh;`,
                ),
                p(
                    "**Common mistake:** not invalidating when data changes. Always set a TTL, and delete the key inside the update path.",
                ),
                h2("2. Sessions"),
                p(
                    "Storing sessions in Redis lets you run several instances without logging users out. **Common mistake:** sessions with no expiry, slowly filling memory.",
                ),
                h2("3. Queues"),
                p(
                    "BullMQ handles background work: emails, image processing, data sync. **Common mistake:** non-idempotent jobs that send the same email twice on retry.",
                ),
                callout(
                    "info",
                    "Use separate Redis instances for cache and queues when you can. A cache eviction policy can silently drop waiting jobs.",
                ),
            ),
        },
    },
});
