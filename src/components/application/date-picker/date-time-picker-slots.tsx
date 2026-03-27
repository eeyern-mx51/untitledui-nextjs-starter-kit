"use client";

import { useState, useCallback } from "react";
import { CalendarDate, CalendarDateTime, getLocalTimeZone, today } from "@internationalized/date";
import { Calendar as CalendarIcon, Clock } from "@untitledui/icons";
import { useDateFormatter } from "react-aria";
import type { DatePickerProps as AriaDatePickerProps, DateValue, Key } from "react-aria-components";
import { DatePicker as AriaDatePicker, Dialog as AriaDialog, Group as AriaGroup, Popover as AriaPopover } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { cx } from "@/utils/cx";
import { Calendar } from "./calendar";
import { DateInput } from "./date-input";

const highlightedDates = [today(getLocalTimeZone())];

/** 27 slots = 9:00 AM to 10:00 PM in 30-min intervals */
const TIME_SLOTS = Array.from({ length: 27 }, (_, i) => {
    const totalMinutes = 9 * 60 + i * 30;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const period = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    const label = `${h12}:${String(minute).padStart(2, "0")} ${period}`;
    return { id: `${hour}:${String(minute).padStart(2, "0")}`, hour, minute, label };
});

interface DateTimePickerSlotsProps extends Omit<AriaDatePickerProps<DateValue>, "value" | "defaultValue" | "onChange"> {
    /** The controlled value of the date time picker. */
    value?: CalendarDateTime | null;
    /** The default value of the date time picker (uncontrolled). */
    defaultValue?: CalendarDateTime | null;
    /** Called when the value changes. */
    onChange?: (value: CalendarDateTime | null) => void;
    /** The function to call when the apply button is clicked. */
    onApply?: () => void;
    /** The function to call when the cancel button is clicked. */
    onCancel?: () => void;
}

export const DateTimePickerSlots = ({ value, defaultValue, onChange, onApply, onCancel, ...props }: DateTimePickerSlotsProps) => {
    const [internalValue, setInternalValue] = useState<CalendarDateTime | null>(defaultValue ?? null);

    const dateTimeValue = value !== undefined ? value : internalValue;
    const setDateTimeValue = useCallback(
        (newValue: CalendarDateTime | null) => {
            if (value === undefined) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);
        },
        [value, onChange],
    );

    const dateFormatter = useDateFormatter({ month: "short", day: "numeric", year: "numeric" });
    const timeFormatter = useDateFormatter({ hour: "numeric", minute: "numeric" });

    // Extract date-only value for the calendar (must be CalendarDate, not CalendarDateTime, so DateInput only shows date segments)
    const calendarValue: CalendarDate | null = dateTimeValue
        ? new CalendarDate(dateTimeValue.year, dateTimeValue.month, dateTimeValue.day)
        : null;

    // Handle calendar date selection: preserve time when date changes
    const handleCalendarChange = (newDate: DateValue | null) => {
        if (!newDate) {
            setDateTimeValue(null);
            return;
        }
        const hour = dateTimeValue?.hour ?? 0;
        const minute = dateTimeValue?.minute ?? 0;
        setDateTimeValue(new CalendarDateTime(newDate.year, newDate.month, newDate.day, hour, minute));
    };

    // Handle time slot selection: preserve date when time changes
    const handleTimeClick = (key: Key | null) => {
        const slot = TIME_SLOTS.find((s) => s.id === key);
        if (!slot) return;

        if (dateTimeValue) {
            setDateTimeValue(dateTimeValue.set({ hour: slot.hour, minute: slot.minute }) as CalendarDateTime);
        } else {
            // No date selected yet — default to today
            const t = today(getLocalTimeZone());
            setDateTimeValue(new CalendarDateTime(t.year, t.month, t.day, slot.hour, slot.minute));
        }
    };

    const selectedTimeKey =
        dateTimeValue ? `${dateTimeValue.hour}:${String(dateTimeValue.minute).padStart(2, "0")}` : undefined;

    return (
        <AriaDatePicker
            aria-label="Date and time picker"
            shouldCloseOnSelect={false}
            {...props}
            value={calendarValue}
            onChange={handleCalendarChange}
        >
            <AriaGroup>
                <Button size="md" color="secondary" iconLeading={CalendarIcon}>
                    {dateTimeValue ? (
                        <>
                            {dateFormatter.format(dateTimeValue.toDate(getLocalTimeZone()))}{" "}
                            <span className="text-quaternary">{timeFormatter.format(dateTimeValue.toDate(getLocalTimeZone()))}</span>
                        </>
                    ) : (
                        "Select date & time"
                    )}
                </Button>
            </AriaGroup>
            <AriaPopover
                offset={8}
                placement="bottom right"
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
                <AriaDialog className="rounded-2xl bg-primary shadow-xl ring ring-secondary_alt focus:outline-hidden">
                    {({ close }) => (
                        <>
                            <div className="flex">
                                <div className="flex px-6 py-5">
                                    <Calendar highlightedDates={highlightedDates}>
                                        {/* Mobile: time select dropdown below calendar grid */}
                                        <div className="md:hidden">
                                            <Select
                                                aria-label="Time"
                                                size="sm"
                                                placeholder="Time"
                                                placeholderIcon={Clock}
                                                items={TIME_SLOTS}
                                                selectedKey={selectedTimeKey}
                                                onSelectionChange={handleTimeClick}
                                            >
                                                {(slot) => (
                                                    <Select.Item id={slot.id} icon={Clock}>
                                                        {slot.label}
                                                    </Select.Item>
                                                )}
                                            </Select>
                                        </div>
                                    </Calendar>
                                </div>

                                {/* Desktop: scrollable time slots side panel */}
                                <div className="relative hidden min-h-0 w-50 flex-col gap-4 md:flex">
                                    <div className="px-5 pt-6.5 text-center text-sm font-semibold text-fg-secondary">Available times</div>
                                    <div className="relative h-full w-full">
                                        <ul className="absolute inset-0 flex min-h-0 flex-col gap-1.5 overflow-y-auto mask-b-from-80% mask-b-to-98% px-5 pb-5">
                                            {TIME_SLOTS.map((slot) => {
                                                const isSelected =
                                                    dateTimeValue &&
                                                    dateTimeValue.hour === slot.hour &&
                                                    dateTimeValue.minute === slot.minute;
                                                return (
                                                    <li key={slot.id} className="flex-1">
                                                        <Button
                                                            slot={null}
                                                            size="sm"
                                                            color="secondary"
                                                            className={cx("w-full", isSelected && "bg-primary_hover")}
                                                            onClick={() => handleTimeClick(slot.id)}
                                                        >
                                                            {slot.label}
                                                        </Button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Footer: date input (desktop only) + cancel/apply */}
                            <div className="flex gap-3 border-t border-secondary p-4">
                                <div className="mr-auto hidden gap-3 md:flex">
                                    <DateInput className="flex-1" />
                                </div>

                                <Button
                                    slot={null}
                                    size="sm"
                                    color="secondary"
                                    className="max-md:flex-1"
                                    onClick={() => {
                                        onCancel?.();
                                        close();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    slot={null}
                                    size="sm"
                                    color="primary"
                                    className="max-md:flex-1"
                                    onClick={() => {
                                        onApply?.();
                                        close();
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                        </>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDatePicker>
    );
};
