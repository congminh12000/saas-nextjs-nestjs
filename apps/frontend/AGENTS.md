# AGENTS.md: Portfolio Minh Phan (apps/frontend)

Hướng dẫn cho AI agent khi phát triển tiếp website portfolio cá nhân của Phan Công Minh.
File này bổ sung cho `../../AGENTS.md` (quy tắc chung của monorepo). Nếu hai file mâu thuẫn, ưu tiên file này cho mọi việc trong `apps/frontend`.

## 1. Tổng quan

- **Website:** portfolio cá nhân, một trang (single page), nội dung tiếng Việt (`<html lang="vi">`).
- **Production:** https://minhphan.vercel.app. Domain `saas-nextjs-nestjs-frontend.vercel.app` chỉ redirect về đây.
- **Hosting:** Vercel, project `minhphan` (team `minhphan-projects`). Push lên nhánh `master` thì Vercel tự build và deploy production. Không có biến môi trường nào trên Vercel.
- **Repo gốc** là template SaaS (NestJS + Next.js) của bên thứ ba. Phần lớn code ngoài trang chủ là di sản của template, không dùng cho portfolio (xem mục 9).

## 2. Stack

- Next.js 16 (Pages Router, Turbopack), React 19, TypeScript strict.
- Tailwind CSS v4 qua `@tailwindcss/postcss`, cấu hình theme ở `tailwind.config.js` (nạp bằng `@config` trong `src/styles/tailwind.css`).
- `framer-motion` cho modal, `@heroicons/react/24/outline` cho icon, `clsx` để ghép class.
- Font tự host bằng `next/font/google` trong `src/pages/_app.tsx`: IBM Plex Sans (`--font-sans`) và JetBrains Mono (`--font-mono`), subset `latin` + `vietnamese`. **Không** thêm `<link>` Google Fonts vào `_document.tsx`.

## 3. Chạy, build, kiểm tra

```bash
cd apps/frontend
pnpm run start      # dev server (next dev) tại http://localhost:3000
pnpm run build      # build production
npx tsc --noEmit -p .
```

- Sửa `next.config.js` thì phải khởi động lại dev server.
- `next.config.js` đã ghim `turbopack.root` về gốc monorepo và `postcss.config.js` có `base: __dirname`. Lý do: có một `package-lock.json` lạc ở thư mục home làm Turbopack chọn sai root, gây lỗi `Can't resolve 'tailwindcss'`. Đừng xoá hai thiết lập này.
- Sau mỗi thay đổi giao diện: mở trang trên dev server và chụp màn hình phần vừa sửa để tự kiểm tra trước khi báo xong.

## 4. Cấu trúc file quan trọng

```
src/
├── pages/
│   ├── index.tsx            # Trang chủ. getStaticProps (SSG), seoTitle/seoDescription
│   ├── _app.tsx             # next/font, biến CSS --font-sans/--font-mono
│   ├── _document.tsx        # lang="vi", favicon, theme-color #0a0a0b
│   └── otel.tsx             # OpenTelemetry client, chỉ nạp khi có env, qua requestIdleCallback
├── marketing-pages/index-home/
│   ├── Hero.tsx             # TOÀN BỘ nội dung trang chủ: dữ liệu + bố cục các section
│   ├── SingleSkillCard.tsx  # Card kỹ năng (topItems dạng tag, tags phụ, vòng điểm %)
│   ├── SingleFeatureCard.tsx# Card dự án (logo, mô tả, danh sách, nút, thumbnail)
│   └── SingleSupplementCard.tsx # Card "Bổ Sung"
├── components/
│   ├── Layout.tsx, Header.tsx, Footer.tsx, SEO.tsx, Container.tsx
│   ├── Animations.tsx       # AnimatedHeadline (CSS), FadeInOnScroll, TypewriterText, GlowCard
│   ├── SecurityBadge.tsx    # TrustBadges: hàng badge công nghệ dưới tiêu đề Hero
│   └── LinkedInIcon.tsx
├── images/                  # Ảnh tĩnh import trực tiếp vào component
└── styles/tailwind.css      # Tailwind v4 + style global
public/
├── favicon.ico, icon.png, apple-touch-icon.png   # Favicon tròn từ ảnh chân dung
├── og-image.jpg             # Ảnh chia sẻ 1200x630
├── robots.txt, sitemap.xml
└── noctis-website-proposal.html  # Trang HTML độc lập (xem mục 7.4)
```

