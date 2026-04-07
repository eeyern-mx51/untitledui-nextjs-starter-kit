"use client";

import type { ReactNode } from "react";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";
import { DateTimePicker } from "./date-time-picker";
import { DateTimeRangePicker } from "./date-time-range-picker";

/* ─── Layout helpers ──────────────────────────────────────────────────── */

const Divider = () => <div className="h-px w-full bg-border-secondary" />;

const UxNote = ({ children }: { children: ReactNode }) => (
    <div className="rounded-lg border border-[#FEDF89] bg-[#FFFAEB] px-4 py-3 text-sm leading-relaxed text-tertiary">{children}</div>
);

const UsageList = ({ items }: { items: { area: string; example: string }[] }) => (
    <div className="flex flex-col gap-2">
        {items.map((item) => (
            <div key={item.area} className="flex gap-3 text-sm">
                <span className="shrink-0 font-medium text-brand-secondary">{item.area}</span>
                <span className="text-tertiary">{item.example}</span>
            </div>
        ))}
    </div>
);

const VariantSection = ({
    number,
    title,
    description,
    usage,
    notes,
    children,
}: {
    number: number;
    title: string;
    description: string;
    usage: { area: string; example: string }[];
    notes: string;
    children: ReactNode;
}) => (
    <div className="flex w-full flex-col gap-6">
        <div>
            <h2 className="text-lg font-semibold text-primary">
                {number}. {title}
            </h2>
            <p className="mt-1 text-sm text-tertiary">{description}</p>
        </div>

        {/* Live component */}
        <div className="rounded-2xl border border-secondary bg-primary p-6">{children}</div>

        {/* Where to use it */}
        <div>
            <h3 className="mb-2 text-sm font-semibold text-secondary">Where to use in the product</h3>
            <UsageList items={usage} />
        </div>

        {/* UX note */}
        <UxNote>{notes}</UxNote>
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
                    All picker variants with usage guidance for the Support and Merchant Dashboard.
                </p>
            </div>

            {/* ─── Variant 1: Single Date ─────────────────────────────────── */}
            <VariantSection
                number={1}
                title="Date Picker"
                description="Selects a single date. Opens a calendar dialog with a date input row, Today preset, and Cancel/Apply actions."
                usage={[
                    { area: "Merchant Dashboard", example: "Settlement date filter — pick a specific payout date" },
                    { area: "Merchant Dashboard", example: "Invoice due date — set the due date when creating an invoice" },
                    { area: "Support Dashboard", example: "Incident date — log the exact date a reported issue occurred" },
                    { area: "Support Dashboard", example: "Follow-up date — schedule a callback or follow-up for a ticket" },
                ]}
                notes="Use when only a single calendar date is needed and time is irrelevant. The button trigger prevents free-text entry errors. The Today preset allows quick selection of the current date."
            >
                <DatePicker label="Settlement date" />
            </VariantSection>

            <Divider />

            {/* ─── Variant 2: Date & Time ─────────────────────────────────── */}
            <VariantSection
                number={2}
                title="Date & Time Picker"
                description="Two separate side-by-side fields — a date picker button and a standalone time input. The calendar dialog is date-only; time is entered independently."
                usage={[
                    { area: "Merchant Dashboard", example: "Scheduled payment — set the exact date and time a payment should be processed" },
                    { area: "Merchant Dashboard", example: "Promotion start — define when a discount or offer goes live" },
                    { area: "Support Dashboard", example: "Incident timestamp — record the precise date and time an issue was reported" },
                    { area: "Support Dashboard", example: "Maintenance window — set when a planned maintenance begins" },
                ]}
                notes="Use when a specific moment in time matters (not just the day). Date and time are decoupled so they can be filled independently — time can be optional or pre-filled with a default. The calendar stays simple without time controls inside it."
            >
                <DateTimePicker label="Payment date" timeLabel="Time" />
            </VariantSection>

            <Divider />

            {/* ─── Variant 3: Date Range (single month) ───────────────────── */}
            <VariantSection
                number={3}
                title="Date Range Picker (single month)"
                description="Selects a start and end date. Shows a single calendar month with preset links (Last week, Last month, Last year), stacked Start/End date inputs, and Cancel/Apply."
                usage={[
                    { area: "Merchant Dashboard", example: "Mobile transaction history — filter payments within a date range on smaller screens" },
                    { area: "Merchant Dashboard", example: "Payout period filter — narrow down settlements to a specific week or month" },
                    { area: "Support Dashboard", example: "Ticket search — find tickets created within a specific period on tablet/mobile" },
                    { area: "Support Dashboard", example: "SLA reporting — select the review period for response time metrics" },
                ]}
                notes="Use for date range selection on mobile or narrow viewports. Preset links give quick access to common ranges. Start/End inputs in the footer allow keyboard-driven date entry. No time selection — date-only."
            >
                <DateRangePicker label="Date" singleMonth />
            </VariantSection>

            <Divider />

            {/* ─── Variant 4: Date Range (dual month) ─────────────────────── */}
            <VariantSection
                number={4}
                title="Date Range Picker (dual month)"
                description="Desktop layout with a preset sidebar (Today through All time), two visible calendar months, date inputs in the footer, and a Clear link."
                usage={[
                    { area: "Merchant Dashboard", example: "Revenue reporting — select a custom date range for sales or settlement reports" },
                    { area: "Merchant Dashboard", example: "Dispute period — filter chargebacks and disputes by date range" },
                    { area: "Support Dashboard", example: "Analytics dashboard — set the time window for ticket volume, CSAT, or resolution charts" },
                    { area: "Support Dashboard", example: "Audit log — browse system events within a specific period" },
                ]}
                notes="Use on desktop when the user needs to see two months at once for easier range selection. The preset sidebar provides one-click access to common ranges. Clear resets the selection without closing the dialog."
            >
                <DateRangePicker label="Date" />
            </VariantSection>

            <Divider />

            {/* ─── Variant 5: Date & Time Range (single month) ────────────── */}
            <VariantSection
                number={5}
                title="Date & Time Range Picker (single month)"
                description="Selects a start and end date+time. Single calendar month with Start/End rows containing both date and time inputs, plus Cancel/Apply."
                usage={[
                    { area: "Merchant Dashboard", example: "Transaction search (mobile) — filter by exact datetime range to investigate a specific batch" },
                    { area: "Merchant Dashboard", example: "API log filter — narrow down webhook or API call logs to a precise time window" },
                    { area: "Support Dashboard", example: "Incident timeline (mobile) — set the exact start and end time of a service disruption" },
                    { area: "Support Dashboard", example: "Shift-based filtering — view tickets handled during a specific shift window" },
                ]}
                notes="Use when both date and time precision are needed on mobile or narrow viewports. Time stays inside the dialog to minimise clicks — the user picks dates, adjusts times, and applies all in one flow. Start defaults to 00:00, end to 23:59."
            >
                <DateTimeRangePicker label="Date and time" singleMonth />
            </VariantSection>

            <Divider />

            {/* ─── Variant 6: Date & Time Range (dual month) ──────────────── */}
            <VariantSection
                number={6}
                title="Date & Time Range Picker (dual month)"
                description="Desktop layout with a preset sidebar, dual calendar, a single-row Start/End with date+time inputs, and Clear + Cancel/Apply below."
                usage={[
                    { area: "Merchant Dashboard", example: "Settlement reconciliation — match transactions to bank deposits with precise datetime ranges" },
                    { area: "Merchant Dashboard", example: "Fraud investigation — examine transaction patterns within an exact time window" },
                    { area: "Support Dashboard", example: "Escalation analysis — review tickets escalated during a specific datetime range" },
                    { area: "Support Dashboard", example: "Outage post-mortem — define the precise start and end of an incident for reporting" },
                ]}
                notes="Use on desktop when both date range and time precision are critical. The preset sidebar offers quick selections with start time 00:00 and end time 23:59 by default. Start and End sit on a single horizontal row to make the most of the wider viewport."
            >
                <DateTimeRangePicker label="Date and time" />
            </VariantSection>

            <Divider />

            {/* ─── Design Decisions Summary ────────────────────────────────── */}
            <div className="w-full">
                <h2 className="mb-4 text-lg font-semibold text-primary">Design Decisions</h2>
                <SummaryTable />
            </div>

            <div className="h-16" />
        </div>
    );
};
