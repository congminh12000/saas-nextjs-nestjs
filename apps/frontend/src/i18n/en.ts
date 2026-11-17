import type { Dictionary } from "./types";

export const en: Dictionary = {
    meta: {
        languageTag: "en-US",
        ogLocale: "en_US",
        homeTitle: "Phan Cong Minh (Full-stack Developer)",
        homeDescription:
            "Phan Cong Minh is a Full-stack Developer with 5+ years of hands-on experience building web applications with Next.js, NestJS and TypeScript. See skills and real-world projects.",
        defaultDescription:
            "Phan Cong Minh is a Full-stack Developer with 5+ years of experience building web applications with Next.js, NestJS, TypeScript and PostgreSQL.",
        portraitAlt: "Phan Cong Minh - Full-stack Developer",
    },
    header: {
        tagline: "Open to remote & hybrid roles.",
        nav: { home: "Home", blog: "Blog" },
        languageLabel: "Choose language",
    },
    footer: {
        rights: "All rights reserved.",
    },
    hero: {
        role: "Full-Stack Developer (Web Applications)",
        name: "Phan Công Minh.",
        introLine1: "5+ years of hands-on experience building web applications.",
        introLine2: "Uses AI to boost work efficiency by 50%.",
        zalo: "Message on Zalo",
        qrTitle: "Scan the QR code",
        qrClose: "Close QR code",
    },
    skills: {
        heading: "Core Skills",
        process:
            "Full-stack (E2E): Requirements → Plan → Design → Build → Integrations → Test → CI/CD → Deploy → Monitor",
    },
    experience: {
        heading: "Hands-on Experience",
        label: "Remote-First • Hybrid-Ready • On-site-Capable",
        linkText: "View project",
        items: {
            truongnukieumy: {
                title: "Truong Nu Kieu My: Hospitality Art & Design Consultant",
                titleSub: "Hospitality art portfolio website",
                description:
                    "Built the portfolio website for Truong Nu Kieu My, a consultant who curates and delivers artwork and sculpture for luxury hotels across Asia.",
                frameworks: [
                    "WordPress",
                    "Custom theme",
                    "Project portfolio",
                    "Blog",
                    "SEO",
                ],
            },
            scummybears: {
                title: "Scummy Bears: Dark Streetwear, Alt, Goth & Rave Fashion",
                titleSub: "Fashion e-commerce website",
                description:
                    "Built the online store for a dark streetwear, alt, goth & rave fashion brand.",
                frameworks: [
                    "Shopify",
                    "Product catalog",
                    "Collections & collabs",
                    "Cart-based promotions",
                    "Cart & checkout",
                ],
            },
            apocalypsecloset: {
                title: "Apocalypse Closet: Gothic & Grunge Streetwear",
                titleSub: "Gothic T-shirt store",
                description:
                    "Built a made-to-order gothic T-shirt store for an independent brand.",
                frameworks: [
                    "Product pages",
                    "Color & size picker",
                    "Lookbook",
                    "Journal",
                    "Fourthwall checkout",
                ],
            },
            heliotemil: {
                title: "HELIOT EMIL: Official Site | Luxury Technical Fashion",
                titleSub: "Luxury fashion e-commerce website",
                description:
                    "Built the online store for HELIOT EMIL, a Danish luxury technical fashion brand.",
                frameworks: [
                    "Shopify",
                    "Menswear & Womenswear",
                    "Seasonal collections",
                    "Customer accounts",
                    "Cart & checkout",
                ],
            },
            infdark: {
                title: "INF: An Independent Designer Brand Based in Taiwan",
                titleSub: "Designer fashion brand website",
                description:
                    "Built the website for INF, an independent designer fashion brand from Taiwan.",
                frameworks: [
                    "Squarespace",
                    "Online shop",
                    "Lookbook & collections",
                    "Physical store",
                    "Product search",
                ],
            },
            freightek: {
                title: "Freightek: Freight Forwarder Software | Logistics Business Platform",
                titleSub: "Freight forwarder software",
                description:
                    "Built a digital FMS platform for freight forwarding businesses.",
                frameworks: [
                    "Tracking",
                    "Rate management",
                    "Automated quotes",
                    "Shipment management",
                    "Accounting",
                    "CRM & analytics",
                ],
            },
            proship: {
                title: "Proship Logistics: Faster, Smarter Shipping for Businesses",
                titleSub: "Logistics transport software",
                description: "Built a logistics transport platform for businesses.",
                frameworks: [
                    "multimodal transport",
                    "customs brokerage",
                    "trucking",
                    "cold-chain transport",
                    "warehouse rental",
                    "international shipping",
                ],
            },
        },
    },
    education: {
        heading: "Education",
        label: "Bachelor of Information Technology (2012 - 2016)",
        imageAlt: "Nguyen Tat Thanh University",
    },
    supplement: {
        heading: "Additional",
        label: "Other information",
        cards: [
            {
                title: "AI",
                description:
                    "Uses AI to speed up work and improve its quality and results.",
            },
            {
                title: "Self-learning",
                description:
                    "Researches and picks up new knowledge to solve problems as they come up.",
            },
        ],
    },
    blog: {
        title: "Blog",
        label: "Notes • Engineering • Career",
        intro: "What building real products teaches me: code, design, AI and ways of working.",
        seoTitle: "Minh Phan's Blog",
        seoDescription:
            "Writing on Next.js, NestJS, interface design, AI and remote work by Phan Cong Minh.",
        all: "All",
        categoryHeading: "Topics",
        minRead: (m) => `${m} min read`,
        loadMore: (n) => `Load ${n} more ${n === 1 ? "post" : "posts"}`,
        loading: "Loading…",
        allLoaded: "You've reached the end",
        loadError: "Couldn't load posts. Please try again.",
        empty: "No posts yet.",
        toc: "On this page",
        share: "Share",
        copyLink: "Copy link",
        copied: "Copied",
        copyCode: "Copy",
        previous: "Previous",
        next: "Next",
        related: "Related posts",
        writtenBy: "Written by",
        allPosts: "All posts",
        note: "Note",
        caseStudy: {
            heading: "Project facts",
            client: "Client",
            role: "Role",
            year: "Year",
            stack: "Stack",
            visit: "Visit site",
        },
        latestHeading: "Latest Posts",
        viewAll: "View all",
    },
};
