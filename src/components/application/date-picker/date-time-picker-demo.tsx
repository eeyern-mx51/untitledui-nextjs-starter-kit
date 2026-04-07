"use client";

import type { ReactNode } from "react";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";
import { DateTimePicker } from "./date-time-picker";
import { DateTimeRangePicker } from "./date-time-range-picker";

/* ─── Layout helpers ──────────────────────────────────────────────────── */

const Divider = () => <div className="h-px w-full bg-border-secondary" />;

const VariantSection = ({
    number,
    title,
    description,
    whenToUse,
    children,
}: {
    number: number;
    title: string;
    description: string;
    whenToUse: string;
    children: ReactNode;
}) => (
    <div className="flex w-full flex-col gap-5">
        <div>
            <h2 className="text-lg font-semibold text-primary">
                {number}. {title}
            </h2>
            <p className="mt-1 text-sm text-tertiary">{description}</p>
        </div>

        {/* Live component */}
        <div className="rounded-2xl border border-secondary bg-primary p-6">{children}</div>

        {/* When to use */}
        <div className="rounded-lg border border-tertiary bg-secondary px-4 py-3 text-sm leading-relaxed text-secondary">
            <span className="font-semibold text-primary">When to use: </span>
            {whenToUse}
        </div>
    </div>
);

/* ─── Summary table ───────────────────────────────────────────────────── */

const SummaryTable = () => {
    const rows = [
        { decision: "Trigger", approach: "Button (not input)", why: "Prevents free-text entry errors; consistent click target" },
        { decision: "Label", approach: "Above button", why: "Matches input field pattern; provides context" },
        { decision: "Clear", approach: "Inside dialog, keeps open", why: "User can immediately re-select after clearing" },
        { decision: "Frontend errors", approach: "Inside dialog", why: "Error is actionable within the dialog context" },
        { decision: "Backend errors", approach: "Hint text below button", why: "Consistent with form input error pattern" },
        { decision: "Single date + time", approach: "Two separate fields", why: "Keeps calendar simple; time can be optional/independent" },
        { decision: "Range + time", approach: "Time inside dialog", why: "Minimises clicks; one flow for start/end date+time" },
    ];

    return (
        <div className="overflow-hidden rounded-xl border border-secondary">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-secondary bg-secondary">
                        <th className="px-4 py-2.5 text-left font-medium text-tertiary">Decision</th>
                        <th className="px-4 py-2.5 text-left font-medium text-tertiary">Approach</th>
                        <th className="px-4 py-2.5 text-left font-medium text-tertiary">Why</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.decision} className="border-b border-secondary last:border-b-0">
                            <td className="px-4 py-2.5 font-medium text-primary">{row.decision}</td>
                            <td className="px-4 py-2.5 text-secondary">{row.approach}</td>
                            <td className="px-4 py-2.5 text-tertiary">{row.why}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

/* ─── Main demo ───────────────────────────────────────────────────────── */

export const DateTimePickerDemo = () => {
    return (
        <div className="flex min-h-dvh flex-col items-start gap-10 p-8">
            {/* Header */}
            <div>
                <h1 className="text-display-xs font-semibold text-primary">Date & Time Pickers</h1>
                <p className="mt-2 text-md text-tertiary">
                    All picker variants with usage guidance for when to reach for each one.
                </p>
            </div>

            {/* ─── 1: Date Picker ─────────────────────────────────────────── */}
            <VariantSection
                number={1}
                title="Date Picker"
                description="Selects a single date. Calendar dialog with date input, Today preset, and Cancel/Apply."
                whenToUse="The user needs to pick one specific day and time doesn't matter. Due dates, start dates, birth dates, expiry dates — any form field that expects a calendar date."
            >
                <DatePicker label="Date" />
            </VariantSection>

            <Divider />

            {/* ─── 2: Date & Time Picker ──────────────────────────────────── */}
            <VariantSection
                number={2}
                title="Date & Time Picker"
                description="Two separate side-by-side fields — a date picker button and a standalone time input. The calendar dialog is date-only."
                whenToUse="The user needs to specify a moment in time, not just a day. Scheduling, deadlines with a cutoff time, or any input where hours and minutes matter alongside the date. The decoupled layout means time can be optional or pre-filled independently."
            >
                <DateTimePicker label="Date" timeLabel="Time" />
            </VariantSection>

            <Divider />

            {/* ─── 3: Date Range (single month) ───────────────────────────── */}
            <VariantSection
                number={3}
                title="Date Range Picker — Single Month"
                description="Start and end date selection. Single calendar month with preset links, stacked Start/End date inputs, and Cancel/Apply."
                whenToUse="The user needs to define a period of time (date-only) and the viewport is narrow — mobile, tablet, or a compact sidebar filter. Preset links give quick access to common ranges like last week or last month."
            >
                <DateRangePicker label="Date" singleMonth />
            </VariantSection>

            <Divider />

            {/* ─── 4: Date Range (dual month) ─────────────────────────────── */}
            <VariantSection
                number={4}
                title="Date Range Picker — Dual Month"
                description="Desktop layout with preset sidebar, two visible calendar months, date inputs in the footer, and a Clear link."
                whenToUse="Same as above but on desktop where there's room for two months. The dual calendar makes it easier to select ranges that span across months. The preset sidebar provides one-click access to common periods. Use this as the default range picker on wider screens."
            >
                <DateRangePicker label="Date" />
            </VariantSection>

            <Divider />

            {/* ─── 5: Date & Time Range (single month) ────────────────────── */}
            <VariantSection
                number={5}
                title="Date & Time Range Picker — Single Month"
                description="Start and end date+time selection. Single calendar with Start/End rows containing both date and time inputs."
                whenToUse="The user needs to define a precise time window — not just which days, but the exact hours. Filtering logs, narrowing down events, or any scenario where the boundaries of the range need minute-level precision. Time stays inside the dialog so everything is done in one flow."
            >
                <DateTimeRangePicker label="Date and time" singleMonth />
            </VariantSection>

            <Divider />

            {/* ─── 6: Date & Time Range (dual month) ──────────────────────── */}
            <VariantSection
                number={6}
                title="Date & Time Range Picker — Dual Month"
                description="Desktop layout with preset sidebar, dual calendar, Start/End date+time on one row, and Clear + Cancel/Apply."
                whenToUse="The desktop version of the time range picker. Two months visible for cross-month selections, presets for quick access, and all date+time inputs visible at once. Use whenever precise time windows are needed and the user has a full-width screen."
            >
                <DateTimeRangePicker label="Date and time" />
            </VariantSection>

            <Divider />

            {/* ─── Design Decisions ────────────────────────────────────────── */}
            <div className="w-full">
                <h2 className="mb-4 text-lg font-semibold text-primary">Design Decisions</h2>
                <SummaryTable />
            </div>

            <div className="h-16" />
        </div>
    );
};
