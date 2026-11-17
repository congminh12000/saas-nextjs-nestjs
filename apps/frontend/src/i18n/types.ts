export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export type ExperienceId =
    | "truongnukieumy"
    | "scummybears"
    | "apocalypsecloset"
    | "heliotemil"
    | "infdark"
    | "freightek"
    | "proship";

export interface ExperienceCopy {
    title: string;
    titleSub: string;
    description: string;
    frameworks: string[];
}

export interface Dictionary {
    meta: {
        /** BCP 47 tag for JSON-LD inLanguage */
        languageTag: string;
        /** Open Graph locale, e.g. vi_VN */
        ogLocale: string;
        homeTitle: string;
        homeDescription: string;
        defaultDescription: string;
        portraitAlt: string;
    };
    header: {
        tagline: string;
        nav: { home: string; blog: string };
        languageLabel: string;
    };
    footer: {
        rights: string;
    };
    hero: {
        role: string;
        name: string;
        introLine1: string;
        introLine2: string;
        zalo: string;
        qrTitle: string;
        qrClose: string;
    };
    skills: {
        heading: string;
        process: string;
    };
    experience: {
        heading: string;
        label: string;
        linkText: string;
        items: Record<ExperienceId, ExperienceCopy>;
    };
    education: {
        heading: string;
        label: string;
        imageAlt: string;
    };
    supplement: {
        heading: string;
        label: string;
        cards: { title: string; description: string }[];
    };
    blog: BlogCopy;
}

export interface BlogCopy {
    title: string;
    label: string;
    intro: string;
    seoTitle: string;
    seoDescription: string;
    all: string;
    categoryHeading: string;
    minRead: (minutes: number) => string;
    loadMore: (remaining: number) => string;
    loading: string;
    allLoaded: string;
    loadError: string;
    empty: string;
    toc: string;
    share: string;
    copyLink: string;
    copied: string;
    copyCode: string;
    previous: string;
    next: string;
    related: string;
    writtenBy: string;
    allPosts: string;
    note: string;
    caseStudy: {
        heading: string;
        client: string;
        role: string;
        year: string;
        stack: string;
        visit: string;
    };
    latestHeading: string;
    viewAll: string;
}
