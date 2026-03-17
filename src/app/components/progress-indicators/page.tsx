"use client";

import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { ComponentPage, Section } from "../_shared/component-page";

export default function ProgressIndicatorsPage() {
    return (
        <ComponentPage title="Progress Indicators" description="Progress bars and circular progress indicators.">
            <Section title="Linear Progress">
                <div className="w-80">
                    <ProgressBarBase value={60} />
                </div>
            </Section>
        </ComponentPage>
    );
}
