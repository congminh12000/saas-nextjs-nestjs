import { useRouter } from "next/router";
import { en } from "./en";
import { vi } from "./vi";
import { defaultLocale, locales, type Dictionary, type Locale } from "./types";

export * from "./types";

const dictionaries: Record<Locale, Dictionary> = { vi, en };

export function toLocale(value: string | undefined): Locale {
    return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export function getDictionary(locale: string | undefined): Dictionary {
    return dictionaries[toLocale(locale)];
}

/** Current locale and its dictionary, from the Next.js router. */
export function useT(): { locale: Locale; t: Dictionary } {
    const { locale } = useRouter();
    const current = toLocale(locale);
    return { locale: current, t: dictionaries[current] };
}

/** Path prefix for a locale: "" for the default (vi), "/en" for English. */
export function localePrefix(locale: Locale): string {
    return locale === defaultLocale ? "" : `/${locale}`;
}
