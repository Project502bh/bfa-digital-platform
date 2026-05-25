"use client";

import { useState, useEffect, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PitchCanvas } from "@/components/fantasy/pitch-canvas";
import { type SlotData } from "@/components/fantasy/player-card-pitch";
import { gameweeks, type FantasyPlayer } from "@/lib/data/fantasy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

const SLOT_POS_LABELS: Record<number, string> = {
  0: "GKP", 1: "DEF", 2: "DEF", 3: "DEF", 4: "DEF",
  5: "MID", 6: "MID", 7: "MID", 8: "MID",
  9: "FWD", 10: "FWD",
  11: "GKP", 12: "OUT", 13: "OUT", 14: "OUT",
};

function loadSquadFromStorage(): (FantasyPlayer | null)[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("bfl_squad");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.slots ?? null;
  } catch {
    return null;
  }
}

function loadCaptainFromStorage(): { captainIdx: number | null; vcIdx: number | null } {
  if (typeof window === "undefined") return { captainIdx: null, vcIdx: null };
  try {
    const raw = localStorage.getItem("bfl_squad");
    if (!raw) return { captainIdx: null, vcIdx: null };
    const parsed = JSON.parse(raw);
    return { captainIdx: parsed.captainIdx ?? null, vcIdx: parsed.vcIdx ?? null };
  } catch {
    return { captainIdx: null, vcIdx: null };
  }
}

export function PointsClient() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const currentGwIndex = gameweeks.findIndex((gw) => gw.is_current);
  const defaultGw = currentGwIndex >= 0 ? currentGwIndex : 3;

  const [gwIndex, setGwIndex] = useState(defaultGw);
  const [squad, setSquad] = useState<(FantasyPlayer | null)[] | null>(null);
  const [captainIdx, setCaptainIdx] = useState<number | null>(null);
  const [vcIdx, setVcIdx] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSquad(loadSquadFromStorage());
    const caps = loadCaptainFromStorage();
    setCaptainIdx(caps.captainIdx);
    setVcIdx(caps.vcIdx);
    setHydrated(true);
  }, []);

  const gw = gameweeks[gwIndex];

  // Compute GW points per player
  const playerPoints = useMemo(() => {
    if (!squad) return Array(15).fill(0) as number[];
    return squad.map((p, idx) => {
      if (!p) return 0;
      const raw = p.gw_points[gwIndex] ?? 0;
      if (idx === captainIdx) return raw * 2;
      return raw;
    });
  }, [squad, gwIndex, captainIdx]);

  const starterPoints = playerPoints.slice(0, 11).reduce((a, b) => a + b, 0);
  const benchPoints = playerPoints.slice(11).reduce((a, b) => a + b, 0);
  const netPoints = starterPoints; // No transfer cost in demo

  // Build slot data for pitch (with points mode)
  const slotData: SlotData[] = Array(15)
    .fill(null)
    .map((_, i) => ({
      index: i,
      posType: SLOT_POS_LABELS[i] as "GKP" | "DEF" | "MID" | "FWD" | "OUT",
      player: squad?.[i] ?? null,
      isCaptain: captainIdx === i,
      isViceCaptain: vcIdx === i,
    }));

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!squad || squad.every((p) => p === null)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="text-6xl">⚽</div>
        <h2 className="text-2xl font-bold">
          {isRTL ? "لم تختر فريقاً بعد" : "No Squad Selected Yet"}
        </h2>
        <p className="text-muted-foreground">
          {isRTL
            ? "ابنِ فريقك أولاً لتتمكن من متابعة نقاطك"
            : "Build your squad first to track your points"}
        </p>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700" asChild>
          <Link href="/fantasy/squad">
            {isRTL ? "ابنِ فريقي" : "Build My Squad"}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container py-6">
        {/* Header */}
        <div className="mb-4">
          <Badge className="mb-1 bg-emerald-600 text-white">BFL Fantasy</Badge>
          <h1 className="text-2xl font-bold">
            {isRTL ? "نقاط فريقي" : "My Points"}
          </h1>
        </div>

        {/* GW Selector */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            disabled={gwIndex === 0}
            onClick={() => setGwIndex((i) => i - 1)}
          >
            <ChevronLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
          </Button>

          <div className="text-center">
            <p className="font-bold">
              {isRTL ? gw.name.ar : gw.name.en}
            </p>
            <p className="text-xs text-muted-foreground">
              {gw.is_current
                ? isRTL ? "الجولة الحالية" : "Current GW"
                : gw.is_finished
                ? isRTL ? "منتهية" : "Finished"
                : isRTL ? "قادمة" : "Upcoming"}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            disabled={gwIndex === gameweeks.length - 1}
            onClick={() => setGwIndex((i) => i + 1)}
          >
            <ChevronRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Points summary cards */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">
                {isRTL ? "نقاط الجولة" : "GW Points"}
              </p>
              <p className="text-2xl font-extrabold text-emerald-600">
                {starterPoints}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">
                {isRTL ? "تكلفة التبديلات" : "Transfer Cost"}
              </p>
              <p className="text-2xl font-extrabold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">
                {isRTL ? "الصافي" : "Net Points"}
              </p>
              <p className="text-2xl font-extrabold text-emerald-600">
                {netPoints}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pitch in points mode */}
        <PitchCanvas
          slots={slotData}
          mode="points"
          onSlotClick={() => {}}
        />

        {/* Bench points note */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <Info className="h-4 w-4 flex-shrink-0" />
          <span>
            {isRTL
              ? `الاحتياط جمع ${benchPoints} نقطة. يتم احتساب التبديلات التلقائية في نهاية الجولة.`
              : `Bench scored ${benchPoints} pts. Auto-substitutions are calculated at end of gameweek.`}
          </span>
        </div>
      </div>
    </div>
  );
}
