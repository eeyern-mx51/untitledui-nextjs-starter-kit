"use client";

import { AmexIcon, ApplePayIcon, DiscoverIcon, MastercardIcon, PayPalIcon, StripeIcon, UnionPayIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { ComponentPage, Section } from "../_shared/component-page";

export default function PaymentIconsPage() {
    return (
        <ComponentPage title="Payment Icons" description="Payment method brand icons.">
            <Section title="All Payment Icons">
                <VisaIcon className="h-8" />
                <MastercardIcon className="h-8" />
                <AmexIcon className="h-8" />
                <DiscoverIcon className="h-8" />
                <PayPalIcon className="h-8" />
                <StripeIcon className="h-8" />
                <ApplePayIcon className="h-8" />
                <UnionPayIcon className="h-8" />
            </Section>
        </ComponentPage>
    );
}
