"use client";

import { Slider } from "@/components/base/slider/slider";
import { ComponentPage, Section } from "../_shared/component-page";

export default function SliderPage() {
    return (
        <ComponentPage title="Slider" description="Range slider controls.">
            <Section title="Default">
                <div className="w-80">
                    <Slider defaultValue={50} />
                </div>
            </Section>
        </ComponentPage>
    );
}
