import { Auth0Provider } from "@auth0/nextjs-auth0";
import "focus-visible";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "../styles/tailwind.css";
import NextProgress from "next-progress";
import OtelClientSide from "./otel";
// import dynamic from "next/dynamic";

// const CrispWithNoSSR = dynamic(() => import("../components/CrispChat"));

// Self-hosted at build time: no render-blocking request to Google Fonts,
// and the font files are preloaded from our own domain.
const plexSans = IBM_Plex_Sans({
    subsets: ["latin", "vietnamese"],
    weight: ["400", "500", "600"],
    display: "swap",
});
const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin", "vietnamese"],
    weight: ["400", "500", "600"],
    display: "swap",
});

export default function App({ Component, pageProps }: any) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <style jsx global>{`
                :root {
                    --font-sans: ${plexSans.style.fontFamily};
                    --font-mono: ${jetBrainsMono.style.fontFamily};
                }
            `}</style>
            <Auth0Provider user={pageProps.user}>
            {/* <CrispWithNoSSR /> */}
                <OtelClientSide />
                <NextProgress delay={300} options={{ showSpinner: true }} />
                <Component {...pageProps} />
            </Auth0Provider>
        </QueryClientProvider>
    );
}
