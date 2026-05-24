import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/news-card";
import { MatchWidget } from "@/components/match-widget";
import { ArrowRight, Trophy, Users, Calendar, FileText } from "lucide-react";
import { news } from "@/lib/data/news";
import { matches } from "@/lib/data/matches";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Get recent news and upcoming matches
  const recentNews = news.slice(0, 4);
  const recentMatches = matches.slice(0, 5);

  const stats = [
    { icon: Trophy, value: "15+", label: t("stats.championships") },
    { icon: Users, value: "24", label: t("stats.teams") },
    { icon: Calendar, value: "200+", label: t("stats.matches") },
    { icon: FileText, value: "50+", label: t("stats.documents") },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 text-primary-foreground md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("hero.badge")}
            </Badge>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/matches">
                  {t("hero.cta.matches")}
                  <ArrowRight className={`size-4 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/news">
                  {t("hero.cta.news")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-1 start-0 end-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 bg-transparent shadow-none">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <stat.icon className="size-6" />
                  </div>
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Matches Widget */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">{t("matches.title")}</h2>
            <Button variant="ghost" asChild>
              <Link href="/matches">
                {t("viewAll")}
                <ArrowRight className={`size-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </div>
          <MatchWidget matches={recentMatches} />
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">{t("news.title")}</h2>
            <Button variant="ghost" asChild>
              <Link href="/news">
                {t("viewAll")}
                <ArrowRight className={`size-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured News */}
            {recentNews[0] && (
              <div className="md:col-span-2 lg:col-span-1 lg:row-span-2">
                <NewsCard news={recentNews[0]} featured />
              </div>
            )}
            {/* Other News */}
            {recentNews.slice(1).map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">{t("quickAccess.title")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/about", icon: Users, title: t("quickAccess.about"), desc: t("quickAccess.aboutDesc") },
              { href: "/matches", icon: Trophy, title: t("quickAccess.matches"), desc: t("quickAccess.matchesDesc") },
              { href: "/news", icon: FileText, title: t("quickAccess.news"), desc: t("quickAccess.newsDesc") },
              { href: "/documents", icon: Calendar, title: t("quickAccess.documents"), desc: t("quickAccess.documentsDesc") },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="group h-full transition-all hover:border-primary hover:shadow-md">
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="size-7" />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
