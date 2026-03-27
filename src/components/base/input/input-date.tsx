"use client";

import type { DateInputProps as AriaDateInputProps } from "react-aria-components";
import { DateInput as AriaDateInput, DateSegment as AriaDateSegment } from "react-aria-components";
import { cx } from "@/utils/cx";

interface InputDateBaseProps extends Omit<AriaDateInputProps, "children"> {
    size?: "sm" | "md";
}

const sizes = {
    sm: "py-2 px-2.5 text-md",
    md: "py-2.5 px-3 text-md",
};

export const InputDateBase = ({ size = "sm", className, ...props }: InputDateBaseProps) => {
    return (
        <AriaDateInput
            {...props}
            className={(state) =>
                cx(
                    "flex rounded-lg bg-primary shadow-xs ring-1 ring-primary ring-inset focus-within:ring-2 focus-within:ring-brand",
                    sizes[size],
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {(segment) => (
                <AriaDateSegment
                    segment={segment}
                    className={cx(
                        "rounded px-0.5 tabular-nums caret-transparent outline-hidden",
                        "text-primary focus:bg-brand-solid focus:font-medium focus:text-white",
                        segment.isPlaceholder && "text-placeholder uppercase",
                        segment.type === "literal" && "text-fg-quaternary",
                    )}
                />
            )}
        </AriaDateInput>
    );
};
