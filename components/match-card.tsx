import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import type { Match } from "@/lib/types";

interface MatchCardProps {
  match: Match;
  variant?: "default" | "compact";
}

export function MatchCard({ match, variant = "default" }: MatchCardProps) {
  const t = useTranslations("matches");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";
  const dateLocale = isRTL ? ar : enUS;

  const homeTeam = match.homeTeam.name[lang];
  const awayTeam = match.awayTeam.name[lang];
  const competition = match.competition[lang];
  const venue = match.venue[lang];

  const statusColors = {
    scheduled: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    live: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-muted text-muted-foreground border-border",
  };

  const statusText = {
    scheduled: t("scheduled"),
    live: t("live"),
    completed: t("completed"),
  };

  return (
    <Link href={`/matches/${match.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className={`p-4 ${variant === "compact" ? "p-3" : "p-5"}`}>
          {/* Competition & Status */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{competition}</span>
            <Badge variant="outline" className={statusColors[match.status]}>
              {match.status === "live" && (
                <span className="me-1.5 size-2 animate-pulse rounded-full bg-primary" />
              )}
              {statusText[match.status]}
            </Badge>
          </div>

          {/* Teams & Score */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                {match.homeTeam.logo ? (
                  <img src={match.homeTeam.logo} alt={homeTeam} className="size-10 object-contain" />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {homeTeam.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium">{homeTeam}</span>
            </div>

            {/* Score / Time */}
            <div className="flex flex-col items-center gap-1">
              {match.status === "completed" || match.status === "live" ? (
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <span>{match.homeTeam.score ?? 0}</span>
                  <span className="text-muted-foreground">-</span>
                  <span>{match.awayTeam.score ?? 0}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg font-semibold">
                    {format(new Date(match.datetime), "HH:mm")}
                  </span>
                </div>
              )}
              {match.status === "live" && match.minute && (
                <Badge variant="destructive" className="text-xs">
                  {match.minute}&apos;
                </Badge>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                {match.awayTeam.logo ? (
                  <img src={match.awayTeam.logo} alt={awayTeam} className="size-10 object-contain" />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {awayTeam.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium">{awayTeam}</span>
            </div>
          </div>

          {/* Date & Venue */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>{format(new Date(match.datetime), "PPP", { locale: dateLocale })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>{venue}</span>
            </div>
          </div>

          {/* Buy Tickets CTA */}
          {match.status === "scheduled" && match.tickets && match.tickets.length > 0 && (
            <div className="mt-3 border-t border-border pt-3">
              <Button
                variant="default"
                size="sm"
                className="w-full gap-1.5"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={`/tickets/${match.id}`}>
                  <Ticket className="size-3.5" />
                  {t("buyTickets")}
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
