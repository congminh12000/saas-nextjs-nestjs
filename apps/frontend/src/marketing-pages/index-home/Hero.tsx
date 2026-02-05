"use client";

import { Container } from "../../components/Container";
import {
    TypewriterText,
    AnimatedHeadline,
    FadeInOnScroll,
    // StaggerContainer,
    // StaggerItem,
    // ScanLine,
} from "../../components/Animations";
import { TrustBadges } from "../../components/SecurityBadge";
import { LinkedInIcon } from "../../components/LinkedInIcon";
// import { SingleProductCard } from "./SingleProductCard";
import type { SingleSkillCardProps } from "./SingleSkillCard";
import { SingleSkillCard } from "./SingleSkillCard";
import { SingleFeatureCard } from "./SingleFeatureCard";
import { SingleSupplementCard } from "./SingleSupplementCard";
// import { OpenSourceSection } from "./OpenSourceSection";
import type { components } from "../../shared/types/api-specs";
// import {
//     TerminalWindow,
//     TerminalPrompt,
// } from "../../components/TerminalWindow";
import Image from "next/image";
import Link from "next/link";
import portraitImage from "../../images/phan-cong-minh.png";
import freightekLogo from "../../images/freightek.webp";
import freightekThumb from "../../images/freightek-thumb.jpg";
import sstLogo from "../../images/sst-logo.png";
import sstechThumb from "../../images/sstech-thumb.jpg";
import proshipLogo from "../../images/logo-proship-resize.png";
import proshipThumb from "../../images/proship-thumb.jpg";
import educationImage from "../../images/NTT-Edu.jpg";
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    ChatBubbleLeftRightIcon,
    CircleStackIcon,
    PaintBrushIcon,
    BeakerIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import zaloQrImage from "../../images/zalo-qr.jpg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { ThemeColor } from "../../styles/themeColors";



type UserDto = components["schemas"]["UserDto"];

// export interface HeroProduct {
//     colorVariant: ThemeColor;
//     title: string;
//     blurb: string;
//     benefits: string[];
//     learnMoreLinkUrl: string;
//     learnMoreLinkText: string;
//     altLinkText: string;
//     altLink: string;
//     altAltLinkText?: string;
//     altAltLink?: string;
//     githubUrl?: string;
//     stars?: number;
// }

const skillCards: SingleSkillCardProps[] = [
    {
        title: "Frontend",
        icon: PaintBrushIcon,
        topItems: ["Next.js (React)", "Vue.js", "TypeScript"],
        tags: ["Tailwind (CSS)", "Headless UI", "Framer Motion"],
        variant: "accent",
        score: 9,
    },
    {
        title: "Backend",
        icon: WrenchScrewdriverIcon,
        topItems: ["NestJS (Node.js)", "RESTful APIs", "PHP"],
        tags: ["Auth0", "JWT", "RBAC"],
        variant: "warning",
        score: 8,
    },
    {
        title: "Data",
        icon: CircleStackIcon,
        topItems: ["PostgreSQL", "MongoDB", "Redis"],
        tags: ["TypeORM", "Cache / Session / Queue)"],
        variant: "danger",
        score: 7,
    },
    {
        title: "DevOps & Quality",
        icon: BeakerIcon,
        topItems: ["Git", "Docker", "Agile / Scrum"],
        tags: ["CI/CD", "Unit Test/UAT", "Design Patterns"],
        variant: "brand",
        score: 5,
    },
];

const experienceFeatures = [
    {
        title: "Freightek: Phần Mềm Freight Forwarder | Nền Tảng Doanh Nghiệp Logistics",
        titleSub: "Phần Mềm Freight Forwarder",
        description:
            "Xây dựng nền tảng Digital FMS cho doanh nghiệp Freight Forwarder.",
        frameworks: [
            "Tracking",
            "Quản Lý Giá Cước",
            "Báo Giá Tự Động",
            "Quản Lý Lô Hàng",
            "Kế Toán",
            "CRM & Phân Tích Dữ Liệu",
        ],
        linkUrl: "https://www.freightekvietnam.com/",
        linkText: "Xem dự án",
        logo: freightekLogo,
        thumb: freightekThumb,
    },
    {
        title: "SSTech – Quality Software Development",
        titleSub: "Phát triển phần mềm chất lượng cao",
        description: "Chuyên cung cấp dịch vụ và xây dựng phầm mềm cho doanh nghiệp.",
        frameworks: [
            "Web Application",
            "Mobile Application",
            "Blockchain Application",
            "eCommerce Solutions",
        ],
        linkUrl: "https://www.sstechvn.com/",
        linkText: "Xem dự án",
        logo: sstLogo,
        logoClassName: "brightness-175",
        thumb: sstechThumb,
    },
    {
        title: "Proship Logistics: Giải pháp Vận chuyển Nhanh hơn, Tối ưu hơn cho Doanh nghiệp",
        titleSub: "Phần mềm vận tải Logistics",
        description: "Xây dựng nền tảng vận tải Logistic cho doanh nghiệp.",
        frameworks: [
            "vận tải đa phương thức",
            "đại lý hải quan",
            "trucking",
            "vận tải hàng lạnh",
            "cho thuê kho",
            "vận tải quốc tế",
        ],
        linkUrl: "https://proship.vn/",
        linkText: "Xem dự án",
        logo: proshipLogo,
        logoClassName: "brightness-125",
        thumb: proshipThumb,
    },
];

