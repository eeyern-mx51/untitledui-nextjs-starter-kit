"use client";

import { useState, useCallback } from "react";
import { CalendarDateTime, getLocalTimeZone, today, Time, type CalendarDate } from "@internationalized/date";
import { Calendar as CalendarIcon, Clock } from "@untitledui/icons";
import { useDateFormatter } from "react-aria";
import type { DatePickerProps as AriaDatePickerProps, DateValue, TimeValue } from "react-aria-components";
import { DatePicker as AriaDatePicker, Dialog as AriaDialog, Group as AriaGroup, Popover as AriaPopover } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { Calendar } from "./calendar";
import { TimeInput } from "./time-input";

const highlightedDates = [today(getLocalTimeZone())];

interface DateTimePickerProps extends Omit<AriaDatePickerProps<DateValue>, "value" | "defaultValue" | "onChange"> {
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

export const DateTimePicker = ({ value, defaultValue, onChange, onApply, onCancel, ...props }: DateTimePickerProps) => {
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

    const formatter = useDateFormatter({
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const formattedDate = dateTimeValue ? formatter.format(dateTimeValue.toDate(getLocalTimeZone())) : "Select date & time";

    // Extract the date portion for the calendar
    const calendarValue: CalendarDate | null = dateTimeValue
        ? (dateTimeValue.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) as unknown as CalendarDate)
        : null;

    // Handle calendar date selection: preserve time when date changes
    const handleCalendarChange = (newDate: DateValue | null) => {
        if (!newDate) {
            setDateTimeValue(null);
            return;
        }
        const hour = dateTimeValue?.hour ?? 0;
        const minute = dateTimeValue?.minute ?? 0;
        const newDateTime = new CalendarDateTime(newDate.year, newDate.month, newDate.day, hour, minute);
        setDateTimeValue(newDateTime);
    };

    // Handle time change: preserve date when time changes
    const handleTimeChange = (newTime: TimeValue | null) => {
        if (!newTime || !dateTimeValue) return;
        const newDateTime = dateTimeValue.set({ hour: newTime.hour, minute: newTime.minute });
        setDateTimeValue(newDateTime as CalendarDateTime);
    };

    // Extract Time value for the TimeInput
    const timeValue = dateTimeValue ? new Time(dateTimeValue.hour, dateTimeValue.minute) : null;

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
                    {formattedDate}
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
                <AriaDialog className="rounded-2xl bg-primary shadow-xl ring ring-secondary_alt">
                    {({ close }) => (
                        <>
                            <div className="flex px-6 py-5">
                                <Calendar highlightedDates={highlightedDates} />
                            </div>
                            <div className="flex items-center gap-2 border-t border-secondary px-6 py-3">
                                <Clock className="size-5 text-fg-quaternary" />
                                <span className="text-sm font-medium text-secondary">Time</span>
                                <TimeInput
                                    aria-label="Select time"
                                    value={timeValue}
                                    onChange={handleTimeChange}
                                    className="ml-auto w-[4.5rem]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3 border-t border-secondary p-4">
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
                        </>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDatePicker>
    );
};
