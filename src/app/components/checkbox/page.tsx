"use client";

import { Checkbox } from "@/components/base/checkbox/checkbox";
import { ComponentPage, Section } from "../_shared/component-page";

export default function CheckboxPage() {
    return (
        <ComponentPage title="Checkbox" description="Boolean selection controls with labels and hints.">
            <Section title="Basic">
                <Checkbox label="Remember me" />
                <Checkbox label="With hint" hint="Save my login details for next time" />
            </Section>
            <Section title="Sizes">
                <Checkbox label="Small" size="sm" />
                <Checkbox label="Medium" size="md" />
            </Section>
            <Section title="States">
                <Checkbox label="Checked" isSelected />
                <Checkbox label="Indeterminate" isIndeterminate />
                <Checkbox label="Disabled" isDisabled />
            </Section>
        </ComponentPage>
    );
}
