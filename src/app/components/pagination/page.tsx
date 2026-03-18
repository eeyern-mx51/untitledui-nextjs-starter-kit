"use client";

import { useState } from "react";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { ComponentPage, Section } from "../_shared/component-page";

export default function PaginationPage() {
    const [page, setPage] = useState(1);

    return (
        <ComponentPage title="Pagination" description="Data navigation controls.">
            <Section title="Default">
                <PaginationPageDefault page={page} total={10} onPageChange={setPage} />
            </Section>
            <Section title="Rounded">
                <PaginationPageDefault page={page} total={10} onPageChange={setPage} rounded />
            </Section>
        </ComponentPage>
    );
}
