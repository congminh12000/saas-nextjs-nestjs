import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { locales, useT, type Locale } from "../i18n";

/**
 * Path (without locale prefix) of this page in each language. Pages whose
 * URL differs per language (blog posts with translated slugs) pass these;
 * everywhere else the current path is reused.
 */
export type LocaleAlternates = Partial<Record<Locale, string>>;

export function LanguageSwitch({
    alternates,
    className,
}: {
    alternates?: LocaleAlternates;
    className?: string;
}) {
    const router = useRouter();
    const { locale: current, t } = useT();
    const samePath = (router.asPath || "/").split(/[?#]/)[0];

    return (
        <nav
            aria-label={t.header.languageLabel}
            className={clsx(
                "flex items-center rounded-md border border-security-border font-mono text-xs",
                className,
            )}
        >
            {locales.map((locale, index) => {
                const isActive = locale === current;
                const href = alternates ? alternates[locale] : samePath;
                const label = locale.toUpperCase();
                const itemClass = clsx(
                    "px-2.5 py-1.5 uppercase tracking-wider transition-colors",
                    index > 0 && "border-l border-security-border",
                );
                if (isActive) {
                    return (
                        <span
                            key={locale}
                            aria-current="true"
                            className={clsx(itemClass, "text-accent")}
                        >
                            {label}
                        </span>
                    );
                }
                if (!href) {
                    return (
                        <span
                            key={locale}
                            className={clsx(itemClass, "text-security-border")}
                        >
                            {label}
                        </span>
                    );
                }
                return (
                    <Link
                        key={locale}
                        href={href}
                        locale={locale}
                        hrefLang={locale}
                        className={clsx(
                            itemClass,
                            "text-security-text hover:text-accent",
                        )}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
