"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/news", labelKey: "news" },
  { href: "/matches", labelKey: "matches" },
  { href: "/documents", labelKey: "documents" },
  { href: "/sponsorship", labelKey: "sponsorship" },
  { href: "/contact", labelKey: "contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = locale === "ar";

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="BFA" className="size-10 object-contain" />
          <span className="hidden text-lg font-bold text-foreground sm:inline-block">
            {t("bfa")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
            <Button
              variant={locale === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => switchLocale("en")}
              className="h-7 px-3 text-xs"
            >
              EN
            </Button>
            <Button
              variant={locale === "ar" ? "default" : "ghost"}
              size="sm"
              onClick={() => switchLocale("ar")}
              className="h-7 px-3 text-xs"
            >
              عربي
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "right" : "left"} className="w-[300px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 pt-8">
                <Link href="/" className="flex items-center gap-3 pb-4">
                  <img src="/logo.png" alt="BFA" className="size-10 object-contain" />
                  <span className="text-lg font-bold">{t("bfa")}</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
