"use client";

import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";
import { DateTimePicker } from "./date-time-picker";
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
                <p className="mt-2 text-md text-tertiary">All 8 picker variants — date and date+time, single and range, with and without actions.</p>
            </div>

            <Divider />

            <Section title="1. Single Date — with actions" description="Date input + Today button, calendar, Cancel/Apply.">
                <DatePicker onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="2. Single Date — no actions" description="Date input + Today button, calendar. Closes on select.">
                <DatePicker showActions={false} />
            </Section>

            <Divider />

            <Section title="3. Single DateTime — with actions" description="Date input + time input, calendar, Cancel/Apply.">
                <DateTimePicker onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="4. Single DateTime — no actions" description="Date input + time input, calendar. Closes on select.">
                <DateTimePicker showActions={false} />
            </Section>

            <Divider />

            <Section title="5. Date Range — with actions" description="Dual month calendar, presets sidebar, Start/End date inputs, Cancel/Apply.">
                <DateRangePicker onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="6. Date Range — no actions" description="Dual month calendar, presets sidebar. Closes on range select.">
                <DateRangePicker showActions={false} />
            </Section>

            <Divider />

            <Section title="7. DateTime Range — with actions" description="Dual month calendar, presets sidebar, Start/End date+time inputs, Cancel/Apply.">
                <DateTimeRangePicker onApply={() => {}} onCancel={() => {}} />
            </Section>

            <Section title="8. DateTime Range — no actions" description="Dual month calendar, presets sidebar. Closes on range select.">
                <DateTimeRangePicker showActions={false} />
            </Section>
        </div>
    );
};
