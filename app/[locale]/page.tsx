import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/news-card";
import { MatchWidget } from "@/components/match-widget";
import { ArrowRight, Trophy, Users, Calendar, FileText, Instagram, Heart, MessageCircle, Camera } from "lucide-react";
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

      {/* Instagram Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        {/* Instagram gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#405DE6] via-[#C13584] to-[#FCAF45]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            {/* Left: CTA */}
            <div className="flex flex-col items-center gap-6 text-center text-white lg:items-start lg:text-start">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Instagram className="size-8" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-white/70">
                  {isRTL ? "تابعونا على" : "Follow us on"} Instagram
                </p>
                <h2 className="mt-1 text-3xl font-bold md:text-4xl">@bahrainfa</h2>
                <p className="mt-3 text-base text-white/80">
                  {isRTL
                    ? "ابق على اطلاع بأحدث أخبار المباريات والصور والتحديثات الحصرية"
                    : "Stay updated with the latest match moments, behind-the-scenes photos, and exclusive updates"}
                </p>
              </div>
              <a
                href="https://instagram.com/bahrainfa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#C13584] shadow-lg transition-transform hover:scale-105"
              >
                <Instagram className="size-4" />
                {isRTL ? "تابع @bahrainfa" : "Follow @bahrainfa"}
              </a>
            </div>

            {/* Right: Mock post grid */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Trophy,   label: isRTL ? "أبرز المباريات" : "Match Highlights", bg: "from-red-500 to-orange-500" },
                { icon: Camera,   label: isRTL ? "خلف الكواليس"   : "Behind the Scenes", bg: "from-purple-500 to-pink-500" },
                { icon: Users,    label: isRTL ? "صورة الفريق"    : "Team Photo",        bg: "from-blue-500 to-cyan-500" },
                { icon: Calendar, label: isRTL ? "يوم المباراة"   : "Match Day",         bg: "from-green-500 to-teal-500" },
                { icon: Heart,    label: isRTL ? "أكاديمية الشباب" : "Youth Academy",     bg: "from-yellow-500 to-orange-400" },
                { icon: MessageCircle, label: isRTL ? "إعلان رسمي" : "Announcement",     bg: "from-indigo-500 to-purple-500" },
              ].map((post, i) => (
                <a
                  key={i}
                  href="https://instagram.com/bahrainfa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.bg} opacity-90`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2 text-white">
                    <post.icon className="size-6 drop-shadow" />
                    <span className="text-center text-[10px] font-medium leading-tight drop-shadow">
                      {post.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Instagram className="size-6 text-white" />
                  </div>
                </a>
              ))}
            </div>
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
