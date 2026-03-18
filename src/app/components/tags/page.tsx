"use client";

import { Tag, TagGroup, TagList } from "@/components/base/tags/tags";
import { ComponentPage, Section } from "../_shared/component-page";

export default function TagsPage() {
    return (
        <ComponentPage title="Tags" description="Tag groups for categorization and filtering.">
            <Section title="Default">
                <TagGroup label="Categories" size="sm">
                    <TagList>
                        <Tag id="design">Design</Tag>
                        <Tag id="engineering">Engineering</Tag>
                        <Tag id="marketing">Marketing</Tag>
                    </TagList>
                </TagGroup>
            </Section>
            <Section title="With Dot">
                <TagGroup label="Status" size="md">
                    <TagList>
                        <Tag id="active" dot dotClassName="bg-fg-success-secondary">Active</Tag>
                        <Tag id="pending" dot dotClassName="bg-fg-warning-secondary">Pending</Tag>
                        <Tag id="closed" dot dotClassName="bg-fg-error-secondary">Closed</Tag>
                    </TagList>
                </TagGroup>
            </Section>
            <Section title="With Count">
                <TagGroup label="Filters" size="md">
                    <TagList>
                        <Tag id="bugs" count={12}>Bugs</Tag>
                        <Tag id="features" count={5}>Features</Tag>
                        <Tag id="docs" count={3}>Docs</Tag>
                    </TagList>
                </TagGroup>
            </Section>
            <Section title="Sizes">
                <TagGroup label="Small" size="sm">
                    <TagList><Tag id="sm">Small</Tag></TagList>
                </TagGroup>
                <TagGroup label="Medium" size="md">
                    <TagList><Tag id="md">Medium</Tag></TagList>
                </TagGroup>
                <TagGroup label="Large" size="lg">
                    <TagList><Tag id="lg">Large</Tag></TagList>
                </TagGroup>
            </Section>
        </ComponentPage>
    );
}
