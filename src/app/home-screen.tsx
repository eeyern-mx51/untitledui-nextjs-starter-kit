"use client";

import { ChevronRight } from "@untitledui/icons";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";

interface ComponentLink {
    name: string;
    href: string;
}

interface ComponentSection {
    title: string;
    description: string;
    components: ComponentLink[];
}

const sections: ComponentSection[] = [
    {
        title: "Application",
        description: "Complex UI patterns for app interfaces.",
        components: [
            { name: "Date Picker", href: "/components/date-picker" },
            { name: "Date Time Picker", href: "/components/date-time-picker" },
            { name: "Empty State", href: "/components/empty-state" },
            { name: "File Upload", href: "/components/file-upload" },
            { name: "Loading Indicator", href: "/components/loading-indicator" },
            { name: "Modals", href: "/components/modals" },
            { name: "Navigation", href: "/components/app-navigation" },
            { name: "Pagination", href: "/components/pagination" },
            { name: "Slideout Menus", href: "/components/slideout-menus" },
            { name: "Table", href: "/components/table" },
            { name: "Tabs", href: "/components/tabs" },
        ],
    },
    {
        title: "Base",
        description: "Core building blocks for your UI.",
        components: [
            { name: "Avatar", href: "/components/avatar" },
            { name: "Badges", href: "/components/badges" },
            { name: "Button Group", href: "/components/button-group" },
            { name: "Buttons", href: "/components/buttons" },
            { name: "Checkbox", href: "/components/checkbox" },
            { name: "Dropdown", href: "/components/dropdown" },
            { name: "File Upload Trigger", href: "/components/file-upload-trigger" },
            { name: "Form", href: "/components/form" },
            { name: "Input", href: "/components/input" },
            { name: "Pin Input", href: "/components/pin-input" },
            { name: "Progress Indicators", href: "/components/progress-indicators" },
            { name: "Radio Buttons", href: "/components/radio-buttons" },
            { name: "Select", href: "/components/select" },
            { name: "Slider", href: "/components/slider" },
            { name: "Tags", href: "/components/tags" },
            { name: "Textarea", href: "/components/textarea" },
            { name: "Toggle", href: "/components/toggle" },
            { name: "Tooltip", href: "/components/tooltip" },
        ],
    },
    {
        title: "Foundations",
        description: "Design tokens and foundational elements.",
        components: [
            { name: "Featured Icon", href: "/components/featured-icon" },
            { name: "Logo", href: "/components/logo" },
            { name: "Payment Icons", href: "/components/payment-icons" },
            { name: "Social Icons", href: "/components/social-icons" },
        ],
    },
    {
        title: "Marketing",
        description: "Components for marketing pages.",
        components: [{ name: "Header Navigation", href: "/components/header-navigation" }],
    },
];

export const HomeScreen = () => {
    return (
        <div className="min-h-dvh bg-primary">
            <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
                <div className="flex items-center gap-3">
                    <UntitledLogoMinimal className="size-8" />
                    <h1 className="text-display-xs font-semibold text-primary">Component Directory</h1>
                </div>
                <p className="mt-2 text-md text-tertiary">Browse all available components in the Untitled UI starter kit.</p>

                <div className="mt-10 flex flex-col gap-10">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h2 className="text-lg font-semibold text-primary">{section.title}</h2>
                            <p className="mt-1 text-sm text-tertiary">{section.description}</p>

                            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {section.components.map((component) => (
                                    <a
                                        key={component.name}
                                        href={component.href}
                                        className="group flex items-center justify-between rounded-xl border border-secondary bg-primary px-4 py-3 transition duration-100 ease-linear hover:border-brand hover:bg-brand-primary"
                                    >
                                        <span className="text-sm font-medium text-secondary group-hover:text-brand-secondary">
                                            {component.name}
                                        </span>
                                        <ChevronRight className="size-4 text-fg-quaternary transition duration-100 ease-linear group-hover:text-fg-brand-secondary" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