## 5. Hệ thống thiết kế

Phong cách: **dark, terminal/editorial**. Nền gần đen, chữ mono cho tiêu đề, một màu nhấn xanh neon duy nhất, viền mảnh, bo góc lớn.

### 5.1 Màu (định nghĩa trong `tailwind.config.js`)

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| `security-black` | `#0A0A0B` | Nền trang |
| `security-dark` | `#141415` | Nền card |
| `security-mid` | `#1C1C1E` | Hover trong menu |
| `security-border` | `#2A2A2C` | Viền, đường kẻ cạnh tiêu đề section |
| `security-muted` | `#8A8A8F` | Nhãn phụ mono uppercase |
| `security-text` | `#A1A1A6` | Chữ nội dung |
| `security-light` | `#E8E8ED` | Tiêu đề, chữ nổi bật |
| `accent` / `accent-dim` | `#00FF88` / `#00CC6A` | Nút chính, chấm bullet, hover |

- Nhóm kỹ năng dùng 4 variant: `accent` (Frontend), `warning`/amber (Backend), `danger`/rose (Data), `brand`/violet (DevOps). Giữ đúng mapping này cho badge và skill card.
- Không thêm màu mới khi chưa cần. `security-muted` đã được chỉnh lên `#8A8A8F` để đạt tương phản WCAG, đừng hạ xuống.

### 5.2 Chữ

- Tiêu đề (`h1`, `h2`, `h3`): `font-display` (JetBrains Mono).
- Nội dung: `font-sans` (IBM Plex Sans), màu `text-security-text`.
- Nhãn phụ: `font-mono text-xs uppercase tracking-wider text-security-muted`.

### 5.3 Mẫu lặp lại

- **Tiêu đề section:**
  ```tsx
  <div className="flex items-center gap-4 mb-6">
      <h2 className="font-display text-2xl md:text-3xl text-security-light">Tên Section</h2>
      <div className="h-px flex-1 bg-security-border" />
  </div>
  <span className="font-mono text-xs uppercase tracking-wider text-security-muted">Nhãn phụ</span>
  ```
- **Section:** `<section className="mt-24 md:mt-32">`.
- **Card:** `rounded-2xl border border-security-border bg-security-dark`.
- **Nút chính:** `px-6 py-3 font-mono text-sm bg-accent text-security-black rounded-md hover:bg-accent-dim hover:shadow-glow`.
- **Nút phụ:** `border border-security-border text-security-light hover:border-accent/50 hover:text-accent`.
- **Tag/pill:** `rounded-full border px-3 py-1 text-sm`.
- **Chuyển động:** `AnimatedHeadline` (CSS thuần, class `.animate-headline`) cho phần đầu trang. `FadeInOnScroll` với `delay` tăng dần cho các card. Không thêm hiệu ứng JS nặng ở phần trên màn hình đầu tiên vì sẽ hạ điểm LCP.

## 5b. Đa ngôn ngữ (vi / en)

