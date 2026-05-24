import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchCard } from "@/components/match-card";
import { matches, competitions } from "@/lib/data/matches";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "المباريات" : "Matches",
    description: locale === "ar" 
      ? "جدول المباريات والنتائج لاتحاد كرة القدم البحريني"
      : "Match schedules and results from the Bahrain Football Association",
  };
}

export default async function MatchesPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ competition?: string; status?: string }>;
}) {
  const { locale } = await params;
  const { competition, status } = await searchParams;
  setRequestLocale(locale);

  return <MatchesContent competition={competition} status={status} />;
}

function MatchesContent({ competition, status }: { competition?: string; status?: string }) {
  const t = useTranslations("matches");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const competitionsList = competitions.map((comp) => ({
    ...comp,
    label: isRTL ? comp.labelAr : comp.labelEn,
  }));

  // Filter matches
  let filteredMatches = [...matches];
  if (competition) {
    filteredMatches = filteredMatches.filter((m) => m.competition.en === competition);
  }
  if (status) {
    filteredMatches = filteredMatches.filter((m) => m.status === status);
  }

  // Group matches by status
  const liveMatches = filteredMatches.filter((m) => m.status === "live");
  const upcomingMatches = filteredMatches.filter((m) => m.status === "scheduled");
  const completedMatches = filteredMatches.filter((m) => m.status === "completed");

  const statusFilters = [
    { value: undefined, label: t("allMatches") },
    { value: "live", label: t("live") },
    { value: "scheduled", label: t("scheduled") },
    { value: "completed", label: t("completed") },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
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
            <p className="text-lg text-primary-foreground/80">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-muted/30 py-4">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Status Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {statusFilters.map((filter) => (
                <Link
                  key={filter.value || "all"}
                  href={`/matches${filter.value ? `?status=${filter.value}` : ""}${competition ? `${filter.value ? "&" : "?"}competition=${competition}` : ""}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    status === filter.value || (!status && !filter.value)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {filter.label}
                  {filter.value === "live" && liveMatches.length > 0 && (
                    <span className="ms-1.5 inline-flex size-2 animate-pulse rounded-full bg-current" />
                  )}
                </Link>
              ))}
            </div>

            {/* Competition Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/matches${status ? `?status=${status}` : ""}`}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  !competition
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {t("allCompetitions")}
              </Link>
              {competitionsList.map((comp) => (
                <Link
                  key={comp.value}
                  href={`/matches?competition=${comp.value}${status ? `&status=${status}` : ""}`}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    competition === comp.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {comp.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Matches */}
      <section className="py-12 md:py-16">
        <div className="container">
          {filteredMatches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted-foreground">{t("noMatches")}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {/* Live Matches */}
              {liveMatches.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <h2 className="text-xl font-bold">{t("liveNow")}</h2>
                    <Badge variant="destructive" className="animate-pulse">
                      {liveMatches.length} {t("live")}
                    </Badge>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {liveMatches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Matches */}
              {upcomingMatches.length > 0 && (
                <div>
                  <h2 className="mb-6 text-xl font-bold">{t("upcoming")}</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingMatches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Matches */}
              {completedMatches.length > 0 && (
                <div>
                  <h2 className="mb-6 text-xl font-bold">{t("results")}</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {completedMatches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
