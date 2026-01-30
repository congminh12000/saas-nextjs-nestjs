"use client";

import { CheckIcon } from "@heroicons/react/24/outline";

export interface SingleSupplementCardProps {
    title: string;
    description: string;
}

export function SingleSupplementCard({
    title,
    description,
}: SingleSupplementCardProps) {
    return (
        <div className="rounded-2xl border border-security-border bg-security-dark p-6">
            <div className="flex items-start gap-3">
                <CheckIcon className="mt-1 h-5 w-5 text-accent" />
                <div>
                    <h3 className="font-mono text-lg text-security-light capitalize">
                        {title}
                    </h3>
                    <p className="mt-3 text-sm text-security-text leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
