import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Star, Mail, Phone } from "lucide-react";
import { sponsorshipPackages, sponsorshipTierNames } from "@/lib/data/sponsorship";
import { SponsorshipForm } from "@/components/sponsorship-form";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "رعاية الاتحاد" : "Sponsorship",
    description:
      locale === "ar"
        ? "تعرف على فرص الرعاية المتاحة مع اتحاد البحرين لكرة القدم"
        : "Explore sponsorship opportunities with the Bahrain Football Association",
  };
}

export default async function SponsorshipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SponsorshipContent />;
}

const tierColors = {
  bronze: "from-amber-700/10 border-amber-700/30 text-amber-700",
  silver: "from-slate-400/10 border-slate-400/30 text-slate-500",
  gold: "from-yellow-500/10 border-yellow-500/30 text-yellow-600",
  platinum: "from-cyan-600/10 border-cyan-600/30 text-cyan-700",
} as const;

const tierBadgeColors = {
  bronze: "bg-amber-700/10 text-amber-700 border-amber-700/20",
  silver: "bg-slate-400/10 text-slate-600 border-slate-400/20",
  gold: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  platinum: "bg-cyan-600/10 text-cyan-700 border-cyan-600/20",
} as const;

function SponsorshipContent() {
  const t = useTranslations("sponsorship");
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("badge")}
            </Badge>
            <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-lg text-primary-foreground/80">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Why sponsor */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">{t("why.title")}</h2>
            <p className="mb-10 text-muted-foreground">{t("why.description")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(["reach", "brand", "hospitality", "impact"] as const).map((key) => (
              <Card key={key} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                    {t(`why.stats.${key}.value`)}
                  </div>
                  <h3 className="font-semibold">{t(`why.stats.${key}.label`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`why.stats.${key}.desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Packages */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">{t("packages.title")}</h2>
            <p className="text-muted-foreground">{t("packages.subtitle")}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sponsorshipPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={cn(
                  "relative flex flex-col overflow-hidden border bg-gradient-to-b transition-shadow hover:shadow-lg",
                  tierColors[pkg.id],
                  pkg.highlighted && "ring-2 ring-primary shadow-md"
                )}
              >
                {pkg.highlighted && (
                  <div className="absolute start-0 end-0 top-0 flex items-center justify-center gap-1.5 bg-primary py-1.5 text-xs font-semibold text-primary-foreground">
                    <Star className="size-3 fill-current" />
                    {t("packages.popular")}
                  </div>
                )}
                <CardHeader className={cn("pb-4", pkg.highlighted && "pt-10")}>
                  <Badge variant="outline" className={cn("mb-3 w-fit", tierBadgeColors[pkg.id])}>
                    {sponsorshipTierNames[pkg.id][lang]}
                  </Badge>
                  <div>
                    <span className="text-3xl font-bold">{pkg.price[lang]}</span>
                    <span className="ms-1 text-sm text-muted-foreground">/ {pkg.period[lang]}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3 pt-0">
                  <ul className="flex flex-col gap-2">
                    {pkg.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{benefit[lang]}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#inquire"
                    className={cn(
                      "mt-auto flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      pkg.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {t("packages.inquire")}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">{t("packages.customNote")}</p>
        </div>
      </section>

      <Separator />

      {/* Inquiry Form */}
      <section id="inquire" className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: context */}
            <div className="lg:col-span-2">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">{t("contact.title")}</h2>
              <p className="mb-6 text-muted-foreground">{t("contact.description")}</p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t("contact.emailLabel")}</p>
                    <a
                      href="mailto:sponsorship@bfa.bh"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      sponsorship@bfa.bh
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t("contact.phoneLabel")}</p>
                    <a
                      href="tel:+97317689999"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      +973 1768 9999
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <SponsorshipForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
