"use client";

import { PinInput } from "@/components/base/pin-input/pin-input";
import { ComponentPage, Section } from "../_shared/component-page";

export default function PinInputPage() {
    return (
        <ComponentPage title="Pin Input" description="Verification code input fields.">
            <Section title="Default">
                <PinInput />
            </Section>
        </ComponentPage>
    );
}
