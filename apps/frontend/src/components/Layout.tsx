import { PropsWithChildren } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import SEO from "../components/SEO";
import { ThemeColor } from "../styles/themeColors";
import type { LocaleAlternates } from "./LanguageSwitch";

export default function Layout({
    productKey,
    headerTitle,
    children,
    seoDescription,
    seoTitle,
    canonicalUrl,
    themeColor,
    alternates,
    ogType,
    ogImage,
    isNoIndex,
    jsonLd,
    article,
}: {
    productKey?: string;
    headerTitle?: string;
    seoTitle: string;
    seoDescription: string;
    canonicalUrl?: string;
    themeColor?: ThemeColor;
    /** Path of this page in each language (defaults to the current path) */
    alternates?: LocaleAlternates;
    ogType?: string;
    ogImage?: { url: string; width: number; height: number; alt: string };
    isNoIndex?: boolean;
    jsonLd?: object[];
    article?: {
        publishedTime: string;
        modifiedTime?: string;
        section: string;
        tags: string[];
    };
} & PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen">
            <SEO
                title={seoTitle || "Home"}
                description={seoDescription}
                canonicalUrl={canonicalUrl}
                alternates={alternates}
                ogType={ogType}
                ogImage={ogImage}
                isNoIndex={isNoIndex}
                jsonLd={jsonLd}
                article={article}
            />
            <Header
                productKey={productKey}
                headerTitle={headerTitle}
                themeColor={themeColor}
                alternates={alternates}
            />
            <main className="grow">{children}</main>
            <Footer productKey={productKey} headerTitle={headerTitle} />
        </div>
    );
}
