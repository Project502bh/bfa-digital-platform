import { setRequestLocale } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  gameweeks,
  globalLeaderboard,
  fantasyPlayers,
} from "@/lib/data/fantasy";
import {
  Users,
  Trophy,
  ArrowRight,
  Star,
  Zap,
  Wand2,
  TrendingUp,
  Shield,
  Target,
  Medal,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      locale === "ar"
        ? "الفانتازي - دوري البحرين الخيالي"
        : "BFL Fantasy - Bahrain Fantasy League",
    description:
      locale === "ar"
        ? "العب دوري البحرين الخيالي. اختر فريقك، اكسب النقاط وتسلق الترتيب."
        : "Play Bahrain Fantasy League. Pick your squad, earn points, and climb the leaderboard.",
  };
}

export default async function FantasyLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FantasyLandingContent />;
}

function FantasyLandingContent() {
  const t = useTranslations("fantasy");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const currentGW = gameweeks.find((gw) => gw.is_current) ?? gameweeks[3];
  const topFive = globalLeaderboard.slice(0, 5);

  // Most captained: Alaa Hubail
  const topPlayer = fantasyPlayers.find((p) => p.id === "man-fw1")!;
  // Most transferred in: Jamal Hassan
  const topTransfer = fantasyPlayers.find((p) => p.id === "rif-md1")!;

  const lang = isRTL ? "ar" : "en";

  const steps = [
    {
      icon: Users,
      title: isRTL ? "اختر فريقك" : "Pick Your Squad",
      desc: isRTL
        ? "اختر 15 لاعباً من دوري البحرين الممتاز بميزانية 100 مليون"
        : "Choose 15 players from the Bahraini Premier League with a £100M budget",
    },
    {
      icon: Star,
      title: isRTL ? "عيّن كابتنك" : "Choose Your Captain",
      desc: isRTL
        ? "كابتنك يجمع ضعف النقاط كل جولة — اختر بحكمة"
        : "Your captain earns double points every gameweek — choose wisely",
    },
    {
      icon: TrendingUp,
      title: isRTL ? "أجرِ التبديلات" : "Make Transfers",
      desc: isRTL
        ? "تبديل مجاني واحد كل جولة. استخدم شرائحك للحصول على ميزة"
        : "One free transfer each gameweek. Use chips for extra advantages",
    },
    {
      icon: Trophy,
      title: isRTL ? "تسلق الترتيب" : "Climb the Leagues",
      desc: isRTL
        ? "تنافس في الترتيب العام أو أنشئ دوري خاص مع أصدقائك"
        : "Compete in the global rankings or create a private league with friends",
    },
  ];

  const chips = [
    {
      icon: Wand2,
      name: isRTL ? "البطاقة الجوكر" : "Wildcard",
      desc: isRTL
        ? "أجرِ تبديلات غير محدودة لجولة واحدة مجاناً"
        : "Make unlimited free transfers for one gameweek",
    },
    {
      icon: Zap,
      name: isRTL ? "الضربة الحرة" : "Free Hit",
      desc: isRTL
        ? "تشكيلة مؤقتة لجولة واحدة ثم تعود لفريقك الأصلي"
        : "Temporary squad for one gameweek, reverts after",
    },
    {
      icon: Users,
      name: isRTL ? "تعزيز الاحتياط" : "Bench Boost",
      desc: isRTL
        ? "نقاط لاعبي الاحتياط تُحتسب لهذه الجولة"
        : "Your bench players' points count this gameweek",
    },
    {
      icon: Shield,
      name: isRTL ? "الكابتن الثلاثي" : "Triple Captain",
      desc: isRTL
        ? "كابتنك يحصل على ثلاثة أضعاف النقاط"
        : "Your captain earns triple points this gameweek",
    },
  ];

  return (
    <div className="flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-20 text-white md:py-32">
        {/* Pitch lines decoration */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white" />
          <div className="absolute bottom-0 left-1/2 h-24 w-72 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-white" />
          <div className="absolute top-0 left-1/2 h-24 w-72 -translate-x-1/2 rounded-b-full border-2 border-t-0 border-white" />
        </div>

        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-emerald-600/80 text-white hover:bg-emerald-600">
            {t("badge")}
          </Badge>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            {t("title")}
          </h1>
          <p className="mb-8 text-lg text-emerald-100 md:text-xl">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-white/90" asChild>
              <Link href="/fantasy/squad">
                {t("cta.buildSquad")}
                <ArrowRight className={`ms-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
              asChild
            >
              <Link href="/fantasy/leagues">{t("cta.viewLeaderboard")}</Link>
            </Button>
          </div>
        </div>

        <div className="absolute -bottom-1 start-0 end-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path
              d="M0 60L1440 60L1440 0C1200 40 900 60 720 60C540 60 240 40 0 0L0 60Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* ── How to Play ───────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-3 border-emerald-500 text-emerald-600">
              {t("howToPlay.badge")}
            </Badge>
            <h2 className="text-3xl font-bold">{t("howToPlay.title")}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Card key={i} className="group hover:border-emerald-400 transition-colors">
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── This Gameweek ─────────────────────────────────── */}
      <section className="bg-muted/40 py-14 md:py-20">
        <div className="container">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-3 border-emerald-500 text-emerald-600">
              {t("thisGW.badge")}
            </Badge>
            <h2 className="text-3xl font-bold">
              {isRTL ? currentGW.name.ar : currentGW.name.en}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Target,
                label: isRTL ? "متوسط النقاط" : "Average Score",
                value: currentGW.average_score,
              },
              {
                icon: Trophy,
                label: isRTL ? "أعلى نقاط" : "Highest Score",
                value: currentGW.highest_score,
              },
              {
                icon: Star,
                label: isRTL ? "الأكثر تكبيلاً" : "Most Captained",
                value: topPlayer.name[lang],
              },
              {
                icon: TrendingUp,
                label: isRTL ? "الأكثر استقداماً" : "Most Transferred In",
                value: topTransfer.name[lang],
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-bold">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Managers ──────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Badge variant="outline" className="mb-2 border-emerald-500 text-emerald-600">
                {t("topManagers.badge")}
              </Badge>
              <h2 className="text-2xl font-bold">{t("topManagers.title")}</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/fantasy/leagues">
                {isRTL ? "عرض الكل" : "View All"}
                <ArrowRight className={`ms-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                    <th className="px-4 py-3 text-start font-medium">
                      {isRTL ? "الترتيب" : "Rank"}
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      {isRTL ? "المدير" : "Manager"}
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      {isRTL ? "اسم الفريق" : "Team Name"}
                    </th>
                    <th className="px-4 py-3 text-end font-medium">
                      {isRTL ? "نقاط الجولة" : "GW Pts"}
                    </th>
                    <th className="px-4 py-3 text-end font-medium">
                      {isRTL ? "المجموع" : "Total"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topFive.map((entry) => (
                    <tr
                      key={entry.rank}
                      className="border-b border-border/50 hover:bg-muted/30"
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            entry.rank === 1
                              ? "bg-yellow-400 text-yellow-900"
                              : entry.rank === 2
                              ? "bg-slate-300 text-slate-800"
                              : entry.rank === 3
                              ? "bg-amber-600 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {entry.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{entry.user}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {entry.team_name}
                      </td>
                      <td className="px-4 py-3 text-end font-bold text-emerald-600">
                        {entry.gw_points}
                      </td>
                      <td className="px-4 py-3 text-end font-bold">{entry.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Chips Guide ───────────────────────────────────── */}
      <section className="bg-muted/40 py-14 md:py-20">
        <div className="container">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-3 border-emerald-500 text-emerald-600">
              {t("chips.badge")}
            </Badge>
            <h2 className="text-3xl font-bold">{t("chips.title")}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {chips.map((chip, i) => (
              <Card key={i} className="hover:border-emerald-400 transition-colors">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                    <chip.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold">{chip.name}</h3>
                  <p className="text-sm text-muted-foreground">{chip.desc}</p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {isRTL ? "متاح مرة واحدة" : "One use only"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-700 to-teal-700 py-16 text-white">
        <div className="container text-center">
          <Medal className="mx-auto mb-4 h-12 w-12 text-yellow-300" />
          <h2 className="mb-3 text-3xl font-extrabold">
            {isRTL ? "هل أنت مستعد للتحدي؟" : "Ready for the Challenge?"}
          </h2>
          <p className="mb-6 text-emerald-100">
            {isRTL
              ? "انضم إلى آلاف المدراء في دوري البحرين الخيالي"
              : "Join thousands of managers in the Bahrain Fantasy League"}
          </p>
          <Button size="lg" className="bg-white text-emerald-900 hover:bg-white/90" asChild>
            <Link href="/fantasy/squad">
              {isRTL ? "ابنِ فريقك الآن" : "Build My Squad Now"}
              <ArrowRight className={`ms-2 h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
