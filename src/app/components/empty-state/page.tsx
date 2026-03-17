"use client";

import { Plus } from "@untitledui/icons";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Button } from "@/components/base/buttons/button";
import { ComponentPage, Section } from "../_shared/component-page";

export default function EmptyStatePage() {
    return (
        <ComponentPage title="Empty State" description="Placeholder content when no data is available.">
            <Section title="Default">
                <EmptyState title="No projects yet">
                    <Button color="primary" size="md" iconLeading={Plus}>New project</Button>
                </EmptyState>
            </Section>
        </ComponentPage>
    );
}
