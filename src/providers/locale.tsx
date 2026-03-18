"use client";

import type { PropsWithChildren } from "react";
import { I18nProvider } from "react-aria-components";

interface LocaleProviderProps extends PropsWithChildren {
    locale?: string;
}

export const LocaleProvider = ({ locale = "en-AU", children }: LocaleProviderProps) => {
    return <I18nProvider locale={locale}>{children}</I18nProvider>;
};
