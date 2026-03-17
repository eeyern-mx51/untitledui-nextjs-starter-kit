"use client";

import { AlertCircle, CheckCircle, Settings01, XCircle } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { ComponentPage, Section } from "../_shared/component-page";

export default function FeaturedIconPage() {
    return (
        <ComponentPage title="Featured Icon" description="Decorative icon component with themed backgrounds.">
            <Section title="Colors">
                <FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />
                <FeaturedIcon icon={AlertCircle} color="warning" theme="light" size="lg" />
                <FeaturedIcon icon={XCircle} color="error" theme="light" size="lg" />
                <FeaturedIcon icon={Settings01} color="brand" theme="light" size="lg" />
                <FeaturedIcon icon={Settings01} color="gray" theme="light" size="lg" />
            </Section>
            <Section title="Themes">
                <FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />
                <FeaturedIcon icon={CheckCircle} color="success" theme="gradient" size="lg" />
                <FeaturedIcon icon={CheckCircle} color="success" theme="dark" size="lg" />
                <FeaturedIcon icon={CheckCircle} color="success" theme="outline" size="lg" />
            </Section>
            <Section title="Sizes">
                <FeaturedIcon icon={CheckCircle} color="brand" theme="light" size="sm" />
                <FeaturedIcon icon={CheckCircle} color="brand" theme="light" size="md" />
                <FeaturedIcon icon={CheckCircle} color="brand" theme="light" size="lg" />
                <FeaturedIcon icon={CheckCircle} color="brand" theme="light" size="xl" />
            </Section>
        </ComponentPage>
    );
}
