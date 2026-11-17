import coverScummy from "../../../images/blog/cover-scummybears.jpg";
import coverTnkm from "../../../images/blog/cover-truongnukieumy.jpg";
import scummyThumb from "../../../images/scummybears-thumb.jpg";
import tnkmThumb from "../../../images/truongnukieumy-thumb.jpg";
import heliotThumb from "../../../images/heliotemil-thumb.jpg";
import infThumb from "../../../images/infdark-thumb.jpg";
import { body, callout, gallery, h2, img, p, pullQuote, ul } from "../pt";
import { definePost } from "./define";
import { fromStatic } from "./meta";

export const scummyBearsPost = definePost({
    id: "scummybears",
    layout: "case-study",
    category: "case-study",
    tags: ["Shopify", "E-commerce", "Fashion"],
    publishedAt: "2026-11-06",
    cover: coverScummy,
    content: {
        vi: {
            slug: "case-study-cua-hang-shopify-cho-scummy-bears",
            title: "Case study: Cửa hàng Shopify cho Scummy Bears",
            excerpt:
                "Dựng cửa hàng cho một thương hiệu dark streetwear có nhiều drop, collab và khuyến mãi theo giỏ hàng.",
            coverAlt: "Lưới thẻ sản phẩm màu hồng đỏ trên nền tối",
            caseStudy: {
                client: "Scummy Bears",
                role: "Front-end & Shopify theme",
                year: "2026",
                stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
                url: "https://www.scummybears.com/",
            },
            body: body(
                h2("Bối cảnh"),
                p(
                    "Scummy Bears bán thời trang dark streetwear, alt, goth và rave. Sản phẩm ra theo từng đợt drop và collab, nên trang chủ và danh mục thay đổi liên tục.",
                ),
                img(
                    fromStatic(
                        scummyThumb,
                        "Trang chủ Scummy Bears với banner sản phẩm",
                        "Trang chủ: banner drop mới và thanh khuyến mãi theo giỏ hàng.",
                    ),
                    "wide",
                ),
                h2("Bài toán"),
                ...ul(
                    "Đội vận hành cần tự thay banner, bộ sưu tập và collab mà không đụng code.",
                    "Khuyến mãi tính theo giá trị giỏ hàng phải hiển thị rõ ngay trên trang.",
                    "Giao diện tối, nhiều ảnh lớn nhưng vẫn phải tải nhanh trên điện thoại.",
                ),
                h2("Cách làm"),
                p(
                    "Các khối trang chủ được làm thành section của theme để đội vận hành tự sắp xếp trong trình chỉnh sửa Shopify. Danh mục và collab dùng collection riêng, có bộ lọc theo loại sản phẩm.",
                ),
                pullQuote(
                    "Thương hiệu ra drop mỗi tuần thì website phải để người bán tự thay đổi, không phải chờ lập trình viên.",
                ),
                h2("Bài học"),
                callout(
                    "tip",
                    "Với thương hiệu thời trang, thời gian dành cho trình chỉnh sửa theme đáng giá hơn mọi hiệu ứng: nó quyết định đội vận hành có dùng website hằng ngày hay không.",
                ),
            ),
        },
        en: {
            slug: "case-study-a-shopify-store-for-scummy-bears",
            title: "Case study: A Shopify store for Scummy Bears",
            excerpt:
                "Building a store for a dark streetwear brand with frequent drops, collabs and cart-value promotions.",
            coverAlt: "Grid of product cards in pink and red on a dark background",
            caseStudy: {
                client: "Scummy Bears",
                role: "Front-end & Shopify theme",
                year: "2026",
                stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
                url: "https://www.scummybears.com/",
            },
            body: body(
                h2("Context"),
                p(
                    "Scummy Bears sells dark streetwear, alt, goth and rave fashion. Products launch in drops and collabs, so the homepage and catalog change constantly.",
                ),
                img(
                    fromStatic(
                        scummyThumb,
                        "Scummy Bears homepage with a product banner",
                        "Homepage: the latest drop banner and the cart promotion bar.",
                    ),
                    "wide",
                ),
                h2("The problem"),
                ...ul(
                    "The team needed to swap banners, collections and collabs without touching code.",
                    "Cart-value promotions had to be obvious right on the page.",
                    "A dark, image-heavy design still had to load fast on phones.",
                ),
                h2("Approach"),
                p(
                    "Homepage blocks became theme sections the team can reorder in the Shopify editor. Collections and collabs use dedicated collections with product-type filters.",
                ),
                pullQuote(
                    "When a brand drops every week, the site has to let sellers change it themselves, not wait for a developer.",
                ),
                h2("Lessons"),
                callout(
                    "tip",
                    "For fashion brands, time spent on the theme editor beats any animation: it decides whether the team actually uses the site every day.",
                ),
            ),
        },
    },
});

