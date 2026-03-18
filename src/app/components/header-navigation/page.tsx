"use client";

import { BarChartSquare02, Home01, LayersTwo01, Settings01, Users01 } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ComponentPage, Section } from "../_shared/component-page";

const navItems = [
    { label: "Home", href: "#", icon: Home01, current: true },
    { label: "Dashboard", href: "#", icon: BarChartSquare02 },
    { label: "Projects", href: "#", icon: LayersTwo01 },
    { label: "Team", href: "#", icon: Users01 },
    { label: "Settings", href: "#", icon: Settings01 },
];

export default function HeaderNavigationPage() {
    return (
        <ComponentPage title="Header Navigation" description="Marketing site header with navigation items.">
            <Section title="Default">
                <div className="-mx-4 md:-mx-8">
                    <HeaderNavigationBase items={navItems} activeUrl="#" />
                </div>
            </Section>
        </ComponentPage>
    );
}
