"use client";

import { BarChartSquare02, HelpCircle, Home01, LayersTwo01, Settings01, Users01 } from "@untitledui/icons";
import { NavItemBase } from "@/components/application/app-navigation/sidebar-navigation-base";
import { ComponentPage, Section } from "../_shared/component-page";

const navItems = [
    { label: "Home", href: "#", icon: Home01, current: true },
    { label: "Dashboard", href: "#", icon: BarChartSquare02 },
    { label: "Projects", href: "#", icon: LayersTwo01 },
    { label: "Team", href: "#", icon: Users01 },
];

const footerItems = [
    { label: "Help", href: "#", icon: HelpCircle },
    { label: "Settings", href: "#", icon: Settings01 },
];

export default function AppNavigationPage() {
    return (
        <ComponentPage title="App Navigation" description="Sidebar and header navigation for app layouts.">
            <Section title="Navigation Items">
                <div className="flex w-72 flex-col gap-1 rounded-xl border border-secondary p-3">
                    {[...navItems, ...footerItems].map((item) => (
                        <NavItemBase key={item.label} href={item.href} icon={item.icon} current={item.current}>
                            {item.label}
                        </NavItemBase>
                    ))}
                </div>
            </Section>
        </ComponentPage>
    );
}
