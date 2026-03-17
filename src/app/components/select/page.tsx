"use client";

import { Select } from "@/components/base/select/select";
import { ComponentPage, Section } from "../_shared/component-page";

const items = [
    { id: "1", label: "Olivia Rhye" },
    { id: "2", label: "Phoenix Baker" },
    { id: "3", label: "Lana Steiner" },
    { id: "4", label: "Demi Wilkinson" },
];

export default function SelectPage() {
    return (
        <ComponentPage title="Select" description="Dropdown selections with search and multi-select capabilities.">
            <Section title="Basic">
                <Select label="Team member" placeholder="Select member" items={items}>
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
            </Section>
            <Section title="ComboBox (Searchable)">
                <Select.ComboBox label="Search members" placeholder="Search..." items={items}>
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select.ComboBox>
            </Section>
            <Section title="Sizes">
                <Select label="Small" placeholder="Select" size="sm" items={items}>
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <Select label="Medium" placeholder="Select" size="md" items={items}>
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
            </Section>
        </ComponentPage>
    );
}
