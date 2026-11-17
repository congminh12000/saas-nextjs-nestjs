import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "./Container";
import { LanguageSwitch, type LocaleAlternates } from "./LanguageSwitch";
import { ThemeColor } from "../styles/themeColors";
import { useT } from "../i18n";

// Set to false to hide the blog from the navigation.
const isBlogEnabled = true;

export function Header({
    headerTitle,
    alternates,
}: {
    productKey?: string;
    headerTitle?: string;
    themeColor?: ThemeColor;
    alternates?: LocaleAlternates;
}) {
    const { t } = useT();
    const { pathname } = useRouter();

    const navItems = [
        { href: "/", label: t.header.nav.home, isActive: pathname === "/" },
        ...(isBlogEnabled
            ? [
                  {
                      href: "/blog",
                      label: t.header.nav.blog,
                      isActive: pathname.startsWith("/blog"),
                  },
              ]
            : []),
    ];

    return (
        <header className="relative z-50 border-b border-security-border/50">
            <Container>
                <nav className="flex items-center justify-between gap-4 py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="group flex items-center gap-2">
                            <span className="font-mono text-lg md:text-xl text-security-light group-hover:text-accent transition-colors">
                                <span className="text-accent">{">"}</span>{" "}
                                {headerTitle || "Minh Phan"}
                            </span>
                        </Link>
                        {navItems.length > 1 && (
                            <div className="flex items-center gap-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        aria-current={
                                            item.isActive ? "page" : undefined
                                        }
                                        className={clsx(
                                            "px-3 py-2 font-mono text-sm rounded-md transition-colors",
                                            item.isActive
                                                ? "text-accent"
                                                : "text-security-text hover:text-accent",
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline font-mono text-xs uppercase tracking-wider text-security-muted">
                            {t.header.tagline}
                        </span>
                        <LanguageSwitch alternates={alternates} />
                    </div>
                </nav>
            </Container>
        </header>
    );
}
