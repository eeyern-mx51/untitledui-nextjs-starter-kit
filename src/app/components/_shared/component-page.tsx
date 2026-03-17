"use client";

import type { PropsWithChildren } from "react";
import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

interface ComponentPageProps extends PropsWithChildren {
    title: string;
    description?: string;
}

export const ComponentPage = ({ title, description, children }: ComponentPageProps) => {
    return (
        <div className="min-h-dvh bg-primary">
            <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
                <Button href="/" color="link-gray" iconLeading={ArrowLeft} size="sm">
                    Back to directory
                </Button>
                <h1 className="mt-4 text-display-xs font-semibold text-primary">{title}</h1>
                {description && <p className="mt-1 text-md text-tertiary">{description}</p>}
                <div className="mt-8 flex flex-col gap-10">{children}</div>
            </div>
        </div>
    );
};

interface SectionProps extends PropsWithChildren {
    title: string;
}

export const Section = ({ title, children }: SectionProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-md font-semibold text-secondary">{title}</h2>
            <div className="flex flex-wrap items-start gap-4">{children}</div>
        </div>
    );
};
