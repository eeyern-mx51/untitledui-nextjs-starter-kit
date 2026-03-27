"use client";

import { useState } from "react";
import { getLocalTimeZone, toCalendarDateTime, today } from "@internationalized/date";
import { Calendar as CalendarIcon, Clock } from "@untitledui/icons";
import { useDateFormatter } from "react-aria";
import type { DateValue, Key } from "react-aria-components";
import {
    DateField as AriaDateField,
    DatePicker as AriaDatePicker,
    Dialog as AriaDialog,
    Group as AriaGroup,
    Popover as AriaPopover,
} from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { InputDateBase } from "@/components/base/input/input-date";
import { Select } from "@/components/base/select/select";
import { cx } from "@/utils/cx";
import { Calendar } from "./calendar";

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

const highlightedDates = [today(getLocalTimeZone())];

interface DateTimePickerSlotsProps {
    /** The function to call when the apply button is clicked. */
    onApply?: () => void;
    /** The function to call when the cancel button is clicked. */
    onCancel?: () => void;
}

export const DateTimePickerSlots = ({ onApply, onCancel }: DateTimePickerSlotsProps) => {
    const [value, setValue] = useState<DateValue | null>(() => toCalendarDateTime(today(getLocalTimeZone())));
    const [focusedValue, setFocusedValue] = useState<DateValue | null>(() => toCalendarDateTime(today(getLocalTimeZone())));

    const dateFormatter = useDateFormatter({ month: "short", day: "numeric", year: "numeric" });
    const timeFormatter = useDateFormatter({ hour: "numeric", minute: "numeric" });

    const handleTodayClick = () => {
        const t = today(getLocalTimeZone());
        const date = value && "hour" in value ? toCalendarDateTime(t).set({ hour: value.hour, minute: value.minute }) : toCalendarDateTime(t);
        setValue(date);
        setFocusedValue(date);
    };

    const handleTimeClick = (key: Key | null) => {
        const slot = TIME_SLOTS.find((s) => s.id === key);
        if (!slot) return;
        const date = value ?? toCalendarDateTime(today(getLocalTimeZone()));
        setValue(date.set({ hour: slot.hour, minute: slot.minute }));
    };

    const selectedTimeKey = value && "hour" in value ? `${value.hour}:${String(value.minute).padStart(2, "0")}` : undefined;

    return (
        <AriaDatePicker shouldCloseOnSelect={false} aria-label="Date and time picker" value={value} onChange={setValue}>
            <AriaGroup>
                <Button size="sm" color="secondary" iconLeading={CalendarIcon}>
                    {value ? (
                        <>
                            {dateFormatter.format(value.toDate(getLocalTimeZone()))}{" "}
                            <span className="text-quaternary">{timeFormatter.format(value.toDate(getLocalTimeZone()))}</span>
                        </>
                    ) : (
                        "Select date"
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
                                    <Calendar focusedValue={focusedValue} onFocusChange={setFocusedValue} highlightedDates={highlightedDates}>
                                        {/* Mobile: date field + time select inline */}
                                        <div className="flex flex-wrap gap-3 md:hidden">
                                            <div className="flex flex-1 gap-3">
                                                <AriaDateField aria-label="Date" granularity="day" className="flex-1">
                                                    <InputDateBase size="sm" className="flex-1" />
                                                </AriaDateField>
                                                <Button slot={null} size="sm" color="secondary" onClick={handleTodayClick}>
                                                    Today
                                                </Button>
                                            </div>
                                            <Select
                                                aria-label="Time"
                                                size="sm"
                                                placeholder="Time"
                                                placeholderIcon={Clock}
                                                items={TIME_SLOTS}
                                                selectedKey={selectedTimeKey}
                                                onSelectionChange={handleTimeClick}
                                                className="flex-1"
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
                                                    value && "hour" in value && value.hour === slot.hour && value.minute === slot.minute;
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

                            {/* Footer: date field (desktop), cancel/apply */}
                            <div className="flex gap-3 border-t border-secondary p-4">
                                <div className="mr-auto hidden gap-3 md:flex">
                                    <AriaDateField aria-label="Date" granularity="day" className="flex-1">
                                        <InputDateBase size="sm" />
                                    </AriaDateField>
                                    <Button slot={null} size="sm" color="secondary" onClick={handleTodayClick}>
                                        Today
                                    </Button>
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
