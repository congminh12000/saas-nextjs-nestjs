"use client";

import clsx from "clsx";
import type { ComponentType } from "react";
import { GlowCard } from "../../components/Animations";

type SkillVariant = "accent" | "warning" | "danger" | "brand";

export interface SingleSkillCardProps {
    title: string;
    icon: ComponentType<{ className?: string }>;
    topItems: string[];
    tags: string[];
    variant: SkillVariant;
    score: number;
    className?: string;
}

export function SingleSkillCard({
    title,
    icon,
    topItems,
    tags,
    variant,
    score,
    className,
}: SingleSkillCardProps) {
    const variantStyles: Record<SkillVariant, string> = {
        accent: "border-accent/40 text-accent",
        warning: "border-amber-400/40 text-amber-300",
        danger: "border-rose-400/40 text-rose-300",
        brand: "border-security-border text-violet-300",
    };


    const tagStyles: Record<SkillVariant, string> = {
        accent: "border-accent/20 text-security-text",
        warning: "border-amber-400/20 text-security-text",
        danger: "border-rose-400/20 text-security-text",
        brand: "border-violet-400/20 text-security-text",
    };

    const scoreStyles: Record<SkillVariant, string> = {
        accent: "bg-accent",
        warning: "bg-amber-400",
        danger: "bg-rose-400",
        brand: "bg-violet-400",
    };

    const scoreStrokeStyles: Record<SkillVariant, string> = {
        accent: "stroke-accent",
        warning: "stroke-amber-400",
        danger: "stroke-rose-400",
        brand: "stroke-violet-400",
    };

    const clampedScore = Math.max(1, Math.min(10, score));
    const Icon = icon;

    return (
        <GlowCard
            className={clsx("p-5 border", variantStyles[variant], className)}
            isHoverEnabled={false}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-security-light">
                        <Icon
                            className={clsx(
                                "h-5 w-5",
                                variantStyles[variant],
                            )}
                        />
                        <h3 className="font-display md:text-xl">{title}</h3>
                    </div>
                    <p className="mt-6 text-base md:text-lg text-security-light">
                        {topItems.join(", ")}
                    </p>
                </div>

                {/* Option 2: Score ring on the right (locked) */}
                <div className="flex-shrink-0">
                    <div className="relative h-16 w-16">
                        <svg
                            viewBox="0 0 36 36"
                            className="h-16 w-16 -rotate-90"
                        >
                            <circle
                                cx="18"
                                cy="18"
                                r="15.5"
                                className="fill-none stroke-security-border/50"
                                strokeWidth="3"
                            />
                            <circle
                                cx="18"
                                cy="18"
                                r="15.5"
                                className={clsx(
                                    "fill-none",
                                    scoreStrokeStyles[variant],
                                )}
                                strokeWidth="3"
                                strokeLinecap="round"
                                style={{
                                    strokeDasharray: 97.4,
                                    strokeDashoffset:
                                        97.4 - (97.4 * clampedScore) / 10,
                                }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-semibold text-security-light">
                                {clampedScore * 10}%
                            </span>
                        </div>
                    </div>
                </div>
               
            </div>

            <div className="mt-4">
                {/* Option 1: 10-step dots (active) */}
                {/* <div className="flex items-center gap-1.5">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <span
                            key={index}
                            className={clsx(
                                "h-1.5 w-4 rounded-full",
                                index < clampedScore
                                    ? scoreStyles[variant]
                                    : "bg-security-border/50",
                            )}
                        />
                    ))}
                    <span className="ml-2 text-xs text-security-muted">
                        {clampedScore}/10
                    </span>
                </div> */}

                {/* Option 3: Progress bar + label (locked) */}
                {/*
                <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-security-muted">
                        <span>Proficiency</span>
                        <span>{clampedScore}/10</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-security-border/40">
                        <div
                            className={clsx("h-full", scoreStyles[variant])}
                            style={{ width: `${clampedScore * 10}%` }}
                        />
                    </div>
                </div>
                */}

                {/* Option 4: Star rating (locked) */}
                {/*
                <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <span
                            key={index}
                            className={clsx(
                                "text-sm",
                                index < clampedScore
                                    ? scoreStyles[variant]
                                    : "text-security-border/60",
                            )}
                        >
                            ★
                        </span>
                    ))}
                </div>
                */}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className={clsx(
                            "rounded-full border px-3 py-1 text-xs text-security-text",
                            tagStyles[variant],
                        )}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </GlowCard>
    );
}
