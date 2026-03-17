"use client";

import { Apple, Discord, Dribbble, Facebook, Figma, GitHub, Google, Instagram, LinkedIn, X, YouTube } from "@/components/foundations/social-icons";
import { ComponentPage, Section } from "../_shared/component-page";

export default function SocialIconsPage() {
    return (
        <ComponentPage title="Social Icons" description="Social media brand icons.">
            <Section title="All Social Icons">
                <Apple className="size-6" />
                <Discord className="size-6" />
                <Dribbble className="size-6" />
                <Facebook className="size-6" />
                <Figma className="size-6" />
                <GitHub className="size-6" />
                <Google className="size-6" />
                <Instagram className="size-6" />
                <LinkedIn className="size-6" />
                <X className="size-6" />
                <YouTube className="size-6" />
            </Section>
        </ComponentPage>
    );
}
