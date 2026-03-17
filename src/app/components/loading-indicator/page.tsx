"use client";

import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { ComponentPage, Section } from "../_shared/component-page";

export default function LoadingIndicatorPage() {
    return (
        <ComponentPage title="Loading Indicator" description="Spinner and loading state indicators.">
            <Section title="Default">
                <LoadingIndicator />
            </Section>
        </ComponentPage>
    );
}
