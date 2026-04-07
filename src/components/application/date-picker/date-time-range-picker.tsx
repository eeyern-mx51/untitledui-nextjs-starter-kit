"use client";

import { useMemo, useState, useCallback } from "react";
import {
    CalendarDate,
    CalendarDateTime,
    endOfMonth,
    endOfWeek,
    getLocalTimeZone,
    startOfMonth,
    startOfWeek,
    today,
    Time,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "@untitledui/icons";
import { useDateFormatter } from "react-aria";
import type { DateRangePickerProps as AriaDateRangePickerProps, DateValue, TimeValue } from "react-aria-components";
import {
    DateRangePicker as AriaDateRangePicker,
    Dialog as AriaDialog,
    Group as AriaGroup,
    Popover as AriaPopover,
    useLocale,
} from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { DateInput } from "./date-input";
import { RangeCalendar } from "./range-calendar";
import { RangePresetButton } from "./range-preset";
import { TimeInput } from "./time-input";

const now = today(getLocalTimeZone());
const highlightedDates = [now];

interface DateTimeRange {
    start: CalendarDateTime;
    end: CalendarDateTime;
}

interface DateTimeRangePickerProps extends Omit<AriaDateRangePickerProps<DateValue>, "value" | "defaultValue" | "onChange"> {
    /** Label displayed above the trigger button. */
    label?: string;
    /** The controlled value of the date time range picker. */
    value?: DateTimeRange | null;
    /** The default value (uncontrolled). */
    defaultValue?: DateTimeRange | null;
    /** Called when the value changes. */
    onChange?: (value: DateTimeRange | null) => void;
    /** Force single month view even on desktop. @default false */
    singleMonth?: boolean;
    /** The function to call when the apply button is clicked. */
    onApply?: () => void;
    /** The function to call when the cancel button is clicked. */
    onCancel?: () => void;
}

/** Helper to convert a CalendarDate to a CalendarDateTime at a given hour:minute */
const toDateTime = (date: DateValue, hour = 0, minute = 0): CalendarDateTime => {
    return new CalendarDateTime(date.year, date.month, date.day, hour, minute);
};

export const DateTimeRangePicker = ({ label, value, defaultValue, onChange, singleMonth = false, onApply, onCancel, ...props }: DateTimeRangePickerProps) => {
    const { locale } = useLocale();
    const dateFormatter = useDateFormatter({
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const timeFormatter = useDateFormatter({
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const [internalValue, setInternalValue] = useState<DateTimeRange | null>(defaultValue ?? null);
    const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);

    const dateTimeValue = value !== undefined ? value : internalValue;
    const setDateTimeValue = useCallback(
        (newValue: DateTimeRange | null) => {
            if (value === undefined) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);
        },
        [value, onChange],
    );

    const formattedStart = dateTimeValue?.start
        ? `${dateFormatter.format(dateTimeValue.start.toDate(getLocalTimeZone()))} ${timeFormatter.format(dateTimeValue.start.toDate(getLocalTimeZone()))}`
        : undefined;
    const formattedEnd = dateTimeValue?.end
        ? `${dateFormatter.format(dateTimeValue.end.toDate(getLocalTimeZone()))} ${timeFormatter.format(dateTimeValue.end.toDate(getLocalTimeZone()))}`
        : undefined;

    // Extract date-only range for the calendar
    const calendarValue = dateTimeValue
        ? {
              start: new CalendarDate(dateTimeValue.start.year, dateTimeValue.start.month, dateTimeValue.start.day) as DateValue,
              end: new CalendarDate(dateTimeValue.end.year, dateTimeValue.end.month, dateTimeValue.end.day) as DateValue,
          }
        : null;

    // When calendar range changes, preserve existing times
    const handleCalendarChange = (newRange: { start: DateValue; end: DateValue } | null) => {
        if (!newRange) {
            setDateTimeValue(null);
            return;
        }
        const startHour = dateTimeValue?.start?.hour ?? 0;
        const startMinute = dateTimeValue?.start?.minute ?? 0;
        const endHour = dateTimeValue?.end?.hour ?? 23;
        const endMinute = dateTimeValue?.end?.minute ?? 59;

        setDateTimeValue({
            start: toDateTime(newRange.start, startHour, startMinute),
            end: toDateTime(newRange.end, endHour, endMinute),
        });
    };

    const handleStartTimeChange = (newTime: TimeValue | null) => {
        if (!newTime || !dateTimeValue) return;
        setDateTimeValue({
            ...dateTimeValue,
            start: dateTimeValue.start.set({ hour: newTime.hour, minute: newTime.minute }) as CalendarDateTime,
        });
    };

    const handleEndTimeChange = (newTime: TimeValue | null) => {
        if (!newTime || !dateTimeValue) return;
        setDateTimeValue({
            ...dateTimeValue,
            end: dateTimeValue.end.set({ hour: newTime.hour, minute: newTime.minute }) as CalendarDateTime,
        });
    };

    const handleClear = () => {
        setDateTimeValue(null);
    };

    const startTimeValue = dateTimeValue?.start ? new Time(dateTimeValue.start.hour, dateTimeValue.start.minute) : null;
    const endTimeValue = dateTimeValue?.end ? new Time(dateTimeValue.end.hour, dateTimeValue.end.minute) : null;

    const presets = useMemo(
        () => ({
            today: { label: "Today", value: { start: now, end: now } },
            yesterday: { label: "Yesterday", value: { start: now.subtract({ days: 1 }), end: now.subtract({ days: 1 }) } },
            thisWeek: { label: "This week", value: { start: startOfWeek(now, locale), end: endOfWeek(now, locale) } },
            lastWeek: {
                label: "Last week",
                value: {
                    start: startOfWeek(now, locale).subtract({ weeks: 1 }),
                    end: endOfWeek(now, locale).subtract({ weeks: 1 }),
                },
            },
            thisMonth: { label: "This month", value: { start: startOfMonth(now), end: endOfMonth(now) } },
            lastMonth: {
                label: "Last month",
                value: {
                    start: startOfMonth(now).subtract({ months: 1 }),
                    end: endOfMonth(now).subtract({ months: 1 }),
                },
            },
            thisYear: { label: "This year", value: { start: startOfMonth(now.set({ month: 1 })), end: endOfMonth(now.set({ month: 12 })) } },
            lastYear: {
                label: "Last year",
                value: {
                    start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
                    end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
                },
            },
            allTime: {
                label: "All time",
                value: {
                    start: now.set({ year: 2000, month: 1, day: 1 }),
                    end: now,
                },
            },
        }),
        [locale],
    );

    // When a preset is selected, set times to start-of-day / end-of-day
    const handlePresetClick = (preset: { start: DateValue; end: DateValue }) => {
        const newValue: DateTimeRange = {
            start: toDateTime(preset.start, 0, 0),
            end: toDateTime(preset.end, 23, 59),
        };
        setDateTimeValue(newValue);
        setFocusedValue(preset.start);
    };

    return (
        <div className="flex flex-col gap-1.5">
            {label && <label className="text-sm font-medium text-secondary">{label}</label>}
            <AriaDateRangePicker
                aria-label="Date and time range picker"
                shouldCloseOnSelect={false}
                {...props}
                value={calendarValue}
                onChange={handleCalendarChange}
            >
                <AriaGroup>
                    <Button size="md" color="secondary" iconLeading={CalendarIcon}>
                        {!dateTimeValue ? (
                            <span className="text-placeholder">Select date/time range</span>
                        ) : (
                            `${formattedStart} – ${formattedEnd}`
                        )}
                    </Button>
                </AriaGroup>
                <AriaPopover
                    placement="bottom start"
                    offset={8}
                    className={({ isEntering, isExiting }) =>
                        cx(
                            "origin-(--trigger-anchor-point) will-change-transform",
                            isEntering &&
                                "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                            isExiting &&
                                "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                        )
                    }
                >
                    <AriaDialog className="flex rounded-2xl bg-primary shadow-xl ring ring-secondary_alt focus:outline-hidden">
                        {({ close }) => (
                            <>
                                {/* Desktop preset sidebar — only for dual month view */}
                                <div className={cx("hidden w-38 flex-col gap-0.5 border-r border-solid border-secondary p-3", !singleMonth && "lg:flex")}>
                                    {Object.values(presets).map((preset) => (
                                        <RangePresetButton
                                            key={preset.label}
                                            value={preset.value}
                                            onClick={() => handlePresetClick(preset.value)}
                                        >
                                            {preset.label}
                                        </RangePresetButton>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <RangeCalendar
                                        focusedValue={focusedValue}
                                        onFocusChange={setFocusedValue}
                                        highlightedDates={highlightedDates}
                                        singleMonth={singleMonth}
                                        presets={{
                                            lastWeek: presets.lastWeek,
                                            lastMonth: presets.lastMonth,
                                            lastYear: presets.lastYear,
                                        }}
                                    />

                                    {/* Single month footer: Start/End rows with date+time, then Cancel/Apply */}
                                    {singleMonth && (
                                        <>
                                            <div className="flex flex-col gap-3 border-t border-secondary px-4 pt-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-10 text-sm font-semibold text-brand-secondary">Start</span>
                                                    <DateInput slot="start" className="flex-1" />
                                                    <TimeInput
                                                        aria-label="Start time"
                                                        value={startTimeValue}
                                                        onChange={handleStartTimeChange}
                                                        className="w-[4.5rem]"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="w-10 text-sm font-semibold text-brand-secondary">End</span>
                                                    <DateInput slot="end" className="flex-1" />
                                                    <TimeInput
                                                        aria-label="End time"
                                                        value={endTimeValue}
                                                        onChange={handleEndTimeChange}
                                                        className="w-[4.5rem]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 p-4">
                                                <Button
                                                    slot={null}
                                                    size="md"
                                                    color="link-gray"
                                                    onClick={handleClear}
                                                >
                                                    Clear
                                                </Button>
                                                <div className="flex gap-3">
                                                    <Button
                                                        size="md"
                                                        color="secondary"
                                                        onClick={() => {
                                                            onCancel?.();
                                                            close();
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        size="md"
                                                        color="primary"
                                                        onClick={() => {
                                                            onApply?.();
                                                            close();
                                                        }}
                                                    >
                                                        Apply
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Dual month footer: Start/End on one row, then Clear + Cancel/Apply */}
                                    {!singleMonth && (
                                        <>
                                            {/* Start + End on a single horizontal row — visible on desktop */}
                                            <div className="hidden items-center gap-4 border-t border-secondary px-4 pt-4 lg:flex">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-brand-secondary">Start</span>
                                                    <DateInput slot="start" className="w-36" />
                                                    <TimeInput
                                                        aria-label="Start time"
                                                        value={startTimeValue}
                                                        onChange={handleStartTimeChange}
                                                        className="w-[4.5rem]"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-brand-secondary">End</span>
                                                    <DateInput slot="end" className="w-36" />
                                                    <TimeInput
                                                        aria-label="End time"
                                                        value={endTimeValue}
                                                        onChange={handleEndTimeChange}
                                                        className="w-[4.5rem]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 border-t border-secondary p-4 lg:border-t-0">
                                                <Button
                                                    slot={null}
                                                    size="md"
                                                    color="link-gray"
                                                    className="hidden lg:flex"
                                                    onClick={handleClear}
                                                >
                                                    Clear
                                                </Button>
                                                <div className="grid w-full grid-cols-2 gap-3 lg:flex lg:w-auto">
                                                    <Button
                                                        size="md"
                                                        color="secondary"
                                                        onClick={() => {
                                                            onCancel?.();
                                                            close();
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        size="md"
                                                        color="primary"
                                                        onClick={() => {
                                                            onApply?.();
                                                            close();
                                                        }}
                                                    >
                                                        Apply
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </AriaDialog>
                </AriaPopover>
            </AriaDateRangePicker>
        </div>
    );
};
