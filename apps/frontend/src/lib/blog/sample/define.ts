import type { StaticImageData } from "next/image";
import type { Locale } from "../../../i18n/types";
import type { CaseStudyFacts, PostBodyBlock, PostLayout } from "../types";
import type { CategoryId } from "./meta";

export interface SampleLocalized {
    slug: string;
    title: string;
    excerpt: string;
    coverAlt: string;
    body: PostBodyBlock[];
    caseStudy?: CaseStudyFacts;
}

export interface SamplePost {
    id: string;
    layout: PostLayout;
    category: CategoryId;
    tags: string[];
    publishedAt: string;
    updatedAt?: string;
    cover: StaticImageData;
    content: Record<Locale, SampleLocalized>;
}

export const definePost = (post: SamplePost) => post;
