# Setting Up `next-intl` with Next.js

This guide explains how to set up and configure `next-intl` in a Next.js project to enable multilingual support.

---

## Installation

1. Install the required package:
   ```bash
   npm install next-intl
   ```

---

## Folder Structure

Organize your project to keep translation files and configuration clean:

```
project-root/
├── src/
│   └── messages/
│       ├── en/
│       │   └── common.json
│       └── ar/
│           └── common.json
├── src/
│   ├── components/
│   │   └── ExampleComponent.tsx
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── not-found.tsx
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── i18n/
│   │   ├── request.ts
│   │   └── routing.ts
├── package.json
└── next.config.js
```

---

## Configuration

### 1. Update the `next.config.js` file

This file contains the configuration for `next-intl`:

```javascript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

---

## i18n Setup

### 1. Create `request.ts` File

This file handles the request configuration for translations:

```typescript
import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
```

### 2. Create `routing.ts` File

This file defines the routing and navigation for the locales:

```typescript
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

---

## Adding Translations

1. Create JSON files for each locale in the `src/messages/` folder:

   ### `src/messages/en/common.json`
   ```json
   {
     "welcome": "Welcome to our website!",
     "greeting": "Hello, how are you?"
   }
   ```

   ### `src/messages/ar/common.json`
   ```json
   {
     "welcome": "مرحبًا بك في موقعنا!",
     "greeting": "مرحبًا، كيف حالك؟"
   }
   ```

---

## Integrating with the Application

### 1. Wrap the Application Layout

Modify the `layout.tsx` inside the `[locale]` folder to include translations:

```typescript
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

### 2. Use Translations in Components

Import and use translations in any component:

```typescript
import { useTranslations } from "next-intl";

const ExampleComponent = () => {
  const t = useTranslations("common");

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("greeting")}</p>
    </div>
  );
};

export default ExampleComponent;
```

---

## Testing

Run the development server and test the translations:

```bash
npm run dev
```

Navigate to `/en` or `/ar` to test the locales.

---

## Deployment Notes

Ensure the `src/messages/` folder is included in the build process, and the routing configuration is correctly set up in production.


