"use client";

import type { TimeFieldProps as AriaTimeFieldProps, TimeValue } from "react-aria-components";
import { DateSegment as AriaDateSegment, TimeField as AriaTimeField, DateInput as AriaDateInput } from "react-aria-components";
import { cx } from "@/utils/cx";

interface TimeInputProps extends Omit<AriaTimeFieldProps<TimeValue>, "children"> {
    className?: string;
}

export const TimeInput = ({ className, ...props }: TimeInputProps) => {
    return (
        <AriaTimeField hourCycle={24} {...props}>
            <AriaDateInput
                className={cx(
                    "flex items-center justify-center rounded-lg bg-primary px-2.5 py-2 text-md shadow-xs ring-1 ring-primary ring-inset focus-within:ring-2 focus-within:ring-brand",
                    className,
                )}
            >
                {(segment) => (
                    <AriaDateSegment
                        segment={segment}
                        className={cx(
                            "rounded px-0.5 text-primary tabular-nums caret-transparent focus:bg-brand-solid focus:font-medium focus:text-white focus:outline-hidden",
                            segment.isPlaceholder && "text-placeholder uppercase",
                            segment.type === "literal" && "text-fg-quaternary",
                        )}
                    />
                )}
            </AriaDateInput>
        </AriaTimeField>
    );
};
