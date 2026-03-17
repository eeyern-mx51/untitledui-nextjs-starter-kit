"use client";

import { ComponentPage, Section } from "../_shared/component-page";

export default function FileUploadPage() {
    return (
        <ComponentPage title="File Upload" description="Drag-and-drop file upload with progress.">
            <Section title="Default">
                <p className="text-sm text-tertiary">File upload drop zone — see source at components/application/file-upload/</p>
            </Section>
        </ComponentPage>
    );
}
