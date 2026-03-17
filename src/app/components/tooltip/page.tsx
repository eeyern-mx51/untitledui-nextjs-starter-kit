"use client";

import { Button } from "@/components/base/buttons/button";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { ComponentPage, Section } from "../_shared/component-page";

export default function TooltipPage() {
    return (
        <ComponentPage title="Tooltip" description="Contextual information on hover or focus.">
            <Section title="Default">
                <TooltipTrigger>
                    <Button color="secondary" size="md">Hover me</Button>
                    <Tooltip title="This is a tooltip">Tooltip content</Tooltip>
                </TooltipTrigger>
            </Section>
        </ComponentPage>
    );
}
