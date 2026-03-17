"use client";

import { Toggle } from "@/components/base/toggle/toggle";
import { ComponentPage, Section } from "../_shared/component-page";

export default function TogglePage() {
    return (
        <ComponentPage title="Toggle" description="On/off switch controls.">
            <Section title="Sizes">
                <Toggle size="sm" label="Small" />
                <Toggle size="md" label="Medium" />
            </Section>
            <Section title="States">
                <Toggle label="Default" />
                <Toggle label="Selected" defaultSelected />
                <Toggle label="Disabled" isDisabled />
            </Section>
        </ComponentPage>
    );
}