const supplementCards = [
    {
        title: "AI",
        description:
            "Có khả năng sử dụng AI nhằm đẩy nhanh tốc độ, chất lượng và kết quả công việc.",
    },
    {
        title: "Tự học",
        description:
            "Có khả năng nghiên cứu và cập nhật kiến thức mới để giải quyết các vấn đề phát sinh.",
    },
    {
        title: "Tiếng Anh",
        description: "Chỉ biết Đọc và Viết 🙁.",
    },
];

export function Hero({ user: _user }: { user: UserDto }) {
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

    useEffect(() => {
        if (!isQrModalOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsQrModalOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isQrModalOpen]);

    // const products: HeroProduct[] = [
    //     {
    //         title: "Dev Shell",
    //         blurb: "Reproducible, auditable dev environments",
    //         learnMoreLinkUrl: "/dev-shell",
    //         learnMoreLinkText: "Explore Dev Shell",
    //         altLinkText: "Preview source",
    //         altLink:
    //             "/docs/dev-shell/reference/dev-shell-scripts/L1JFQURNRS5tZA==",
    //         benefits: [
    //             "Set up a new machine in minutes with tested scripts",
    //             "50+ pre-configured modern developer tools",
    //             "Consistent shell experience on Mac and Windows WSL",
    //             "Full source code access - customize to your needs",
    //         ],
    //         colorVariant: "devshell",
    //     },
    //     {
    //         title: "Local Dev Tools",
    //         blurb: "Keep your data local. Zero cloud dependencies.",
    //         learnMoreLinkUrl: "/local-dev-tools",
    //         learnMoreLinkText: "Try free",
    //         altLinkText: "Preview source",
    //         altLink:
    //             "/docs/local-dev-tools/reference/ssh-tool-new-electron/L3NyYy9hcHAvaW5kZXgudHN4",
    //         altAltLinkText: "Download now",
    //         altAltLink: "/local-dev-tools#download",
    //         benefits: [
    //             "Offline utilities for Git, SSH, and development",
    //             "Your business data never leaves your machine",
    //             "Universal app for Mac and Windows",
    //             "Perpetual license - not a SaaS subscription",
    //         ],
    //         colorVariant: "localtools",
    //     },
    //     {
    //         title: "Miller Start",
    //         blurb: "Security-first NestJS template with hardened defaults",
    //         githubUrl: "https://github.com/darraghoriordan/saas-nextjs nestjs",
    //         learnMoreLinkUrl: "/miller-start",
    //         learnMoreLinkText: "Explore template",
    //         altLinkText: "Preview source",
    //         altLink: "/docs/miller-start/reference/miller-web/L1JFQURNRS5tZA==",
    //         stars: 50,
    //         benefits: [
    //             "Full-stack NestJS + Next.js + PostgreSQL starter",
    //             "Auth0, Stripe, and OpenTelemetry pre-configured",
    //             "Security best practices built-in from day one",
    //             "Complete with Terraform infrastructure scripts",
    //         ],
    //         colorVariant: "millerstart",
    //     },
    // ];

    return (
        <div className="relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-security-black" />
            {/* <ScanLine /> */}

            <Container className="relative pt-16 md:pt-24 pb-16">
                {/* Hero Section */}
                <section className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-12 items-center">
                    <div className="md:col-span-3">
                        <AnimatedHeadline delay={0.1}>
                            <div>
                                <span className="font-mono text-sm text-accent uppercase tracking-wider">
                                    Full-Stack Developer (Web Applications)
                                </span>
                            </div>
                        </AnimatedHeadline>

                        <AnimatedHeadline delay={0.2}>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-security-light leading-tight tracking-tight">
                                <span className="hidden md:inline">
                                    <TypewriterText
                                        text="Phan Công Minh."
                                        speed={60}
                                        delay={500}
                                    />
                                </span>
                                <span className="md:hidden">
                                    Phan Công Minh.
                                </span>
                            </h1>
                        </AnimatedHeadline>

                        <AnimatedHeadline delay={0.4}>
                            <p className="mt-6 text-lg md:text-xl text-security-text max-w-2xl leading-relaxed">
                                Hơn 5 năm kinh nghiệm thực chiến phát triển ứng dụng web.
                                <br />
                                Có khả năng ứng dụng AI nhằm nâng cao 50% hiệu suất công
                                việc.
                            </p>
                        </AnimatedHeadline>

                        <AnimatedHeadline delay={0.6}>
                            <div className="mt-8">
                                <TrustBadges />
                            </div>
                        </AnimatedHeadline>

                        <AnimatedHeadline delay={0.8}>
                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <Link
                                    href="#"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setIsQrModalOpen(true);
                                    }}
                                    className="inline-flex items-center px-6 py-3 font-mono text-sm bg-accent text-security-black rounded-md hover:bg-accent-dim transition-all hover:shadow-glow"
                                >
                                    Nhắn tin Zalo
                                    <ChatBubbleLeftRightIcon className="ml-2 h-4 w-4" />
                                </Link>
                                {/* <a
                                    href="/files/Phan-Cong-Minh-Full-Stack-Developer-Web-Application-CV.pdf"
                                    download
                                    rel="nofollow"
                                    className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm text-security-light border border-security-border rounded-md hover:border-accent/50 hover:text-accent transition-all"
                                >
                                    Tải CV
                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                </a> */}
                                <a
                                    href="https://linkedin.com/in/minh-phan-2bb344166"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm text-security-light border border-security-border rounded-md hover:border-accent/50 hover:text-accent transition-all"
                                >
                                    LinkedIn
                                    <LinkedInIcon className="h-4 w-4" />
                                </a>
                            </div>
                        </AnimatedHeadline>
                    </div>
                    <div className="md:col-span-2">
                        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-security-border bg-security-black/40 shadow">
                            <Image
                                src={portraitImage}
                                alt="Profile portrait"
                                fill
                                sizes="(min-width: 768px) 40vw, 90vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <AnimatePresence>
                    {isQrModalOpen && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center"
                            aria-modal="true"
                            role="dialog"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.button
                                type="button"
                                aria-label="Close QR modal"
                                onClick={() => setIsQrModalOpen(false)}
                                className="absolute inset-0 bg-security-black/70"
                                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                            <motion.div
                                className="relative z-10 w-[90vw] max-w-md rounded-2xl border border-security-border bg-security-black/90 p-6 shadow-glow"
                                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                    delay: 0.05,
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="font-display text-xl text-security-light">
                                        Quét mã QR
                                    </h2>
                                    <Link
                                        href="#"
                                        onClick={() => setIsQrModalOpen(false)}
                                        className="text-security-text transition-colors hover:text-accent hover:scale-110 active:scale-100"
                                    >
                                        ×
                                    </Link>
                                </div>
                                <div className="mt-4 overflow-hidden rounded-xl border border-security-border bg-security-black/40">
                                    <Image
                                        src={zaloQrImage}
                                        alt="Zalo QR"
                                        className="h-auto w-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                
                <section className="mt-24 md:mt-32">
                  <FadeInOnScroll>
                    <div className="flex items-center gap-4 mb-3">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light">
                            Kỹ Năng Chuyên Môn
                        </h2>
                        <div className="h-px flex-1 bg-security-border" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-security-text">
                        <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                            Full-stack (E2E): Requirements → Plan → Design → Build
                            → Integrations → Test → CI/CD → Deploy → Monitor
                            <ArrowPathIcon className="ml-2 inline h-3.5 w-3.5 align-text-bottom" />
                        </span>
                        {/* <span className="text-sm md:text-base">
                            Full-stack (E2E): Requirements → Plan → Design → Build → Integrations → Test → CI/CD → Deploy → Monitor (and Repeat)
                        </span> */}
                    </div>
                  </FadeInOnScroll>
                    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {skillCards.map((skill, index) => (
                            <FadeInOnScroll
                                key={skill.title}
                                delay={0.08 * (index + 1)}
                            >
                                <SingleSkillCard {...skill} />
                            </FadeInOnScroll>
                        ))}
                    </div>
                    </section>

                

                <section className="mt-24 md:mt-32">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light">
                            Kinh Nghiệm Thực Chiến
                        </h2>
                        <div className="h-px flex-1 bg-security-border" />
                    </div>
                     <div className="flex flex-wrap items-center gap-3 text-security-text">
                        <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                            Remote-First • Hybrid-Ready • On-site-Capable
                        </span>
                    </div>

                    <div className="space-y-6 mt-12">
                        {experienceFeatures.map((feature, index) => (
                            <SingleFeatureCard
                                key={feature.title}
                                title={feature.title}
                                titleSub={feature.titleSub}
                                description={feature.description}
                                frameworks={feature.frameworks}
                                linkUrl={feature.linkUrl}
                                linkText={feature.linkText}
                                image={portraitImage}
                                logo={feature.logo}
                                thumb={feature.thumb}
                                logoClassName={feature.logoClassName}
                                isReversed={index % 2 === 1}
                            />
                        ))}
                    </div>
                </section>

                <section className="mt-24 md:mt-32">
                    {/* Option 1: Text on top + full-bleed image (active) */}
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light">
                            Học Vấn
                        </h2>
                        <div className="h-px flex-1 bg-security-border" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-security-text">
                        <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                            Cử nhân Công nghệ Thông tin (2012 - 2016)
                        </span>
                    </div>
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-12">
                        <div className="relative h-[55vh] min-h-[320px] w-full overflow-hidden">
                            <Image
                                src={educationImage}
                                alt="Education highlight"
                                className="h-full w-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-security-black/70 via-transparent to-transparent" />
                        </div>
                    </div>

                    {/* Option 2: Text overlay on image (locked) */}
                    {/*
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                        <div className="relative h-[60vh] min-h-[360px] w-full overflow-hidden">
                            <Image
                                src={educationImage}
                                alt="Education highlight"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-security-black/45" />
                            <div className="absolute left-6 bottom-6 max-w-xl rounded-2xl border border-security-border bg-security-black/70 p-6 backdrop-blur">
                                <h2 className="font-display text-2xl md:text-3xl text-security-light">
                                    Học Vấn
                                </h2>
                                <p className="mt-3 text-security-text">
                                    Tóm tắt quá trình học tập và nền tảng chuyên môn.
                                </p>
                            </div>
                        </div>
                    </div>
                    */}

                    {/* Option 3: Timeline accent + banner (locked) */}
                    {/*
                    <div className="rounded-2xl border border-security-border bg-security-black/40 p-6 md:p-8">
                        <div className="flex items-start gap-4">
                            <div className="mt-2 h-10 w-px bg-accent" />
                            <div>
                                <h2 className="font-display text-2xl md:text-3xl text-security-light">
                                    Học Vấn
                                </h2>
                                <p className="mt-3 text-security-text">
                                    Nền tảng học thuật, tập trung vào kỹ thuật và hệ thống.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                        <div className="relative h-[50vh] min-h-[300px] w-full overflow-hidden">
                            <Image
                                src={educationImage}
                                alt="Education banner"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    */}

                    {/* Option 4: Glass card on full-bleed image (locked) */}
                    {/*
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                        <div className="relative h-[60vh] min-h-[360px] w-full overflow-hidden">
                            <Image
                                src={educationImage}
                                alt="Education highlight"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-security-black/40 via-transparent to-security-black/70" />
                            <div className="absolute left-6 bottom-6 max-w-lg rounded-2xl border border-security-border bg-security-black/60 p-6 backdrop-blur">
                                <h2 className="font-display text-2xl md:text-3xl text-security-light">
                                    Học Vấn
                                </h2>
                                <p className="mt-3 text-security-text">
                                    Mô tả ngắn về học vấn, nền tảng và định hướng kỹ thuật.
                                </p>
                            </div>
                        </div>
                    </div>
                    */}
                </section>

                <section className="mt-24 md:mt-32">
                    <div className="flex items-center gap-4 mb-3">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light">
                            Bổ Sung
                        </h2>
                        <div className="h-px flex-1 bg-security-border" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-security-text">
                        <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                            Thông tin khác
                        </span>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {supplementCards.map((card, index) => (
                            <FadeInOnScroll
                                key={card.title}
                                delay={0.06 * (index + 1)}
                            >
                                <SingleSupplementCard {...card} />
                            </FadeInOnScroll>
                        ))}
                    </div>
                </section>
                {/* Terminal Demo */}
                {/* <FadeInOnScroll
                    delay={0.2}
                    className="mt-16 md:mt-24 max-w-3xl"
                >
                    <TerminalWindow title="~/projects">
                        <TerminalPrompt
                            command="pnpm run mill:init"
                            output={`[OK] Terraform Synced
[OK] Dependencies installed
[OK] Stripe configured
[OK] Organization setup complete
[OK] Ready for development`}
                        />
                    </TerminalWindow>
                </FadeInOnScroll> */}

                {/* Products Section */}
                {/* <section id="products" className="mt-24 md:mt-32">
                    <FadeInOnScroll>
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="font-display text-2xl md:text-3xl text-security-light">
                                Products
                            </h2>
                            <div className="h-px flex-1 bg-security-border" />
                        </div>
                    </FadeInOnScroll>

                    <StaggerContainer className="space-y-8" staggerDelay={0.15}>
                        {products.map((product) => (
                            <StaggerItem key={product.title}>
                                <SingleProductCard {...product} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section> */}

                {/* Open Source Section - Free & Open Source */}
                {/* <OpenSourceSection /> */}
            </Container>
        </div>
    );
}
