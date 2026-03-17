"use client";

import { Plus, Trash02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ComponentPage, Section } from "../_shared/component-page";

export default function ButtonsPage() {
    return (
        <ComponentPage title="Buttons" description="All button variants with icons and loading states.">
            <Section title="Colors">
                <Button color="primary" size="md">Primary</Button>
                <Button color="secondary" size="md">Secondary</Button>
                <Button color="tertiary" size="md">Tertiary</Button>
                <Button color="primary-destructive" size="md">Destructive</Button>
                <Button color="link-color" size="md">Link Color</Button>
                <Button color="link-gray" size="md">Link Gray</Button>
            </Section>
            <Section title="Sizes">
                <Button color="primary" size="sm">Small</Button>
                <Button color="primary" size="md">Medium</Button>
                <Button color="primary" size="lg">Large</Button>
                <Button color="primary" size="xl">XL</Button>
            </Section>
            <Section title="With Icons">
                <Button color="primary" size="md" iconLeading={Plus}>Add item</Button>
                <Button color="primary-destructive" size="md" iconLeading={Trash02}>Delete</Button>
            </Section>
            <Section title="Loading">
                <Button color="primary" size="md" isLoading>Loading</Button>
                <Button color="primary" size="md" isLoading showTextWhileLoading>Saving...</Button>
            </Section>
            <Section title="Disabled">
                <Button color="primary" size="md" isDisabled>Disabled</Button>
                <Button color="secondary" size="md" isDisabled>Disabled</Button>
            </Section>
        </ComponentPage>
    );
}
