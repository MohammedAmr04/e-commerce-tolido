import { hasLocale, NextIntlClientProvider } from "next-intl";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Geist, Geist_Mono } from "next/font/google";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import UiProvider from "@/components/services/context/UiProvider";
import Header from "@/components/shared/headerUser/Header";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import Footer from "@/components/shared/footerUser/Footer";

// 🅰️ English fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🇸🇦 Arabic font
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isArabic = locale === "ar";

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={`
          ${isArabic ? tajawal.variable : geistSans.variable} 
          ${geistMono.variable} 
          antialiased
          ${isArabic ? "font-arabic" : "font-english"}
        `}
      >
        <NextIntlClientProvider>
          <AntdRegistry>
          <UiProvider isArabic={isArabic}>
          <Header />
              {children}
              <Footer/>
                        <DarkModeToggle />

            </UiProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