- `next.config.js` bật i18n của Pages Router: `locales: ["vi","en"]`, `defaultLocale: "vi"`, `localeDetection: false`. Tiếng Việt ở `/`, tiếng Anh ở `/en/...`.
- **Không hardcode chuỗi hiển thị trong component.** Mọi chữ nằm trong `src/i18n/vi.ts` và `src/i18n/en.ts`, cùng kiểu `Dictionary` (`src/i18n/types.ts`). Thêm khoá vào `types.ts` trước, TypeScript sẽ bắt thiếu bản dịch.
- Trong component: `const { t, locale } = useT();` (từ `src/i18n`). Ngoài React: `getDictionary(locale)`.
- `SEO.tsx` tự sinh canonical, `hreflang` (vi, en, x-default), `og:locale` theo ngôn ngữ. Trang có URL khác nhau giữa hai ngôn ngữ (bài blog) truyền `alternates={{ vi: "/blog/a", en: "/blog/b" }}` vào `Layout`; thiếu ngôn ngữ nào thì bỏ khoá đó, nút chuyển ngôn ngữ sẽ mờ ở ngôn ngữ đó.
- Nút `VI | EN` là `src/components/LanguageSwitch.tsx`, đặt trong `Header.tsx`.
- Trang HTML trong `public/` (như proposal) chỉ có một ngôn ngữ, không có bản `/en`.
- `public/sitemap.xml` liệt kê cả `/` và `/en` kèm `xhtml:link` hreflang.

## 5c. Blog

- **Dữ liệu:** `src/lib/blog/`. `types.ts` là kiểu dữ liệu (khớp schema Sanity dự kiến), `repository.ts` là nơi duy nhất trang gọi để lấy bài. Hiện đọc 9 bài mẫu trong `sample/`; khi nối Sanity chỉ thay thân hàm trong `repository.ts`, giữ nguyên chữ ký.
- **Nội dung bài** là Portable Text. Bài mẫu dựng bằng các hàm trong `pt.ts`: `p`, `h2`, `h3`, `ul`, `ol`, `quote`, `code`, `callout`, `pullQuote`, `img`, `gallery`. Chữ trong `p()` hỗ trợ `**đậm**`, `*nghiêng*`, `` `code` ``, `[link](url)`.
- **Trường không được `undefined`** trong dữ liệu trả về từ `getStaticProps`: bỏ hẳn khoá thay vì gán `undefined`.
- **Trang:** `/blog` (danh sách), `/blog/[slug]` (chi tiết), `/blog/category/[slug]`, API `/api/blog/posts` cho nút "Xem thêm". `sitemap.xml` sinh động ở `src/pages/sitemap.xml.ts`.
- **Danh sách bất đối xứng:** `marketing-pages/blog/BlogGrid.tsx`, lưới 12 cột. Bài đầu là card featured full hàng, sau đó lặp 4 kiểu: `tall` 7 cột, `text` 5 cột (lệch xuống), `compact` 5 cột, `overlay` 7 cột. Trang đầu 5 bài (`BLOG_PAGE_SIZE`), mỗi lần "Xem thêm" 4 bài (`BLOG_LOAD_MORE_SIZE`).
- **5 bố cục chi tiết** (trường `layout` của bài, `marketing-pages/blog/PostLayouts.tsx`):
  - `standard`: cover + nội dung + mục lục dính bên phải.
  - `feature`: cover tràn màn hình, tiêu đề đè lên ảnh, cột đọc ở giữa.
  - `split`: nửa trái là cover + tiêu đề dính, nửa phải là nội dung.
  - `case-study`: thẻ thông tin dự án bên trái (`caseStudy`), ảnh khổ rộng.
  - `note`: không cover, khung kiểu terminal, cho bài ngắn.
- **Code block** được highlight bằng Shiki lúc build (`lib/blog/highlight.ts`), không gửi thư viện xuống trình duyệt.
- **Ảnh cover:** 1600x900, không chèn chữ vào ảnh (ảnh bị crop theo từng kiểu card). Ảnh mẫu ở `src/images/blog/`.
- **SEO bài viết:** `og:type=article`, `article:*`, JSON-LD `BlogPosting` + `BreadcrumbList`, hreflang trỏ đúng slug bản dịch.
- **Chuỗi giao diện blog** nằm trong `t.blog` của từ điển.

## 6. Bố cục trang chủ (theo thứ tự trong `Hero.tsx`)

