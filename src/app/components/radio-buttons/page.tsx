"use client";

import { RadioGroup as AriaRadioGroup } from "react-aria-components";
import { RadioButton } from "@/components/base/radio-buttons/radio-buttons";
import { ComponentPage, Section } from "../_shared/component-page";

export default function RadioButtonsPage() {
    return (
        <ComponentPage title="Radio Buttons" description="Single-select radio controls.">
            <Section title="Basic">
                <AriaRadioGroup defaultValue="email" aria-label="Notifications">
                    <RadioButton value="email" label="Email" hint="Get notified by email" />
                    <RadioButton value="sms" label="SMS" hint="Get notified by SMS" />
                    <RadioButton value="push" label="Push" hint="Get push notifications" />
                </AriaRadioGroup>
            </Section>
            <Section title="Sizes">
                <AriaRadioGroup defaultValue="a" aria-label="Small">
                    <RadioButton value="a" label="Option A" size="sm" />
                    <RadioButton value="b" label="Option B" size="sm" />
                </AriaRadioGroup>
                <AriaRadioGroup defaultValue="a" aria-label="Medium">
                    <RadioButton value="a" label="Option A" size="md" />
                    <RadioButton value="b" label="Option B" size="md" />
                </AriaRadioGroup>
            </Section>
        </ComponentPage>
    );
}
