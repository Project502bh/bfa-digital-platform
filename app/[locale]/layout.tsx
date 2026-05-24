import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cairo, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === "ar";
  
  return {
    title: {
      default: isArabic ? "اتحاد كرة القدم البحريني" : "Bahrain Football Association",
      template: isArabic ? "%s | اتحاد كرة القدم البحريني" : "%s | BFA",
    },
    description: isArabic 
      ? "الموقع الرسمي لاتحاد كرة القدم البحريني - آخر الأخبار، المباريات، والوثائق الرسمية"
      : "Official website of the Bahrain Football Association - Latest news, matches, and official documents",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html 
      lang={locale} 
      dir={isRTL ? "rtl" : "ltr"} 
      className={`${inter.variable} ${cairo.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className={`min-h-screen font-sans antialiased ${isRTL ? "font-cairo" : "font-inter"}`}>
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
