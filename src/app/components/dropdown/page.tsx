"use client";

import { Settings01, LogOut01, User01 } from "@untitledui/icons";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { ComponentPage, Section } from "../_shared/component-page";

export default function DropdownPage() {
    return (
        <ComponentPage title="Dropdown" description="Dropdown menus for actions and navigation.">
            <Section title="Default">
                <Dropdown.Root>
                    <Dropdown.DotsButton />
                    <Dropdown.Popover>
                        <Dropdown.Menu>
                            <Dropdown.Item icon={User01} id="profile">Profile</Dropdown.Item>
                            <Dropdown.Item icon={Settings01} id="settings">Settings</Dropdown.Item>
                            <Dropdown.Separator />
                            <Dropdown.Item icon={LogOut01} id="logout">Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown.Root>
            </Section>
        </ComponentPage>
    );
}
