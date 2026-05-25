import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { matches } from "@/lib/data/matches";
import { TicketPurchaseForm } from "@/components/ticket-purchase-form";

export async function generateStaticParams() {
  return matches
    .filter((m) => m.tickets && m.tickets.length > 0)
    .map((m) => ({ matchId: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; matchId: string }>;
}) {
  const { locale, matchId } = await params;
  const match = matches.find((m) => m.id === matchId);
  if (!match) return { title: "Not Found" };

  const lang = locale === "ar" ? "ar" : "en";
  const home = match.homeTeam.name[lang];
  const away = match.awayTeam.name[lang];

  return {
    title: locale === "ar" ? `تذاكر: ${home} ضد ${away}` : `Tickets: ${home} vs ${away}`,
  };
}

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ locale: string; matchId: string }>;
}) {
  const { locale, matchId } = await params;
  setRequestLocale(locale);

  const match = matches.find((m) => m.id === matchId);
  if (!match || !match.tickets || match.tickets.length === 0) notFound();

  return <TicketsContent matchId={matchId} />;
}

function TicketsContent({ matchId }: { matchId: string }) {
  const t = useTranslations("tickets");
  const tMatches = useTranslations("matches");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";
  const dateLocale = isRTL ? ar : enUS;

  const match = matches.find((m) => m.id === matchId)!;
  const homeTeam = match.homeTeam.name[lang];
  const awayTeam = match.awayTeam.name[lang];
  const competition = match.competition[lang];
  const venue = match.venue[lang];
  const totalAvailable = match.tickets!.reduce((sum, cat) => sum + cat.available, 0);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-10 text-primary-foreground md:py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10">
          <Button
            variant="ghost"
            className="mb-6 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            asChild
          >
            <Link href={`/matches/${matchId}`}>
              {isRTL ? <ArrowRight className="me-2 size-4" /> : <ArrowLeft className="me-2 size-4" />}
              {tMatches("backToMatches")}
            </Link>
          </Button>

          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">{competition}</Badge>
              <Badge className="gap-1.5 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20">
                <Ticket className="size-3.5" />
                {t("badge")}
              </Badge>
              {totalAvailable > 0 && (
                <Badge variant="outline" className="border-green-400/40 bg-green-500/15 text-green-300">
                  {totalAvailable} {t("ticketsAvailable")}
                </Badge>
              )}
            </div>

            {/* Teams */}
            <div className="flex items-center justify-center gap-6 text-center md:gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary-foreground/10 md:size-20">
                  {match.homeTeam.logo ? (
                    <img src={match.homeTeam.logo} alt={homeTeam} className="size-10 object-contain md:size-14" />
                  ) : (
                    <span className="text-xl font-bold">{homeTeam.slice(0, 3).toUpperCase()}</span>
                  )}
                </div>
                <span className="text-base font-semibold md:text-lg">{homeTeam}</span>
              </div>

              <span className="text-2xl font-light text-primary-foreground/50">VS</span>

              <div className="flex flex-col items-center gap-2">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary-foreground/10 md:size-20">
                  {match.awayTeam.logo ? (
                    <img src={match.awayTeam.logo} alt={awayTeam} className="size-10 object-contain md:size-14" />
                  ) : (
                    <span className="text-xl font-bold">{awayTeam.slice(0, 3).toUpperCase()}</span>
                  )}
                </div>
                <span className="text-base font-semibold md:text-lg">{awayTeam}</span>
              </div>
            </div>

            {/* Match info row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/75">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                <span>{format(new Date(match.datetime), "PPP p", { locale: dateLocale })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                <span>{venue}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket form */}
      <section className="py-10 md:py-16">
        <div className="container">
          <TicketPurchaseForm matchId={matchId} categories={match.tickets!} />
        </div>
      </section>
    </div>
  );
}
