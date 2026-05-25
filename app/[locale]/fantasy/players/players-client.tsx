"use client";

import { useState, useMemo, useEffect } from "react";
import { useLocale } from "next-intl";
import {
  fantasyPlayers,
  fantasyClubs,
  type FantasyPlayer,
  type FPosition,
} from "@/lib/data/fantasy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronDown, ChevronUp, Heart, HeartOff } from "lucide-react";

type SortKey = "total_points" | "now_cost" | "goals_scored" | "assists" | "points_per_game";

const POS_TABS_EN = ["All", "GKP", "DEF", "MID", "FWD"] as const;
const POS_TABS_AR: Record<string, string> = {
  All: "الكل", GKP: "حارس", DEF: "مدافع", MID: "وسط", FWD: "مهاجم",
};

const STATUS_COLORS = {
  available: "bg-green-500",
  doubtful: "bg-amber-400",
  injured: "bg-red-500",
};

const LS_WATCH = "bfl_watchlist";

function loadWatchlist(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LS_WATCH);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveWatchlist(ids: Set<string>) {
  localStorage.setItem(LS_WATCH, JSON.stringify([...ids]));
}

// Mini bar chart using divs
function GwBarChart({ points }: { points: number[] }) {
  const max = Math.max(...points, 1);
  return (
    <div className="flex h-12 items-end gap-1">
      {points.map((pt, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
          <span className="text-[9px] text-muted-foreground">{pt}</span>
          <div
            className="w-full rounded-t bg-emerald-500"
            style={{ height: `${(pt / max) * 32}px`, minHeight: "2px" }}
          />
          <span className="text-[8px] text-muted-foreground">GW{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export function PlayersClient() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

  const [posFilter, setPosFilter] = useState<string>("All");
  const [clubFilter, setClubFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("total_points");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    setWatchlist(loadWatchlist());
  }, []);

  const toggleWatch = (id: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveWatchlist(next);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = [...fantasyPlayers];
    if (posFilter !== "All") list = list.filter((p) => p.position === posFilter);
    if (clubFilter !== "all") list = list.filter((p) => p.club_id === clubFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.includes(q)
      );
    }
    list.sort((a, b) => b[sortKey] - a[sortKey]);
    return list;
  }, [posFilter, clubFilter, sortKey, search]);

  const club = (id: string) => fantasyClubs.find((c) => c.id === id);

  return (
    <div className="min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-900 to-teal-900 py-10 text-white">
        <div className="container">
          <Badge className="mb-2 bg-white/20 text-white">BFL Fantasy</Badge>
          <h1 className="text-3xl font-extrabold">
            {isRTL ? "قاعدة بيانات اللاعبين" : "Player Database"}
          </h1>
          <p className="mt-1 text-emerald-100">
            {isRTL
              ? `${fantasyPlayers.length} لاعب من دوري البحرين الممتاز`
              : `${fantasyPlayers.length} players from the Bahraini Premier League`}
          </p>
        </div>
      </section>

      <div className="container py-6">
        {/* Filter bar */}
        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
          {/* Position tabs */}
          <div className="flex flex-wrap gap-1.5">
            {POS_TABS_EN.map((pos) => (
              <button
                key={pos}
                onClick={() => setPosFilter(pos)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  posFilter === pos
                    ? "bg-emerald-600 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {isRTL ? POS_TABS_AR[pos] : pos}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={clubFilter} onValueChange={setClubFilter}>
              <SelectTrigger className="h-9 w-44 text-xs">
                <SelectValue placeholder={isRTL ? "النادي" : "Club"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isRTL ? "كل الأندية" : "All Clubs"}</SelectItem>
                {fantasyClubs.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
              <SelectTrigger className="h-9 w-44 text-xs">
                <SelectValue placeholder={isRTL ? "ترتيب حسب" : "Sort by"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total_points">{isRTL ? "النقاط" : "Total Points"}</SelectItem>
                <SelectItem value="now_cost">{isRTL ? "السعر" : "Price"}</SelectItem>
                <SelectItem value="goals_scored">{isRTL ? "الأهداف" : "Goals"}</SelectItem>
                <SelectItem value="assists">{isRTL ? "التمريرات الحاسمة" : "Assists"}</SelectItem>
                <SelectItem value="points_per_game">{isRTL ? "ن/مباراة" : "PPG"}</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-[160px]">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isRTL ? "بحث..." : "Search..."}
                className="h-9 pl-8 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-xs text-muted-foreground">
                  <th className="px-3 py-3 text-start font-medium">
                    {isRTL ? "اللاعب" : "Player"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium hidden sm:table-cell">
                    {isRTL ? "النادي" : "Club"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium">
                    {isRTL ? "الموقع" : "Pos"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium">
                    {isRTL ? "السعر" : "Price"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium">
                    {isRTL ? "النقاط" : "Pts"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium hidden md:table-cell">
                    {isRTL ? "ن/م" : "PPG"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium hidden lg:table-cell">
                    {isRTL ? "أهداف" : "G"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium hidden lg:table-cell">
                    {isRTL ? "تمريرات" : "A"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium hidden xl:table-cell">
                    {isRTL ? "شبكات نظيفة" : "CS"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium hidden xl:table-cell">
                    {isRTL ? "الاختيار%" : "Sel%"}
                  </th>
                  <th className="px-3 py-3 text-center font-medium">
                    {isRTL ? "متابعة" : "Watch"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={11} className="py-10 text-center text-muted-foreground">
                      {isRTL ? "لا يوجد لاعبون" : "No players found"}
                    </td>
                  </tr>
                )}
                {filtered.map((player) => {
                  const c = club(player.club_id);
                  const isExpanded = expandedId === player.id;
                  return [
                    <tr
                      key={player.id}
                      className={`border-b border-border/40 cursor-pointer transition ${
                        isExpanded
                          ? "bg-muted/50"
                          : "hover:bg-muted/30"
                      }`}
                      onClick={() =>
                        setExpandedId((prev) =>
                          prev === player.id ? null : player.id
                        )
                      }
                    >
                      {/* Player */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: c?.color ?? "#888" }}
                          />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${STATUS_COLORS[player.status]}`}
                              />
                              <span className="font-medium truncate max-w-[120px]">
                                {player.name[lang]}
                              </span>
                            </div>
                            {player.news && (
                              <span className="text-[9px] text-amber-500 leading-tight truncate max-w-[120px]">
                                {player.news[lang]}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      {/* Club */}
                      <td className="px-3 py-2.5 text-center text-xs text-muted-foreground hidden sm:table-cell">
                        {c?.short}
                      </td>
                      {/* Position */}
                      <td className="px-3 py-2.5 text-center">
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                          {player.position}
                        </Badge>
                      </td>
                      {/* Price */}
                      <td className="px-3 py-2.5 text-center text-xs font-semibold text-emerald-600">
                        £{(player.now_cost / 10).toFixed(1)}m
                      </td>
                      {/* Points */}
                      <td className="px-3 py-2.5 text-center font-bold">
                        {player.total_points}
                      </td>
                      {/* PPG */}
                      <td className="px-3 py-2.5 text-center text-xs text-muted-foreground hidden md:table-cell">
                        {player.points_per_game.toFixed(1)}
                      </td>
                      {/* Goals */}
                      <td className="px-3 py-2.5 text-center text-xs hidden lg:table-cell">
                        {player.goals_scored}
                      </td>
                      {/* Assists */}
                      <td className="px-3 py-2.5 text-center text-xs hidden lg:table-cell">
                        {player.assists}
                      </td>
                      {/* CS */}
                      <td className="px-3 py-2.5 text-center text-xs hidden xl:table-cell">
                        {player.clean_sheets}
                      </td>
                      {/* Sel% */}
                      <td className="px-3 py-2.5 text-center text-xs hidden xl:table-cell">
                        {player.selected_by.toFixed(1)}%
                      </td>
                      {/* Watch */}
                      <td className="px-3 py-2.5 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWatch(player.id);
                          }}
                          className="inline-flex items-center justify-center rounded p-1 hover:bg-muted"
                          aria-label="Toggle watchlist"
                        >
                          {watchlist.has(player.id) ? (
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          ) : (
                            <Heart className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </td>
                    </tr>,
                    /* Expanded detail row */
                    isExpanded && (
                      <tr key={`${player.id}-detail`} className="bg-muted/30">
                        <td colSpan={11} className="px-4 py-4">
                          <div className="flex flex-wrap gap-6">
                            {/* GW chart */}
                            <div className="flex flex-col gap-1">
                              <p className="text-xs font-semibold text-muted-foreground">
                                {isRTL ? "نقاط كل جولة" : "Points per GW"}
                              </p>
                              <GwBarChart points={player.gw_points} />
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
                              {[
                                { label: isRTL ? "الدقائق" : "Minutes", val: player.minutes },
                                { label: isRTL ? "الأهداف" : "Goals", val: player.goals_scored },
                                { label: isRTL ? "التمريرات" : "Assists", val: player.assists },
                                { label: isRTL ? "شبكات نظيفة" : "Clean Sheets", val: player.clean_sheets },
                                { label: isRTL ? "ن/مباراة" : "PPG", val: player.points_per_game.toFixed(1) },
                                { label: isRTL ? "الاختيار%" : "Sel%", val: `${player.selected_by.toFixed(1)}%` },
                              ].map((s) => (
                                <div key={s.label}>
                                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                                  <p className="font-bold">{s.val}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ),
                  ];
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          {isRTL
            ? `عرض ${filtered.length} لاعب`
            : `Showing ${filtered.length} players`}
        </p>
      </div>
    </div>
  );
}
