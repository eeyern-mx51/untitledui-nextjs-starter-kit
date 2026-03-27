"use client";

import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";
import { DateTimePicker } from "./date-time-picker";
import { DateTimePickerSlots } from "./date-time-picker-slots";
import { DateTimeRangePicker } from "./date-time-range-picker";

const Divider = () => <div className="h-px w-full bg-border-secondary" />;

const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
    <div className="flex w-full flex-col gap-4">
        <div>
            <h2 className="text-lg font-semibold text-primary">{title}</h2>
            <p className="mt-1 text-sm text-tertiary">{description}</p>
        </div>
        {children}
    </div>
);

export const DateTimePickerDemo = () => {
    return (
        <div className="flex min-h-dvh flex-col items-start gap-10 p-8">
            <div>
                <h1 className="text-display-xs font-semibold text-primary">Date & Time Pickers</h1>
                <p className="mt-2 text-md text-tertiary">All picker variants across single month and dual month views.</p>
            </div>

            <h3 className="text-md font-semibold text-brand-secondary">Single Month View</h3>

            <Section title="1. Date Picker" description="Single date selection with actions.">
                <DatePicker onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="2. Date & Time Picker" description="Single date and time selection with actions.">
                <DateTimePicker onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="3. Date Range Picker (single month)" description="Date range selection in single month view.">
                <DateRangePicker singleMonth onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="4. Date & Time Range Picker (single month)" description="Date and time range selection in single month view.">
                <DateTimeRangePicker singleMonth onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="5. Date & Time Picker — Time Slots" description="Date and time selection with scrollable time slot panel on desktop and dropdown on mobile.">
                <DateTimePickerSlots onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Divider />

            <h3 className="text-md font-semibold text-brand-secondary">Dual Month View</h3>

            <Section title="6. Date Range Picker (dual month)" description="Date range with preset sidebar and dual calendar.">
                <DateRangePicker onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="7. Date & Time Range Picker (dual month)" description="Date and time range with preset sidebar and dual calendar.">
                <DateTimeRangePicker onApply={() => {}} onCancel={() => {}} />
            </Section>
        </div>
    );
};
