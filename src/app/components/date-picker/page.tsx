"use client";

import { DatePicker } from "@/components/application/date-picker/date-picker";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { ComponentPage, Section } from "../_shared/component-page";

export default function DatePickerPage() {
    return (
        <ComponentPage title="Date Picker" description="Calendar-based date and date range selection.">
            <Section title="Single Date Picker">
                <DatePicker onApply={() => {}} onCancel={() => {}} />
            </Section>
            <Section title="Date Range Picker">
                <DateRangePicker onApply={() => {}} onCancel={() => {}} />
            </Section>
        </ComponentPage>
    );
}