1. **Hero:** nhãn "Full-Stack Developer (Web Applications)", tên "Phan Công Minh." (typewriter trên desktop), mô tả, `TrustBadges`, nút "Nhắn tin Zalo" (mở modal QR `zalo-qr.jpg`) và "LinkedIn". Cột phải là ảnh chân dung `phan-cong-minh.png` (`priority`).
2. **Kỹ Năng Chuyên Môn:** mảng `skillCards`, lưới 2 cột.
3. **Kinh Nghiệm Thực Chiến:** mảng `experienceFeatures`, mỗi phần tử một `SingleFeatureCard`, tự đảo trái/phải theo chỉ số chẵn lẻ (`isReversed`).
4. **Học Vấn:** ảnh tràn viền `NTT-Edu.jpg`.
5. **Bổ Sung:** mảng `supplementCards` (AI, Tự học), lưới 2 cột.

Các khối bị comment (Option 2/3/4, products, terminal demo) là phương án thiết kế cũ được giữ lại. Đừng xoá trừ khi người dùng yêu cầu.

Thứ tự hiện tại của **Kinh Nghiệm Thực Chiến**: Truong Nu Kieu My → Scummy Bears → Apocalypse Closet → HELIOT EMIL → INF → Freightek → Proship Logistics. Thứ tự trong mảng chính là thứ tự hiển thị.

## 7. Công thức thường gặp

### 7.1 Thêm một dự án vào "Kinh Nghiệm Thực Chiến"

1. Lấy thông tin từ website dự án: `<title>`, meta description, og:image, file logo trong header.
2. Chuẩn bị 2 ảnh trong `src/images/`, đặt tên `<tenduan>-logo.<ext>` và `<tenduan>-thumb.jpg` (chữ thường, không dấu, không khoảng trắng):
   - **Logo:** ưu tiên file logo gốc của site. Logo hiển thị cao `h-10` trên nền tối. Logo màu tối thì thêm `logoClassName: "invert"`, hoặc xuất sẵn bản chữ sáng nền trong suốt. Site chỉ có chữ (wordmark) thì chụp phần chữ ở `deviceScaleFactor: 3` và chừa lề để không mất phần chân chữ (g, y).
   - **Thumbnail:** khung hiển thị là **4:3** (`aspect-[4/3]`, `object-cover`). Ưu tiên ảnh chính chủ của site (ảnh hero, ảnh sản phẩm, og:image) rồi cắt về 4:3, giữ chủ thể ở giữa khung. Nếu không có ảnh phù hợp thì chụp màn hình 1920x930 và tắt popup/cookie banner trước khi chụp.
3. Thêm id mới vào kiểu `ExperienceId` trong `src/i18n/types.ts`.
4. Import ảnh ở đầu `Hero.tsx` và thêm object vào `experienceFeatures` (chỉ dữ liệu không đổi theo ngôn ngữ):
   ```ts
   { id: "tenduan", linkUrl: "https://...", logo: xxxLogo, logoClassName: "invert" /* tuỳ chọn */, thumb: xxxThumb },
   ```
5. Thêm nội dung vào `experience.items.tenduan` ở **cả** `src/i18n/vi.ts` và `src/i18n/en.ts` (TypeScript báo lỗi nếu thiếu một bên):
   ```ts
   tenduan: {
       title: "<Tên thương hiệu>: <tagline lấy từ title của site>", // dùng cho alt và sr-only
       titleSub: "Website ...",               // dòng tiêu đề hiển thị
       description: "Xây dựng ...",            // 1 câu
       frameworks: ["Shopify", "...", "..."], // 4-6 mục, nền tảng đứng đầu
   },
   ```
6. Xoá dự án thì xoá luôn import, id, nội dung trong 2 file từ điển và file ảnh không còn dùng.

### 7.2 Sửa kỹ năng

- Sửa mảng `skillCards`. `topItems` hiển thị dạng tag đậm, `tags` là tag phụ, `score` 1-10 hiển thị dạng %.
- Khi đổi công nghệ chính, cập nhật luôn `TrustBadges` trong `SecurityBadge.tsx` cho khớp.

### 7.3 Sửa SEO

