"use client";

import { useContext } from "react";
import type { DateInputProps as AriaDateInputProps } from "react-aria-components";
import {
    CalendarStateContext as AriaCalendarStateContext,
    DateInput as AriaDateInput,
    DateSegment as AriaDateSegment,
    RangeCalendarStateContext as AriaRangeCalendarStateContext,
} from "react-aria-components";
import { cx } from "@/utils/cx";

interface DateInputProps extends Omit<AriaDateInputProps, "children"> {
    /** Text shown when no date is selected. @default "Select date" */
    placeholder?: string;
}

const DateInputInner = ({ placeholder = "Select date", className, ...props }: DateInputProps) => {
    const calendarState = useContext(AriaCalendarStateContext);
    const rangeCalendarState = useContext(AriaRangeCalendarStateContext);

    const hasValue = calendarState?.value != null || rangeCalendarState?.value != null;

    return (
        <div className={cx("relative", typeof className === "string" && className)}>
            <AriaDateInput
                {...props}
                className="flex rounded-lg bg-primary px-2.5 py-2 text-md shadow-xs ring-1 ring-primary ring-inset focus-within:ring-2 focus-within:ring-brand"
            >
                {(segment) => (
                    <AriaDateSegment
                        segment={segment}
                        className={cx(
                            "rounded px-0.5 tabular-nums caret-transparent focus:bg-brand-solid focus:font-medium focus:text-white focus:outline-hidden",
                            hasValue ? "text-primary" : "text-transparent focus:text-white",
                            segment.isPlaceholder && hasValue && "text-placeholder uppercase",
                            segment.type === "literal" && hasValue && "text-fg-quaternary",
                        )}
                    />
                )}
            </AriaDateInput>
            {!hasValue && (
                <span className="pointer-events-none absolute inset-0 flex items-center px-2.5 text-md text-placeholder">
                    {placeholder}
                </span>
            )}
        </div>
    );
};

export const DateInput = DateInputInner;
