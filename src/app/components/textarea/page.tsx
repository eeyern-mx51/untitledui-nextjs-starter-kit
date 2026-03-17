"use client";

import { TextArea } from "@/components/base/textarea/textarea";
import { ComponentPage, Section } from "../_shared/component-page";

export default function TextareaPage() {
    return (
        <ComponentPage title="Textarea" description="Multi-line text input fields.">
            <Section title="Basic">
                <TextArea label="Description" placeholder="Enter a description..." />
            </Section>
            <Section title="With Hint">
                <TextArea label="Bio" placeholder="Tell us about yourself" hint="Max 200 characters" />
            </Section>
            <Section title="States">
                <TextArea label="Error" placeholder="Enter value" isInvalid hint="This field is required" />
                <TextArea label="Disabled" placeholder="Disabled" isDisabled />
            </Section>
        </ComponentPage>
    );
}
