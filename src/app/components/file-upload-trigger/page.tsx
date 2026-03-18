"use client";

import { UploadCloud01 } from "@untitledui/icons";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { Button } from "@/components/base/buttons/button";
import { ComponentPage, Section } from "../_shared/component-page";

export default function FileUploadTriggerPage() {
    return (
        <ComponentPage title="File Upload Trigger" description="File selection trigger button.">
            <Section title="Default">
                <FileTrigger onSelect={(files) => files && console.log("Selected:", Array.from(files).map((f) => f.name))}>
                    <Button color="secondary" size="md" iconLeading={UploadCloud01}>
                        Upload file
                    </Button>
                </FileTrigger>
            </Section>
            <Section title="Multiple Files">
                <FileTrigger allowsMultiple onSelect={(files) => files && console.log("Selected:", Array.from(files).map((f) => f.name))}>
                    <Button color="secondary" size="md" iconLeading={UploadCloud01}>
                        Upload files
                    </Button>
                </FileTrigger>
            </Section>
        </ComponentPage>
    );
}