- Tiêu đề và mô tả trang chủ đặt ở `src/pages/index.tsx` (`seoTitle`, `seoDescription`).
- `SEO.tsx` sinh canonical, Open Graph (`og:locale vi_VN`, `/og-image.jpg` 1200x630), Twitter card, JSON-LD `WebSite` + `Person`. `SITE_URL` lấy từ `NEXT_PUBLIC_SITE_URL`, mặc định `https://minhphan.vercel.app`.
- Đổi thông tin cá nhân (LinkedIn, trường học, chức danh) thì sửa cả JSON-LD trong `SEO.tsx`.
- Mỗi `next/image` phải có `alt` có nghĩa và `sizes` đúng với độ rộng hiển thị.

### 7.4 Đăng một trang HTML độc lập (ví dụ đề xuất gửi khách)

1. Copy file vào `public/<slug>.html`.
2. Thêm `<meta name="robots" content="noindex, nofollow">` nếu là tài liệu riêng tư.
3. Thêm rewrite trong `next.config.js` để URL không có đuôi `.html`:
   ```js
   { source: "/<slug>", destination: "/<slug>.html" },
   ```
4. Thay bản mới thì chỉ ghi đè file, giữ nguyên slug và thẻ noindex.
5. Lưu ý: trang vẫn công khai với ai có link. Không đưa slug vào `sitemap.xml`.

Trang hiện có: `/noctis-website-proposal`.

## 8. Hiệu năng (đừng làm hỏng)

Lighthouse sau tối ưu: mobile 96, desktop 100. Accessibility, Best Practices và SEO đều 100. Giữ các điểm sau:

- Trang chủ dùng `getStaticProps`, không đổi sang `getServerSideProps`.
- Font qua `next/font`, không tải font ngoài.
- `images.formats` là AVIF rồi WebP. Ảnh lớn để `next/image` tự tối ưu, đừng dùng `<img>` thường.
- Chỉ ảnh chân dung Hero được `priority`.
- OpenTelemetry client chỉ nạp khi có `NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT` và sau khi trang rảnh.
- Auth0 dùng `noContentProfileResponseWhenUnauthenticated: true` để không có lỗi 401 trong console.
- Ảnh trong `public/` nên nhỏ (favicon `icon.png` 192px, khoảng 60KB).

## 9. Code di sản của template (không dùng cho portfolio)

Các trang/thư mục này đến từ template gốc, không liên kết từ trang chủ: `pages/dev-shell.tsx`, `pages/local-dev-tools.tsx`, `pages/miller-start.tsx`, `pages/docs`, `pages/dashboard`, `pages/super-admin`, `pages/api/stripe`, `marketing-pages/dev-shell-home`, `local-dev-tools`, `miller-start-home`, `OpenSourceSection`, `SingleProductCard`. Không sửa hay mở rộng chúng khi làm portfolio. Không tự xoá khi chưa hỏi người dùng.

`.env.production` còn cấu hình gửi trace OTel tới api.honeycomb.io từ template. Đừng tự bật thêm telemetry.

## 10. Quy trình git và deploy

- Làm việc trên `master` (người dùng commit thẳng vào master).
- Commit theo Conventional Commits, phạm vi `frontend`. Ví dụ: `feat(frontend): add X project to experience section`.
- Chỉ add đúng file đã sửa. **Không** commit: `.claude/`, `apps/frontend/tsconfig.tsbuildinfo`, các ảnh `src/images/Capture-*.png` của người dùng.
- Chỉ commit/push khi người dùng yêu cầu ("commit", "push production").
- Sau khi push, chờ Vercel deploy rồi kiểm tra trên https://minhphan.vercel.app bằng `curl` (tìm chuỗi nội dung mới) trước khi báo xong.

## 11. Giao tiếp

Người dùng viết tiếng Việt. Trả lời bằng tiếng Việt, ngắn gọn. Nội dung hiển thị trên website viết bằng tiếng Việt có dấu, trừ tên riêng, tên công nghệ và tiêu đề gốc của dự án.
