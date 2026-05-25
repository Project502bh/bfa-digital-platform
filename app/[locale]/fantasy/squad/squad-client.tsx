"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocale } from "next-intl";
import { PitchCanvas } from "@/components/fantasy/pitch-canvas";
import { BudgetBar } from "@/components/fantasy/budget-bar";
import { PlayerPickerDrawer } from "@/components/fantasy/player-picker-drawer";
import { ChipPanel } from "@/components/fantasy/chip-panel";
import { type SlotData } from "@/components/fantasy/player-card-pitch";
import {
  BUDGET,
  SQUAD_REQS,
  MAX_PLAYERS_PER_CLUB,
  type FantasyPlayer,
  type FPosition,
} from "@/lib/data/fantasy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crown, UserMinus, Star, CheckCircle2, AlertCircle } from "lucide-react";

// Slot position layout
// [0] = GKP (starter GK)
// [1-4] = DEF x4
// [5-8] = MID x4
// [9-10] = FWD x2
// [11] = GKP (bench GK)
// [12-14] = OUT bench (any pos)

const SLOT_POS: (FPosition | "OUT")[] = [
  "GKP",
  "DEF", "DEF", "DEF", "DEF",
  "MID", "MID", "MID", "MID",
  "FWD", "FWD",
  "GKP",
  "OUT", "OUT", "OUT",
];

const LS_KEY = "bfl_squad";

interface SavedSquad {
  slots: (FantasyPlayer | null)[];
  captainIdx: number | null;
  vcIdx: number | null;
}

function loadFromStorage(): Partial<SavedSquad> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as SavedSquad;
  } catch {
    return {};
  }
}

