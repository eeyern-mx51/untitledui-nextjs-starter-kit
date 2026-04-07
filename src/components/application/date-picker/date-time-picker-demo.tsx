"use client";

import type { ReactNode } from "react";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";
import { DateTimePicker } from "./date-time-picker";
import { DateTimeRangePicker } from "./date-time-range-picker";

/* ─── Layout helpers ──────────────────────────────────────────────────── */

const Divider = () => <div className="h-px w-full bg-border-secondary" />;

const Tag = ({ variant = "default", children }: { variant?: "default" | "new" | "changed"; children: ReactNode }) => {
    const colors = {
        default: "bg-bg-brand-secondary text-brand-secondary",
        new: "bg-bg-success-secondary text-success-primary",
        changed: "bg-bg-warning-secondary text-warning-primary",
    };
    return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colors[variant]}`}>{children}</span>;
};

const UxNote = ({ children }: { children: ReactNode }) => (
    <div className="mt-4 rounded-lg border border-[#FEDF89] bg-[#FFFAEB] px-4 py-3 text-sm leading-relaxed text-tertiary">
        {children}
    </div>
);

const Section = ({
    number,
    title,
    description,
    children,
}: {
    number: number;
    title: string;
    description: string;
    children: ReactNode;
}) => (
    <div className="flex w-full flex-col gap-4">
        <div>
            <h2 className="text-lg font-semibold text-primary">
                {number}. {title}
            </h2>
            <p className="mt-1 text-sm text-tertiary">{description}</p>
        </div>
        {children}
    </div>
);

const Card = ({ title, tags, description, children }: { title: string; tags?: ReactNode; description: string; children: ReactNode }) => (
    <div className="flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-6">
        <div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-secondary">{title}</span>
                {tags}
            </div>
            <p className="mt-1 text-xs text-tertiary">{description}</p>
        </div>
        {children}
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
                <h1 className="text-display-xs font-semibold text-primary">Date & Time Pickers — Design Review</h1>
                <p className="mt-2 text-md text-tertiary">
                    Proposed patterns for payments & settlement filtering. All interactions start from a button trigger.
                </p>
            </div>

            {/* ═══════════════════ PATTERN 1: Single Date ═══════════════════ */}
            <h3 className="text-md font-semibold uppercase tracking-wide text-brand-secondary">Pattern 1 — Single Date Picker</h3>

            <Section number={1} title="Single Date Picker" description="Single date selection with label and Cancel/Apply actions.">
                <div className="flex flex-wrap gap-8">
                    <Card title="Default / Empty State" tags={<Tag variant="new">New</Tag>} description="Label above button, button triggers calendar.">
                        <DatePicker label="Settlement date" />
                        <UxNote>
                            <strong className="text-primary">UX:</strong> Button is the sole trigger — no inline text input. The label provides context like
                            "Settlement date", "Payment date", etc. This reduces errors vs free-text input.
                        </UxNote>
                    </Card>

                    <Card title="Dialog Open" tags={<Tag variant="new">New</Tag>} description="Click the button above to open. Date input + Today preset for keyboard users.">
                        <p className="text-xs text-tertiary italic">Click the "Select date" button to see the dialog in action.</p>
                        <UxNote>
                            <strong className="text-primary">UX:</strong> The date input row inside the dialog allows keyboard entry for accessibility. The
                            Today preset jumps to the current date.
                        </UxNote>
                    </Card>
                </div>
            </Section>

            <Divider />

            {/* ═══════════════════ PATTERN 2: Single Date & Time ═══════════ */}
            <h3 className="text-md font-semibold uppercase tracking-wide text-brand-secondary">Pattern 2 — Single Date & Time (Decoupled)</h3>

            <Section number={2} title="Date & Time Picker" description="Decoupled date and time as two separate fields side by side.">
                <div className="flex flex-wrap gap-8">
                    <Card
                        title="Two Separate Fields"
                        tags={<Tag variant="changed">Changed</Tag>}
                        description="Date button + time input are independent fields side by side."
                    >
                        <DateTimePicker label="Payment date" timeLabel="Time" />
                        <UxNote>
                            <strong className="text-primary">UX:</strong> Date and time are <strong className="text-primary">decoupled</strong>. The date
                            button opens a calendar (date-only, no time inside). The time input is a standard input field — each has its own label. This keeps
                            the calendar dialog simple and allows the time to be optional or pre-filled independently.
                        </UxNote>
                    </Card>

                    <Card title="Empty State" description="Both fields with placeholders — time shows —:— when empty.">
                        <DateTimePicker label="Payment date" timeLabel="Time" />
                        <UxNote>
                            <strong className="text-primary">UX:</strong> When both are empty, each shows its own placeholder independently. They validate
                            independently too — you could require one without the other.
                        </UxNote>
                    </Card>
                </div>
            </Section>

            <Divider />

            {/* ═══════════════════ PATTERN 3: Date Range ═══════════════════ */}
            <h3 className="text-md font-semibold uppercase tracking-wide text-brand-secondary">Pattern 3 — Date Range Picker</h3>

            <Section
                number={3}
                title="Date Range Picker (single month)"
                description="Date range with preset links, Start/End date inputs, and Cancel/Apply."
            >
                <Card title="Single Month View" tags={<Tag variant="new">New</Tag>} description="Mobile / narrow viewport layout with preset row and stacked Start/End inputs.">
                    <DateRangePicker label="Settlement period" singleMonth />
                    <UxNote>
                        <strong className="text-primary">UX:</strong> Preset links (Last week, Last month, Last year) appear as a horizontal row above the
                        calendar on mobile. Start/End date inputs in the footer allow keyboard-driven date entry.
                    </UxNote>
                </Card>
            </Section>

            <Section
                number={4}
                title="Date Range Picker (dual month)"
                description="Date range with preset sidebar, dual calendar, Clear link, and footer date inputs."
            >
                <Card
                    title="Desktop / Dual Month View"
                    tags={<Tag variant="new">New</Tag>}
                    description="Preset sidebar on the left, two calendar months, Clear + date inputs + Cancel/Apply in footer."
                >
                    <DateRangePicker label="Settlement period" />
                    <UxNote>
                        <strong className="text-primary">UX:</strong> The preset sidebar (Today through All time) appears on desktop to the left.{" "}
                        <strong className="text-primary">Clear</strong> link in the footer resets the selection but keeps the dialog open. Date inputs in the
                        footer row allow keyboard entry. No time inputs here — this is date-only.
                    </UxNote>
                </Card>
            </Section>

            <Divider />

            {/* ═══════════════════ PATTERN 4: Date & Time Range ═════════════ */}
            <h3 className="text-md font-semibold uppercase tracking-wide text-brand-secondary">Pattern 4 — Date & Time Range Picker</h3>

            <Section
                number={5}
                title="Date & Time Range Picker (single month)"
                description="Date and time range with Start/End rows including time inputs."
            >
                <Card
                    title="Single Month View"
                    tags={<Tag>Kept</Tag>}
                    description="Time stays inside the dialog for range pickers — minimise clicks."
                >
                    <DateTimeRangePicker label="Transaction period" singleMonth />
                    <UxNote>
                        <strong className="text-primary">UX:</strong> For range pickers, time{" "}
                        <strong className="text-primary">stays inside the dialog</strong> to minimise clicks. The user selects start date, end date, adjusts
                        start time and end time, then hits Apply — all in one flow. Defaults: start time 00:00, end time 23:59 (full day range).
                    </UxNote>
                </Card>
            </Section>

            <Section
                number={6}
                title="Date & Time Range Picker (dual month)"
                description="Date and time range with preset sidebar, dual calendar, Start/End date+time rows, and Clear link."
            >
                <Card
                    title="Desktop / Dual Month View"
                    tags={<Tag variant="changed">Changed</Tag>}
                    description="Preset sidebar, dual calendar, Start/End date+time in one row, Clear + Cancel/Apply below."
                >
                    <DateTimeRangePicker label="Transaction period" />
                    <UxNote>
                        <strong className="text-primary">UX:</strong> The desktop layout places Start and End on a{" "}
                        <strong className="text-primary">single horizontal row</strong>:{" "}
                        <code className="rounded bg-secondary px-1 py-0.5 text-xs">Start [date] [time] &nbsp; End [date] [time]</code>. Clear resets both
                        dates and times. Presets set start time to 00:00 and end time to 23:59 by default.
                    </UxNote>
                </Card>
            </Section>

            <Divider />

            {/* ═══════════════════ SUMMARY TABLE ═══════════════════════════ */}
            <div className="w-full">
                <h3 className="mb-4 text-md font-semibold uppercase tracking-wide text-brand-secondary">Design Decisions Summary</h3>
                <SummaryTable />
            </div>

            {/* Spacer */}
            <div className="h-16" />
        </div>
    );
};
