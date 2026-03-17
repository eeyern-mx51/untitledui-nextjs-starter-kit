"use client";

import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { ComponentPage, Section } from "../_shared/component-page";

export default function ButtonGroupPage() {
    return (
        <ComponentPage title="Button Group" description="Grouped buttons for related actions.">
            <Section title="Default">
                <ButtonGroup>
                    <ButtonGroupItem id="1">Option 1</ButtonGroupItem>
                    <ButtonGroupItem id="2">Option 2</ButtonGroupItem>
                    <ButtonGroupItem id="3">Option 3</ButtonGroupItem>
                </ButtonGroup>
            </Section>
        </ComponentPage>
    );
}
