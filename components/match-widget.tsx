"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MatchCard } from "./match-card";
import type { Match } from "@/lib/types";

interface MatchWidgetProps {
  matches: Match[];
  title?: string;
}

export function MatchWidget({ matches, title }: MatchWidgetProps) {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Separate matches by status
  const liveMatches = matches.filter((m) => m.status === "live");
  const upcomingMatches = matches.filter((m) => m.status === "scheduled");

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/30 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title || t("liveMatches")}</CardTitle>
          {liveMatches.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {liveMatches.length} {t("live")}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">{t("noMatches")}</p>
          </div>
        ) : (
          <ScrollArea className="w-full">
            <div className="flex gap-4 p-4">
              {matches.slice(0, 5).map((match) => (
                <div key={match.id} className="w-[300px] shrink-0">
                  <MatchCard match={match} variant="compact" />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