function saveToStorage(data: SavedSquad) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function SquadSelectionClient() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

  const [slots, setSlots] = useState<(FantasyPlayer | null)[]>(
    Array(15).fill(null)
  );
  const [captainIdx, setCaptainIdx] = useState<number | null>(null);
  const [vcIdx, setVcIdx] = useState<number | null>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [manageSlot, setManageSlot] = useState<number | null>(null);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.slots) setSlots(stored.slots);
    if (stored.captainIdx != null) setCaptainIdx(stored.captainIdx);
    if (stored.vcIdx != null) setVcIdx(stored.vcIdx);
  }, []);

  // Derived state
  const totalSpent = useMemo(
    () => slots.reduce((sum, p) => sum + (p?.now_cost ?? 0), 0),
    [slots]
  );
  const remaining = BUDGET - totalSpent;

  const posCounts = useMemo(() => {
    const counts = { GKP: 0, DEF: 0, MID: 0, FWD: 0 };
    slots.forEach((p) => {
      if (p) counts[p.position] = (counts[p.position] ?? 0) + 1;
    });
    return counts;
  }, [slots]);

  const clubCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    slots.forEach((p) => {
      if (p) counts[p.club_id] = (counts[p.club_id] ?? 0) + 1;
    });
    return counts;
  }, [slots]);

  const errors: string[] = useMemo(() => {
    const errs: string[] = [];
    if (posCounts.GKP < SQUAD_REQS.GKP) {
      errs.push(
        isRTL
          ? `تحتاج ${SQUAD_REQS.GKP} حارس مرمى`
          : `Need ${SQUAD_REQS.GKP} goalkeepers`
      );
    }
    if (posCounts.DEF < SQUAD_REQS.DEF) {
      errs.push(
        isRTL
          ? `تحتاج ${SQUAD_REQS.DEF} مدافعين`
          : `Need ${SQUAD_REQS.DEF} defenders`
      );
    }
    if (posCounts.MID < SQUAD_REQS.MID) {
      errs.push(
        isRTL
          ? `تحتاج ${SQUAD_REQS.MID} لاعبي وسط`
          : `Need ${SQUAD_REQS.MID} midfielders`
      );
    }
    if (posCounts.FWD < SQUAD_REQS.FWD) {
      errs.push(
        isRTL
          ? `تحتاج ${SQUAD_REQS.FWD} مهاجمين`
          : `Need ${SQUAD_REQS.FWD} forwards`
      );
    }
    Object.entries(clubCounts).forEach(([clubId, count]) => {
      if (count > MAX_PLAYERS_PER_CLUB) {
        errs.push(
          isRTL
            ? `تجاوزت الحد من نادٍ واحد (${clubId})`
            : `Too many players from ${clubId}`
        );
      }
    });
    if (captainIdx === null) {
      errs.push(isRTL ? "لم تختر كابتناً" : "No captain selected");
    }
    return errs;
  }, [posCounts, clubCounts, captainIdx, isRTL]);

  const isValid = errors.length === 0;

  // Slot click handler
  const handleSlotClick = useCallback(
    (index: number) => {
      if (slots[index]) {
        // Open manage dialog
        setManageSlot(index);
      } else {
        // Open player picker
        setActiveSlot(index);
        setPickerOpen(true);
      }
    },
    [slots]
  );

  const handlePlayerSelect = useCallback(
    (player: FantasyPlayer) => {
      if (activeSlot === null) return;
      setSlots((prev) => {
        const next = [...prev];
        next[activeSlot] = player;
        return next;
      });
      setActiveSlot(null);
    },
    [activeSlot]
  );

  const removePlayer = (index: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    if (captainIdx === index) setCaptainIdx(null);
    if (vcIdx === index) setVcIdx(null);
    setManageSlot(null);
  };

  const setCaptain = (index: number) => {
    setCaptainIdx(index);
    if (vcIdx === index) setVcIdx(null);
    setManageSlot(null);
  };

  const setViceCaptain = (index: number) => {
    setVcIdx(index);
    if (captainIdx === index) setCaptainIdx(null);
    setManageSlot(null);
  };

  const handleSave = () => {
    saveToStorage({ slots, captainIdx, vcIdx });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAutoFill = () => {
    // No-op stub for demo
  };

  // Build slot data for PitchCanvas
  const slotData: SlotData[] = SLOT_POS.map((posType, index) => ({
    index,
    posType,
    player: slots[index] ?? null,
    isCaptain: captainIdx === index,
    isViceCaptain: vcIdx === index,
  }));

  const filledCount = slots.filter(Boolean).length;

  // Manage player dialog
  const managePlayer = manageSlot !== null ? slots[manageSlot] : null;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container py-6">
        {/* Page header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Badge className="mb-1 bg-emerald-600 text-white">
              {isRTL ? "BFL Fantasy" : "BFL Fantasy"}
            </Badge>
            <h1 className="text-2xl font-bold">
              {isRTL ? "اختيار الفريق" : "Squad Selection"}
            </h1>
          </div>
          <Badge variant="outline">
            {filledCount} / 15
          </Badge>
        </div>

        {/* Budget bar */}
        <div className="mb-4">
          <BudgetBar spent={totalSpent} budget={BUDGET} />
        </div>

        {/* Main layout */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Pitch */}
          <div className="flex-1 min-w-0">
            <PitchCanvas
              slots={slotData}
              mode="select"
              onSlotClick={handleSlotClick}
            />
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4 lg:w-80">
            {/* Position requirements */}
            <Card>
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">
                  {isRTL ? "متطلبات التشكيلة" : "Formation Requirements"}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-2">
                  {[
                    { pos: "GKP", label: isRTL ? "حراس المرمى" : "Goalkeepers", req: SQUAD_REQS.GKP },
                    { pos: "DEF", label: isRTL ? "المدافعون" : "Defenders", req: SQUAD_REQS.DEF },
                    { pos: "MID", label: isRTL ? "لاعبو الوسط" : "Midfielders", req: SQUAD_REQS.MID },
                    { pos: "FWD", label: isRTL ? "المهاجمون" : "Forwards", req: SQUAD_REQS.FWD },
                  ].map(({ pos, label, req }) => {
                    const count = posCounts[pos as FPosition];
                    const ok = count >= req;
                    return (
                      <div key={pos} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={`font-bold ${ok ? "text-emerald-600" : "text-amber-500"}`}>
                          {count} / {req}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Errors */}
            {errors.length > 0 && (
              <Card className="border-amber-300 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                    <ul className="space-y-1">
                      {errors.map((e, i) => (
                        <li key={i} className="text-xs text-amber-700 dark:text-amber-300">
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Chips */}
            <Card>
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">
                  {isRTL ? "الشرائح" : "Chips"}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ChipPanel
                  chips={{ wildcard: true, freeHit: true, benchBoost: true, tripleCaptain: true }}
                  usedGws={{}}
                  onActivate={(chip) =>
                    setActiveChip((prev) => (prev === chip ? null : chip))
                  }
                  activeChip={activeChip}
                />
              </CardContent>
            </Card>

            <Separator />

            {/* Save */}
            <Button
              size="lg"
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
              disabled={!isValid}
              onClick={handleSave}
            >
              {saved ? (
                <>
                  <CheckCircle2 className="me-2 h-4 w-4" />
                  {isRTL ? "تم الحفظ!" : "Saved!"}
                </>
              ) : (
                isRTL ? "حفظ الفريق" : "Save Squad"
              )}
            </Button>
            {!isValid && (
              <p className="text-center text-xs text-muted-foreground">
                {isRTL
                  ? "أكمل فريقك أولاً لحفظه"
                  : "Complete your squad to save"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Player Picker Drawer */}
      <PlayerPickerDrawer
        open={pickerOpen}
        onClose={() => {
          setPickerOpen(false);
          setActiveSlot(null);
        }}
        slotIndex={activeSlot ?? 0}
        slotPosType={activeSlot !== null ? SLOT_POS[activeSlot] : "OUT"}
        currentSquad={slots}
        onSelect={handlePlayerSelect}
        remainingBudget={remaining}
      />

      {/* Manage Player Dialog */}
      <Dialog open={manageSlot !== null} onOpenChange={(v) => !v && setManageSlot(null)}>
        <DialogContent className="max-w-xs" dir={isRTL ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle className="text-base">
              {managePlayer?.name[lang] ?? ""}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => manageSlot !== null && setCaptain(manageSlot)}
            >
              <Crown className="h-4 w-4 text-yellow-500" />
              {isRTL ? "تعيين كابتن" : "Set as Captain"}
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => manageSlot !== null && setViceCaptain(manageSlot)}
            >
              <Star className="h-4 w-4 text-blue-500" />
              {isRTL ? "تعيين نائب الكابتن" : "Set as Vice-Captain"}
            </Button>
            <Separator />
            <Button
              variant="destructive"
              className="justify-start gap-2"
              onClick={() => manageSlot !== null && removePlayer(manageSlot)}
            >
              <UserMinus className="h-4 w-4" />
              {isRTL ? "إزالة اللاعب" : "Remove Player"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
