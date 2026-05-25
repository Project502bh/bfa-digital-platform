import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Clock, Users, Ticket } from "lucide-react";
import { matches } from "@/lib/data/matches";

export async function generateStaticParams() {
  return matches.map((match) => ({ id: match.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const match = matches.find((m) => m.id === id);

  if (!match) return { title: "Not Found" };

  const lang = locale === "ar" ? "ar" : "en";
  const homeTeam = match.homeTeam.name[lang];
  const awayTeam = match.awayTeam.name[lang];

  return {
    title: `${homeTeam} vs ${awayTeam}`,
    description: locale === "ar"
      ? `تفاصيل مباراة ${homeTeam} ضد ${awayTeam}`
      : `Match details: ${homeTeam} vs ${awayTeam}`,
  };
}

export default async function MatchDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const match = matches.find((m) => m.id === id);
  if (!match) notFound();

  return <MatchDetailContent id={id} />;
}

function MatchDetailContent({ id }: { id: string }) {
  const t = useTranslations("matches");
  const tTickets = useTranslations("tickets");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";
  const dateLocale = isRTL ? ar : enUS;

  const match = matches.find((m) => m.id === id)!;
  const homeTeam = match.homeTeam.name[lang];
  const awayTeam = match.awayTeam.name[lang];
  const competition = match.competition[lang];
  const venue = match.venue[lang];

  const statusText: Record<string, string> = {
    scheduled: t("scheduled"),
    live: t("live"),
    completed: t("completed"),
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-12 text-primary-foreground md:py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10">
          <Button variant="ghost" className="mb-8 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
            <Link href="/matches">
              {isRTL ? (
                <ArrowRight className="size-4" />
              ) : (
                <ArrowLeft className="size-4" />
              )}
              {t("backToMatches")}
            </Link>
          </Button>

          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Badge variant="secondary">{competition}</Badge>
              <Badge
                variant="outline"
                className={`border-primary-foreground/20 ${match.status === "live" ? "animate-pulse bg-white text-primary" : "bg-primary-foreground/10 text-primary-foreground"}`}
              >
                {match.status === "live" && (
                  <span className="me-1.5 inline-block size-2 rounded-full bg-primary" />
                )}
                {statusText[match.status]}
              </Badge>
            </div>

            {/* Teams & Score */}
            <div className="flex items-center justify-between gap-8">
              {/* Home Team */}
              <div className="flex flex-1 flex-col items-center gap-4 text-center">
                <div className="flex size-24 items-center justify-center rounded-full bg-primary-foreground/10 md:size-32">
                  {match.homeTeam.logo ? (
                    <img src={match.homeTeam.logo} alt={homeTeam} className="size-16 object-contain md:size-24" />
                  ) : (
                    <span className="text-2xl font-bold md:text-3xl">
                      {homeTeam.slice(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-lg font-semibold md:text-xl">{homeTeam}</span>
              </div>

              {/* Score / Time */}
              <div className="flex flex-col items-center gap-2">
                {match.status === "completed" || match.status === "live" ? (
                  <div className="flex items-center gap-4 text-4xl font-bold md:text-6xl">
                    <span>{match.homeTeam.score ?? 0}</span>
                    <span className="text-primary-foreground/50">-</span>
                    <span>{match.awayTeam.score ?? 0}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl font-bold md:text-5xl">
                      {format(new Date(match.datetime), "HH:mm")}
                    </span>
                    <span className="text-sm text-primary-foreground/70">
                      {format(new Date(match.datetime), "PPP", { locale: dateLocale })}
                    </span>
                  </div>
                )}
                {match.status === "live" && match.minute && (
                  <Badge variant="destructive" className="text-sm">
                    {match.minute}&apos;
                  </Badge>
                )}
              </div>

              {/* Away Team */}
              <div className="flex flex-1 flex-col items-center gap-4 text-center">
                <div className="flex size-24 items-center justify-center rounded-full bg-primary-foreground/10 md:size-32">
                  {match.awayTeam.logo ? (
                    <img src={match.awayTeam.logo} alt={awayTeam} className="size-16 object-contain md:size-24" />
                  ) : (
                    <span className="text-2xl font-bold md:text-3xl">
                      {awayTeam.slice(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-lg font-semibold md:text-xl">{awayTeam}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Tickets Banner */}
      {match.status === "scheduled" && match.tickets && match.tickets.length > 0 && (
        <section className="border-b border-border bg-primary/5 py-6">
          <div className="container">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Ticket className="size-5" />
                </div>
                <div>
                  <p className="font-semibold">{tTickets("ticketsAvailable")}</p>
                  <p className="text-sm text-muted-foreground">
                    {match.tickets.reduce((s, c) => s + c.available, 0)} {tTickets("available")} ·{" "}
                    {isRTL ? "من" : "from"} {tTickets("currency")}{" "}
                    {Math.min(...match.tickets.map((c) => c.price)).toFixed(3)}
                  </p>
                </div>
              </div>
              <Button size="lg" className="gap-2 shrink-0" asChild>
                <Link href={`/tickets/${id}`}>
                  <Ticket className="size-4" />
                  {tTickets("buyTickets")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Match Details */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t("matchInfo")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                      <Calendar className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("date")}</p>
                      <p className="font-medium">{format(new Date(match.datetime), "PPP", { locale: dateLocale })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                      <Clock className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("time")}</p>
                      <p className="font-medium">{format(new Date(match.datetime), "HH:mm")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                      <MapPin className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("venue")}</p>
                      <p className="font-medium">{venue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t("competitionInfo")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                      <Users className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("competition")}</p>
                      <p className="font-medium">{competition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
