"use client";

import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { ComponentPage, Section } from "../_shared/component-page";

export default function AvatarPage() {
    return (
        <ComponentPage title="Avatar" description="User profile images with status indicators, initials, and label groups.">
            <Section title="Sizes">
                <Avatar initials="OR" size="xs" />
                <Avatar initials="OR" size="sm" />
                <Avatar initials="OR" size="md" />
                <Avatar initials="OR" size="lg" />
                <Avatar initials="OR" size="xl" />
                <Avatar initials="OR" size="2xl" />
            </Section>
            <Section title="With Status">
                <Avatar initials="OR" size="md" status="online" />
                <Avatar initials="OR" size="md" status="offline" />
            </Section>
            <Section title="Label Group">
                <AvatarLabelGroup initials="OR" title="Olivia Rhye" subtitle="olivia@untitledui.com" size="md" />
                <AvatarLabelGroup initials="OR" title="Olivia Rhye" subtitle="olivia@untitledui.com" size="lg" />
            </Section>
        </ComponentPage>
    );
}
