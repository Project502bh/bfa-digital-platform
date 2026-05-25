"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
  fantasyPlayers,
  fantasyClubs,
  BUDGET,
  MAX_PLAYERS_PER_CLUB,
  type FantasyPlayer,
  type FPosition,
} from "@/lib/data/fantasy";
import { Plus, Search } from "lucide-react";

type SortKey = "total_points" | "now_cost" | "points_per_game";

interface PlayerPickerDrawerProps {
  open: boolean;
  onClose: () => void;
  slotIndex: number;
  slotPosType: FPosition | "OUT";
  currentSquad: (FantasyPlayer | null)[];
  onSelect: (player: FantasyPlayer) => void;
  remainingBudget: number;
}

const POS_TABS_EN = ["All", "GKP", "DEF", "MID", "FWD"] as const;
const POS_TABS_AR: Record<string, string> = {
  All: "الكل", GKP: "حارس", DEF: "مدافع", MID: "وسط", FWD: "مهاجم",
};

const STATUS_COLORS = {
  available: "bg-green-500",
  doubtful:  "bg-amber-400",
  injured:   "bg-red-500",
};

export function PlayerPickerDrawer({
  open,
  onClose,
  slotIndex,
  slotPosType,
  currentSquad,
  onSelect,
  remainingBudget,
}: PlayerPickerDrawerProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

  // Default position tab based on slot
  const defaultPos =
    slotPosType === "OUT" ? "All" : (slotPosType as string);

  const [posFilter, setPosFilter] = useState<string>(defaultPos);
  const [clubFilter, setClubFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("total_points");
  const [search, setSearch] = useState("");

  // Counts of squad players per club
  const clubCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    currentSquad.forEach((p) => {
      if (p) counts[p.club_id] = (counts[p.club_id] ?? 0) + 1;
    });
    return counts;
  }, [currentSquad]);

  const squadIds = useMemo(
    () => new Set(currentSquad.filter(Boolean).map((p) => p!.id)),
    [currentSquad]
  );

  // Selected count
  const selectedCount = currentSquad.filter(Boolean).length;

  const filtered = useMemo(() => {
    let list = [...fantasyPlayers];

    // Position filter
    if (posFilter !== "All") {
      list = list.filter((p) => p.position === posFilter);
    } else if (slotPosType !== "OUT") {
      // Slot has strict position — still allow browsing all but disable wrong ones
    }

    // Club filter
    if (clubFilter !== "all") {
      list = list.filter((p) => p.club_id === clubFilter);
    }

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.includes(q)
      );
    }

    // Sort
    list.sort((a, b) => b[sortKey] - a[sortKey]);

    return list;
  }, [posFilter, clubFilter, sortKey, search, slotPosType]);

  const isDisabled = (player: FantasyPlayer): { disabled: boolean; reason: string } => {
    if (squadIds.has(player.id)) {
      return { disabled: true, reason: isRTL ? "موجود" : "In squad" };
    }
    if ((clubCounts[player.club_id] ?? 0) >= MAX_PLAYERS_PER_CLUB) {
      return { disabled: true, reason: isRTL ? "حد النادي" : "Club limit" };
    }
    if (player.now_cost > remainingBudget) {
      return { disabled: true, reason: isRTL ? "ميزانية" : "Too costly" };
    }
    // Position mismatch for strict slots
    if (
      slotPosType !== "OUT" &&
      posFilter === slotPosType &&
      player.position !== slotPosType
    ) {
      return { disabled: true, reason: isRTL ? "موقع خاطئ" : "Wrong pos" };
    }
    if (slotPosType !== "OUT" && player.position !== slotPosType) {
      return { disabled: true, reason: isRTL ? "موقع خاطئ" : "Wrong pos" };
    }
    return { disabled: false, reason: "" };
  };

  const club = (id: string) => fantasyClubs.find((c) => c.id === id);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="h-[85dvh] p-0">
        <SheetHeader className="border-b border-border px-4 py-3">
          <SheetTitle className="flex items-center justify-between text-base">
            <span>{isRTL ? "اختر لاعبًا" : "Pick a Player"}</span>
            <Badge variant="secondary" className="text-xs">
              {isRTL
                ? `${selectedCount} / 15 مختار`
                : `${selectedCount} / 15 selected`}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Filters */}
        <div className="flex flex-col gap-2 border-b border-border bg-muted/30 px-4 py-3">
          {/* Position tabs */}
          <div className="flex gap-1">
            {POS_TABS_EN.map((pos) => (
              <button
                key={pos}
                onClick={() => setPosFilter(pos)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  posFilter === pos
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {isRTL ? POS_TABS_AR[pos] : pos}
              </button>
            ))}
          </div>

          {/* Club + Sort + Search */}
          <div className="flex gap-2">
            <Select value={clubFilter} onValueChange={setClubFilter}>
              <SelectTrigger className="h-8 flex-1 text-xs">
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
              <SelectTrigger className="h-8 flex-1 text-xs">
                <SelectValue placeholder={isRTL ? "ترتيب" : "Sort"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total_points">{isRTL ? "النقاط" : "Total Pts"}</SelectItem>
                <SelectItem value="now_cost">{isRTL ? "السعر" : "Price"}</SelectItem>
                <SelectItem value="points_per_game">{isRTL ? "ن/مباراة" : "PPG"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRTL ? "بحث عن لاعب..." : "Search player..."}
              className="h-8 pl-7 text-xs"
            />
          </div>
        </div>

        {/* Player list */}
        <ScrollArea className="h-[calc(85dvh-200px)]">
          <div className="divide-y divide-border">
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {isRTL ? "لا يوجد لاعبون" : "No players found"}
              </p>
            )}
            {filtered.map((player) => {
              const { disabled, reason } = isDisabled(player);
              const c = club(player.club_id);
              return (
                <div
                  key={player.id}
                  className={`flex items-center gap-3 px-4 py-2.5 ${
                    disabled ? "opacity-40" : "hover:bg-muted/40"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {/* Club color dot */}
                  <div
                    className="h-3 w-3 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: c?.color ?? "#888" }}
                  />

                  {/* Name + status */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                          STATUS_COLORS[player.status]
                        }`}
                      />
                      <span className="truncate text-sm font-medium">
                        {player.name[lang]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{c?.short}</span>
                      <Badge variant="outline" className="h-4 px-1 text-[9px]">
                        {player.position}
                      </Badge>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-col items-end gap-0.5 text-right">
                    <span className="text-xs font-bold text-emerald-600">
                      £{(player.now_cost / 10).toFixed(1)}m
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {player.total_points} pts
                    </span>
                  </div>

                  {/* Add button */}
                  {disabled ? (
                    <span className="ml-2 flex-shrink-0 rounded px-1.5 py-0.5 text-[9px] text-muted-foreground bg-muted">
                      {reason}
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      className="ml-2 h-7 w-7 flex-shrink-0 rounded-full p-0"
                      onClick={() => {
                        onSelect(player);
                        onClose();
                      }}
                      aria-label={`Add ${player.name.en}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
