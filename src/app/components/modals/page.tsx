"use client";

import { DialogTrigger } from "react-aria-components";
import { ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { ComponentPage, Section } from "../_shared/component-page";

export default function ModalsPage() {
    return (
        <ComponentPage title="Modals" description="Overlay dialogs for focused content and actions.">
            <Section title="Default">
                <DialogTrigger>
                    <Button color="primary" size="md">Open modal</Button>
                    <ModalOverlay>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-primary">Modal Title</h3>
                            <p className="mt-2 text-sm text-tertiary">This is example modal content.</p>
                        </div>
                    </ModalOverlay>
                </DialogTrigger>
            </Section>
        </ComponentPage>
    );
}
