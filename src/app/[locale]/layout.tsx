import { NextIntlClientProvider, } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import "../globals.css";
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Change this to a Promise
}
export const metadata: Metadata = {
  title: "App",
  description: "Description",
};
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params; // Await the params to get the locale
  const messages = await getMessages({ locale });
  if (!messages) {
    notFound();
  }
  const direction = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className="">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}