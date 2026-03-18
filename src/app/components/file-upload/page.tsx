"use client";

import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { ComponentPage, Section } from "../_shared/component-page";

export default function FileUploadPage() {
    return (
        <ComponentPage title="File Upload" description="Drag-and-drop file upload with progress.">
            <Section title="Default">
                <FileUploadDropZone
                    accept="image/*,.pdf"
                    hint="SVG, PNG, JPG or PDF (max. 10MB)"
                    onDropFiles={(files) => console.log("Dropped:", files)}
                />
            </Section>
            <Section title="Disabled">
                <FileUploadDropZone isDisabled hint="Upload is disabled" />
            </Section>
        </ComponentPage>
    );
}
