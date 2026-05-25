import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Crown, Star, Users, Calendar, Ticket } from "lucide-react";
import { MembershipForm } from "@/components/membership-form";
import type { MembershipType } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "العضوية" : "Membership",
    description:
      locale === "ar"
        ? "انضم إلى اتحاد البحرين لكرة القدم واستمتع بامتيازات العضوية الحصرية"
        : "Join the Bahrain Football Association and enjoy exclusive membership benefits",
  };
}

export default async function MembershipPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { locale } = await params;
  const { plan } = await searchParams;
  setRequestLocale(locale);

  const initialPlan: MembershipType =
    plan === "premium" ? "premium" : plan === "regular" ? "regular" : "regular";

  return <MembershipContent initialPlan={initialPlan} />;
}

function MembershipContent({ initialPlan }: { initialPlan: MembershipType }) {
  const t = useTranslations("membership");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const steps = [
    {
      icon: Star,
      title: isRTL ? "اختر خطتك" : "Choose Your Plan",
      desc: isRTL ? "اختر بين العضوية الاعتيادية أو المميزة" : "Select Regular or Premium to match your needs",
    },
    {
      icon: Users,
      title: isRTL ? "أكمل تسجيلك" : "Complete Registration",
      desc: isRTL ? "أدخل بياناتك الشخصية بأمان" : "Fill in your personal details securely",
    },
    {
      icon: Ticket,
      title: isRTL ? "استمتع بالامتيازات" : "Enjoy Your Benefits",
      desc: isRTL ? "احصل على بطاقتك واستخدم امتيازاتك فوراً" : "Receive your card and start using your perks immediately",
    },
  ];

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

      {/* Stats bar */}
      <section className="border-b border-border bg-muted/40 py-6">
        <div className="container">
          <div className="grid grid-cols-3 divide-x divide-border text-center rtl:divide-x-reverse">
            {[
              { value: "8", label: t("stat1Label") },
              { value: "2", label: t("stat2Label") },
              { value: "100%", label: t("stat3Label") },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-4">
                <span className="text-2xl font-bold text-primary">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-bold">{t("howItWorks")}</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="size-6" />
                </div>
                <div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan comparison quick-view */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="text-2xl font-bold">{t("compareTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("compareSubtitle")}</p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {/* Regular */}
            <Card className="border-2 border-border">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="size-5" />
                  </div>
                  <div>
                    <p className="font-bold">{t("regularName")}</p>
                    <p className="text-xs text-muted-foreground">{t("regularTagline")}</p>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">{t("currency")} 20.000</span>
                  <span className="text-sm text-muted-foreground"> / {t("year")}</span>
                </div>
                <ul className="flex flex-col gap-2 text-sm">
                  {[
                    t("regularB1"), t("regularB2"), t("regularB3"), t("regularB4"), t("regularB5"),
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Premium */}
            <Card className="border-2 border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/10">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                      <Crown className="size-5" />
                    </div>
                    <div>
                      <p className="font-bold">{t("premiumName")}</p>
                      <p className="text-xs text-muted-foreground">{t("premiumTagline")}</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500 text-white hover:bg-yellow-500">{t("popular")}</Badge>
                </div>
                <div>
                  <span className="text-3xl font-bold text-yellow-600">{t("currency")} 50.000</span>
                  <span className="text-sm text-muted-foreground"> / {t("year")}</span>
                </div>
                <ul className="flex flex-col gap-2 text-sm">
                  {[
                    t("premiumB1"), t("premiumB2"), t("premiumB3"),
                    t("premiumB4"), t("premiumB5"), t("premiumB6"),
                    t("premiumB7"), t("premiumB8"),
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-yellow-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="register" className="py-12 md:py-20">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">{t("formBadge")}</Badge>
            <h2 className="text-2xl font-bold">{t("formTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("formSubtitle")}</p>
          </div>
          <div className="mx-auto max-w-5xl">
            <MembershipForm initialPlan={initialPlan} />
          </div>
        </div>
      </section>
    </div>
  );
}
