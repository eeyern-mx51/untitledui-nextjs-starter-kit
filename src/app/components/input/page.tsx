"use client";

import { Mail01, SearchLg } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { ComponentPage, Section } from "../_shared/component-page";

export default function InputPage() {
    return (
        <ComponentPage title="Input" description="Text inputs with validation, icons, and helper text.">
            <Section title="Basic">
                <Input label="Email" placeholder="olivia@untitledui.com" />
            </Section>
            <Section title="With Icon">
                <Input icon={Mail01} label="Email" placeholder="olivia@untitledui.com" />
                <Input icon={SearchLg} label="Search" placeholder="Search..." />
            </Section>
            <Section title="States">
                <Input label="Required" placeholder="Enter value" isRequired />
                <Input label="Error" placeholder="Enter value" isInvalid hint="This field is required" />
                <Input label="Disabled" placeholder="Disabled" isDisabled />
            </Section>
            <Section title="With Hint & Tooltip">
                <Input label="Password" placeholder="Enter password" hint="Must be at least 8 characters" tooltip="Use a mix of letters, numbers, and symbols" />
            </Section>
            <Section title="Sizes">
                <Input label="Small" placeholder="Small input" size="sm" />
                <Input label="Medium" placeholder="Medium input" size="md" />
            </Section>
        </ComponentPage>
    );
}