export const tnkmPost = definePost({
    id: "truongnukieumy",
    layout: "case-study",
    category: "case-study",
    tags: ["WordPress", "Portfolio", "SEO"],
    publishedAt: "2026-10-28",
    cover: coverTnkm,
    content: {
        vi: {
            slug: "case-study-portfolio-nghe-thuat-cho-truong-nu-kieu-my",
            title: "Case study: Portfolio nghệ thuật cho Truong Nu Kieu My",
            excerpt:
                "Một website WordPress tối giản để giới thiệu các dự án nghệ thuật khách sạn, nơi hình ảnh là nhân vật chính.",
            coverAlt: "Khung tranh với phong cảnh núi và mặt trời màu vàng",
            caseStudy: {
                client: "Truong Nu Kieu My",
                role: "Thiết kế & phát triển WordPress",
                year: "2026",
                stack: ["WordPress", "Custom theme", "PHP", "SEO"],
                url: "https://truongnukieumy.com/",
            },
            body: body(
                h2("Bối cảnh"),
                p(
                    "Truong Nu Kieu My tư vấn và cung cấp tác phẩm nghệ thuật, điêu khắc cho khách sạn cao cấp tại châu Á. Khách hàng của chị là chủ đầu tư và đơn vị thiết kế nội thất, những người xem portfolio rất kỹ.",
                ),
                img(
                    fromStatic(
                        tnkmThumb,
                        "Chân dung đen trắng của Truong Nu Kieu My",
                        "Ảnh chân dung chính thức dùng trên trang chủ và ảnh chia sẻ.",
                    ),
                    "wide",
                ),
                h2("Hướng thiết kế"),
                p(
                    "Nền màu kem, chữ serif, nhiều khoảng trống. Mỗi dự án là một trang riêng với ảnh lớn, tên khách sạn, thành phố và một đoạn mô tả ngắn về ý tưởng tác phẩm.",
                ),
                gallery(
                    fromStatic(heliotThumb, "Ví dụ bố cục ảnh lớn"),
                    fromStatic(infThumb, "Ví dụ bố cục lookbook"),
                ),
                h2("Kỹ thuật"),
                ...ul(
                    "Theme WordPress tự viết, không dùng page builder để trang nhẹ.",
                    "Ảnh xuất nhiều kích thước, có AVIF và WebP.",
                    "Mỗi dự án có title, mô tả và ảnh chia sẻ riêng cho SEO.",
                ),
                callout(
                    "info",
                    "Với portfolio nghệ thuật, ảnh chia sẻ (og:image) quan trọng không kém trang web: phần lớn khách thấy dự án lần đầu qua link gửi trong tin nhắn.",
                ),
            ),
        },
        en: {
            slug: "case-study-an-art-portfolio-for-truong-nu-kieu-my",
            title: "Case study: An art portfolio for Truong Nu Kieu My",
            excerpt:
                "A minimal WordPress site for hospitality art projects, where the images do the talking.",
            coverAlt: "A picture frame with mountains and a yellow sun",
            caseStudy: {
                client: "Truong Nu Kieu My",
                role: "WordPress design & development",
                year: "2026",
                stack: ["WordPress", "Custom theme", "PHP", "SEO"],
                url: "https://truongnukieumy.com/",
            },
            body: body(
                h2("Context"),
                p(
                    "Truong Nu Kieu My curates and delivers artwork and sculpture for luxury hotels across Asia. Her clients are developers and interior designers who read a portfolio closely.",
                ),
                img(
                    fromStatic(
                        tnkmThumb,
                        "Black and white portrait of Truong Nu Kieu My",
                        "The official portrait used on the homepage and share image.",
                    ),
                    "wide",
                ),
                h2("Design direction"),
                p(
                    "Cream background, serif type, generous white space. Each project gets its own page with large images, the hotel, the city and a short note on the artwork concept.",
                ),
                gallery(
                    fromStatic(heliotThumb, "Example of a large image layout"),
                    fromStatic(infThumb, "Example of a lookbook layout"),
                ),
                h2("Engineering"),
                ...ul(
                    "A hand-written WordPress theme, no page builder, to keep pages light.",
                    "Images exported in several sizes, with AVIF and WebP.",
                    "Every project has its own title, description and share image for SEO.",
                ),
                callout(
                    "info",
                    "For an art portfolio, the share image (og:image) matters as much as the page: most people first see a project through a link in a chat.",
                ),
            ),
        },
    },
});
