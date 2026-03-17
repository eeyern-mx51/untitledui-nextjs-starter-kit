"use client";

import { ArrowUp } from "@untitledui/icons";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { ComponentPage, Section } from "../_shared/component-page";

export default function BadgesPage() {
    return (
        <ComponentPage title="Badges" description="Status indicators and labels.">
            <Section title="Basic">
                <Badge color="gray" size="sm">Gray</Badge>
                <Badge color="brand" size="sm">Brand</Badge>
                <Badge color="error" size="sm">Error</Badge>
                <Badge color="warning" size="sm">Warning</Badge>
                <Badge color="success" size="sm">Success</Badge>
            </Section>
            <Section title="With Dot">
                <BadgeWithDot color="success" size="md">Active</BadgeWithDot>
                <BadgeWithDot color="error" size="md">Inactive</BadgeWithDot>
            </Section>
            <Section title="With Icon">
                <BadgeWithIcon iconLeading={ArrowUp} color="success" size="md">12%</BadgeWithIcon>
            </Section>
            <Section title="Sizes">
                <Badge color="brand" size="sm">Small</Badge>
                <Badge color="brand" size="md">Medium</Badge>
                <Badge color="brand" size="lg">Large</Badge>
            </Section>
        </ComponentPage>
    );
}
