"use client";

import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { ComponentPage, Section } from "../_shared/component-page";

export default function FormPage() {
    return (
        <ComponentPage title="Form" description="Form wrapper with validation support.">
            <Section title="Default Form">
                <Form
                    className="flex w-full max-w-sm flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Form submitted");
                    }}
                >
                    <Input label="Name" placeholder="Olivia Rhye" isRequired />
                    <Input label="Email" placeholder="olivia@untitledui.com" type="email" isRequired />
                    <Input label="Company" placeholder="Untitled UI" />
                    <Button type="submit" color="primary" size="md">
                        Submit
                    </Button>
                </Form>
            </Section>
        </ComponentPage>
    );
}
