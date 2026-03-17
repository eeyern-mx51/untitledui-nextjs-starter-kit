"use client";

import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { ComponentPage, Section } from "../_shared/component-page";

export default function LogoPage() {
    return (
        <ComponentPage title="Logo" description="Untitled UI logo variants.">
            <Section title="Full Logo">
                <UntitledLogo className="h-8" />
            </Section>
            <Section title="Minimal Logo">
                <UntitledLogoMinimal className="size-8" />
                <UntitledLogoMinimal className="size-12" />
            </Section>
        </ComponentPage>
    );
}
