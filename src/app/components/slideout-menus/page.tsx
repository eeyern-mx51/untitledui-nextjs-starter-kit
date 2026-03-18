"use client";

import { DialogTrigger } from "react-aria-components";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { ComponentPage, Section } from "../_shared/component-page";

export default function SlideoutMenusPage() {
    return (
        <ComponentPage title="Slideout Menus" description="Side panel overlays for secondary content.">
            <Section title="Default">
                <DialogTrigger>
                    <Button color="primary" size="md">Open slideout</Button>
                    <SlideoutMenu>
                        {({ close }) => (
                            <>
                                <SlideoutMenu.Header onClose={close}>Panel Title</SlideoutMenu.Header>
                                <SlideoutMenu.Content>
                                    <p className="text-sm text-tertiary">This is the slideout panel content. You can put any content here — forms, details, settings, etc.</p>
                                </SlideoutMenu.Content>
                                <SlideoutMenu.Footer>
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" size="md" onClick={close}>Cancel</Button>
                                        <Button color="primary" size="md" onClick={close}>Save</Button>
                                    </div>
                                </SlideoutMenu.Footer>
                            </>
                        )}
                    </SlideoutMenu>
                </DialogTrigger>
            </Section>
        </ComponentPage>
    );
}
