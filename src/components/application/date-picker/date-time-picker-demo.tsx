"use client";

import { useState } from "react";
import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { DateTimePicker } from "./date-time-picker";
import { DateTimeRangePicker } from "./date-time-range-picker";

const now = new Date();
const defaultDateTime = new CalendarDateTime(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes());

export const DateTimePickerDemo = () => {
    const [singleValue, setSingleValue] = useState<CalendarDateTime | null>(defaultDateTime);
    const [rangeValue, setRangeValue] = useState<{
        start: CalendarDateTime;
        end: CalendarDateTime;
    } | null>({
        start: defaultDateTime,
        end: new CalendarDateTime(now.getFullYear(), now.getMonth() + 1, now.getDate() + 3, 18, 0),
    });

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-12 p-8">
            <div className="flex w-full max-w-xl flex-col gap-4">
                <h2 className="text-lg font-semibold text-primary">DateTimePicker</h2>
                <p className="text-sm text-tertiary">Single date and time selection with a 24-hour format.</p>
                <DateTimePicker
                    value={singleValue}
                    onChange={setSingleValue}
                    onApply={() => console.log("Applied:", singleValue?.toString())}
                    onCancel={() => console.log("Cancelled")}
                />
                {singleValue && (
                    <p className="text-sm text-tertiary">
                        Selected: {singleValue.toDate(getLocalTimeZone()).toLocaleString("en-US", { hour12: false })}
                    </p>
                )}
            </div>

            <div className="h-px w-full max-w-xl bg-border-secondary" />

            <div className="flex w-full max-w-xl flex-col gap-4">
                <h2 className="text-lg font-semibold text-primary">DateTimeRangePicker</h2>
                <p className="text-sm text-tertiary">Select a start and end date with individual time inputs for each.</p>
                <DateTimeRangePicker
                    value={rangeValue}
                    onChange={setRangeValue}
                    onApply={() => console.log("Range applied:", rangeValue?.start.toString(), "–", rangeValue?.end.toString())}
                    onCancel={() => console.log("Range cancelled")}
                />
                {rangeValue && (
                    <p className="text-sm text-tertiary">
                        Range: {rangeValue.start.toDate(getLocalTimeZone()).toLocaleString("en-US", { hour12: false })} –{" "}
                        {rangeValue.end.toDate(getLocalTimeZone()).toLocaleString("en-US", { hour12: false })}
                    </p>
                )}
            </div>
        </div>
    );
};
