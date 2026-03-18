"use client";

import { BarChartSquare02, Home01, Settings01, Users01 } from "@untitledui/icons";
import { Tab, TabList, Tabs } from "@/components/application/tabs/tabs";
import { ComponentPage, Section } from "../_shared/component-page";

const tabItems = [
    { id: "dashboard", children: "Dashboard", icon: Home01 },
    { id: "team", children: "Team", icon: Users01 },
    { id: "analytics", children: "Analytics", icon: BarChartSquare02 },
    { id: "settings", children: "Settings", icon: Settings01 },
];

export default function TabsPage() {
    return (
        <ComponentPage title="Tabs" description="Content organization with tabbed navigation.">
            <Section title="Underline">
                <Tabs>
                    <TabList items={tabItems} type="underline">
                        {(item) => <Tab id={item.id}>{item.children}</Tab>}
                    </TabList>
                </Tabs>
            </Section>
            <Section title="Button Brand">
                <Tabs>
                    <TabList items={tabItems} type="button-brand">
                        {(item) => <Tab id={item.id}>{item.children}</Tab>}
                    </TabList>
                </Tabs>
            </Section>
            <Section title="Button Gray">
                <Tabs>
                    <TabList items={tabItems} type="button-gray">
                        {(item) => <Tab id={item.id}>{item.children}</Tab>}
                    </TabList>
                </Tabs>
            </Section>
        </ComponentPage>
    );
}
