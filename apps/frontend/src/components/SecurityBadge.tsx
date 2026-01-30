import clsx from "clsx";
import {
    LockClosedIcon,
    CodeBracketIcon,
    ServerIcon,
    ShieldCheckIcon,
    StarIcon,
    UsersIcon,
    ArrowDownTrayIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type BadgeIcon =
    | "lock"
    | "code"
    | "server"
    | "shield"
    | "star"
    | "star-solid"
    | "users"
    | "download"
    | "terminal";

interface SecurityBadgeProps {
    icon?: BadgeIcon;
    children: React.ReactNode;
    className?: string;
    variant?:
        | "default"
        | "accent"
        | "muted"
        | "success"
        | "warning"
        | "danger"
        | "info"
        | "brand";
}

const iconMap = {
    lock: LockClosedIcon,
    code: CodeBracketIcon,
    server: ServerIcon,
    shield: ShieldCheckIcon,
    star: StarIcon,
    "star-solid": StarIconSolid,
    users: UsersIcon,
    download: ArrowDownTrayIcon,
    terminal: CommandLineIcon,
};

export function SecurityBadge({
    icon,
    children,
    className,
    variant = "default",
}: SecurityBadgeProps) {
    const Icon = icon ? iconMap[icon] : null;

    const variantStyles = {
        default:
            "border-security-border text-security-text hover:border-accent/50 hover:text-accent",
        accent: "border-accent/30 text-accent hover:border-accent hover:bg-accent/10",
        muted: "border-security-border/50 text-security-muted",
        success:
            "border-emerald-400/40 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-400/10",
        warning:
            "border-amber-400/40 text-amber-300 hover:border-amber-400 hover:bg-amber-400/10",
        danger:
            "border-rose-400/40 text-rose-300 hover:border-rose-400 hover:bg-rose-400/10",
        info: "border-sky-400/40 text-sky-300 hover:border-sky-400 hover:bg-sky-400/10",
        brand:
            "border-violet-400/40 text-violet-300 hover:border-violet-400 hover:bg-violet-400/10",
    };

    return (
        <span
            className={clsx(
                "inline-flex items-center gap-2 px-3 py-1.5 border rounded-full font-mono text-xs transition-colors",
                variantStyles[variant],
                className,
            )}
        >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {children}
        </span>
    );
}

// Trust badges row component
interface TrustBadgesProps {
    className?: string;
}

export function TrustBadges({ className }: TrustBadgesProps) {
    return (
        <div className={clsx("flex flex-col gap-3", className)}>
            <div className="flex flex-wrap items-center gap-3">
                <SecurityBadge variant="accent">
                    Next.js (React)
                </SecurityBadge>
                <SecurityBadge variant="accent">
                    Vue.js
                </SecurityBadge>
                <SecurityBadge variant="accent">
                    TypeScript
                </SecurityBadge>
                <SecurityBadge variant="warning">
                    NestJS (Node.js)
                </SecurityBadge>
                <SecurityBadge variant="warning">RESTful APIs</SecurityBadge>
                <SecurityBadge variant="warning">PHP</SecurityBadge>
                <SecurityBadge variant="danger">
                    PostgreSQL
                </SecurityBadge>
                <SecurityBadge variant="danger">MongoDB</SecurityBadge>
                <SecurityBadge variant="danger">Redis</SecurityBadge>
                <SecurityBadge variant="brand">
                    Git
                </SecurityBadge>
                <SecurityBadge variant="brand">Docker</SecurityBadge>
                <SecurityBadge variant="brand">Agile / Scrum</SecurityBadge>
            </div>
            {/* <div className="flex flex-wrap items-center gap-3">
                <SecurityBadge variant="warning">
                    NestJS (Node.js)
                </SecurityBadge>
                <SecurityBadge variant="warning">PHP</SecurityBadge>
                <SecurityBadge variant="warning">RESTful APIs</SecurityBadge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <SecurityBadge variant="danger">
                    PostgreSQL
                </SecurityBadge>
                <SecurityBadge variant="danger">MongoDB</SecurityBadge>
                <SecurityBadge variant="danger">Redis</SecurityBadge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <SecurityBadge variant="brand">
                    Git
                </SecurityBadge>
                <SecurityBadge variant="brand">Docker</SecurityBadge>
                <SecurityBadge variant="brand">Agile / Scrum</SecurityBadge>
            </div> */}
        </div>
    );
}

// GitHub stars badge
interface GitHubStarsBadgeProps {
    stars: number;
    className?: string;
}

export function GitHubStarsBadge({ stars, className }: GitHubStarsBadgeProps) {
    return (
        <SecurityBadge icon="star-solid" variant="accent" className={className}>
            {stars} GitHub Stars
        </SecurityBadge>
    );
}
