import type { StaticImageData } from "next/image";
import portrait from "../../../images/phan-cong-minh.png";
import type { Locale } from "../../../i18n/types";
import type { Author, BlogImage, Category, CategoryColor } from "../types";

export function fromStatic(
    image: StaticImageData,
    alt: string,
    caption?: string,
): BlogImage {
    return {
        src: image.src,
        width: image.width,
        height: image.height,
        blurDataURL: image.blurDataURL,
        alt,
        ...(caption ? { caption } : {}),
    };
}

export type CategoryId = "engineering" | "case-study" | "ai" | "career" | "design";

const categoryDefs: Record<
    CategoryId,
    { color: CategoryColor } & Record<
        Locale,
        { slug: string; title: string; description: string }
    >
> = {
    engineering: {
        color: "accent",
        vi: {
            slug: "ky-thuat",
            title: "Kỹ thuật",
            description: "Ghi chép khi xây dựng, tối ưu và vận hành ứng dụng web.",
        },
        en: {
            slug: "engineering",
            title: "Engineering",
            description: "Notes from building, tuning and running web applications.",
        },
    },
    "case-study": {
        color: "danger",
        vi: {
            slug: "case-study",
            title: "Case study",
            description: "Nhìn lại các dự án thực tế: bài toán, cách làm, bài học.",
        },
        en: {
            slug: "case-study",
            title: "Case study",
            description: "Real projects revisited: the problem, the approach, the lessons.",
        },
    },
    ai: {
        color: "accent",
        vi: {
            slug: "ai",
            title: "AI",
            description: "Dùng AI trong công việc lập trình hằng ngày.",
        },
        en: {
            slug: "ai",
            title: "AI",
            description: "Using AI in day-to-day development work.",
        },
    },
    career: {
        color: "warning",
        vi: {
            slug: "nghe-nghiep",
            title: "Nghề nghiệp",
            description: "Làm việc remote, freelance và phát triển bản thân.",
        },
        en: {
            slug: "career",
            title: "Career",
            description: "Remote work, freelancing and growing as a developer.",
        },
    },
    design: {
        color: "brand",
        vi: {
            slug: "thiet-ke",
            title: "Thiết kế",
            description: "Giao diện, màu sắc và trải nghiệm người dùng.",
        },
        en: {
            slug: "design",
            title: "Design",
            description: "Interfaces, color and user experience.",
        },
    },
};

export const categoryIds = Object.keys(categoryDefs) as CategoryId[];

export function getCategory(id: CategoryId, locale: Locale): Category {
    const def = categoryDefs[id];
    return { id, color: def.color, ...def[locale] };
}

export function getAuthor(locale: Locale): Author {
    return {
        name: "Phan Công Minh",
        role: "Full-stack Developer",
        bio:
            locale === "vi"
                ? "Hơn 5 năm xây dựng ứng dụng web với Next.js, NestJS và TypeScript. Viết về những gì học được khi làm dự án thật."
                : "5+ years building web applications with Next.js, NestJS and TypeScript. Writing about what real projects teach.",
        image: fromStatic(portrait, "Phan Công Minh"),
        linkedInUrl: "https://linkedin.com/in/minh-phan-2bb344166",
    };
}
