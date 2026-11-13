"use client";

import { useEffect } from "react";

function OtelClientSide() {
    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT) {
            return;
        }

        // Load the OpenTelemetry SDK in its own chunk, after the page is idle,
        // so it never competes with first paint or hydration.
        const start = () => {
            void import("../otel/instrumentation.client").then((m) =>
                m.initInstrumentation(),
            );
        };
        const w = window as Window & {
            requestIdleCallback?: (cb: () => void) => number;
        };
        if (w.requestIdleCallback) {
            w.requestIdleCallback(start);
        } else {
            setTimeout(start, 2000);
        }
    }, []);

    return null;
}

export default OtelClientSide;
