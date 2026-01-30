"use client";

import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export interface SingleFeatureCardProps {
    title: string;
    titleSub: string;
    description: string;
    frameworks: string[];
    linkUrl: string;
    linkText: string;
    image: StaticImageData;
    logo: StaticImageData;
    thumb: StaticImageData;
    logoClassName?: string;
    isReversed?: boolean;
}

export function SingleFeatureCard({
    title,
    titleSub,
    description,
    frameworks,
    linkUrl,
    linkText,
    image,
    logo,
    thumb,
    logoClassName,
    isReversed = false,
}: SingleFeatureCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-security-border bg-security-dark p-10 md:p-8">
            {/* <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-security-border/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_45%)]" />
            </div> */}
            <div className="relative">
            <div
                className={clsx(
                    "grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center",
                    isReversed && "md:[&>*:first-child]:order-2",
                    isReversed && "md:[&>*:last-child]:order-1",
                )}
            >
                <div className="space-y-4">
                    <div className="mb-9">
                        <div className="mb-3 flex items-center">
                            <div className="relative h-10 w-auto overflow-hidden">
                                <Image
                                    src={logo}
                                    alt={`${title} logo`}
                                    className={clsx(
                                        "h-full w-full object-contain",
                                        logoClassName,
                                    )}
                                />
                            </div>
                        </div>
                        <h3 className="font-display text-xl md:text-xl text-security-light">
                            <span className="sr-only">{title}</span>
                            <span className="capitalize">{titleSub}</span>
                        </h3>
                        <p className="mt-1 text-security-text">
                            {description}
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-security-text sm:grid-cols-2">
                        {frameworks.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                <span className="capitalize">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm bg-accent text-security-black rounded-md hover:bg-accent-dim transition-all hover:shadow-glow"
                    >
                        {linkText}
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </a>
                </div>

                <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-security-border bg-security-black/40 shadow-lg">
                        <Image
                            src={thumb}
                            alt={`${title} preview`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
