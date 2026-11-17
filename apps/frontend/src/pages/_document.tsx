import { Head, Html, Main, NextScript } from "next/document";

export default function Document(props: any) {
    return (
        <Html
            className="h-full scroll-smooth bg-security-black antialiased"
            lang={props.locale || "vi"}
        >
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="48x48" />
                <link rel="icon" href="/icon.png" type="image/png" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta name="theme-color" content="#0a0a0b" />
                {/* Fonts (IBM Plex Sans, JetBrains Mono) are self-hosted via next/font in _app.tsx */}
            </Head>

            <body className="bg-security-black text-security-light">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
