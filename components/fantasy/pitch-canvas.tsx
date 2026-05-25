"use client";

import { PlayerCardPitch, type SlotData } from "@/components/fantasy/player-card-pitch";
import { useLocale } from "next-intl";

interface PitchCanvasProps {
  slots: SlotData[];
  mode: "select" | "points";
  onSlotClick: (index: number) => void;
}

// Formation rows for starting XI (indices 0-10)
// Slot layout: [0]=GKP, [1-4]=DEF x4, [5-8]=MID x4, [9-10]=FWD x2
// Bench: [11-14]
const ROWS = [
  { label: "FWD", indices: [9, 10] },
  { label: "MID", indices: [5, 6, 7, 8] },
  { label: "DEF", indices: [1, 2, 3, 4] },
  { label: "GKP", indices: [0] },
];

export function PitchCanvas({ slots, mode, onSlotClick }: PitchCanvasProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const benchSlots = slots.filter((s) => s.index >= 11);

  return (
    <div className="flex w-full flex-col gap-0">
      {/* ── Pitch ─────────────────────────────────────── */}
      <div
        className="relative flex w-full flex-col justify-between overflow-hidden rounded-t-xl"
        style={{
          background: "linear-gradient(180deg, #1a6b1a 0%, #145214 45%, #1a6b1a 100%)",
          minHeight: "340px",
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Pitch markings */}
        {/* Centre circle */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
        {/* Centre line */}
        <div className="pointer-events-none absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-white/20" />
        {/* Top penalty box */}
        <div className="pointer-events-none absolute left-1/2 top-2 h-14 w-48 -translate-x-1/2 rounded-b-lg border border-white/15" />
        {/* Bottom penalty box */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 h-14 w-48 -translate-x-1/2 rounded-t-lg border border-white/15" />
        {/* Centre spot */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />

        {/* Player rows */}
        <div className="relative z-10 flex flex-1 flex-col justify-between py-4 px-2">
          {ROWS.map((row) => (
            <div key={row.label} className="flex items-center justify-center gap-2 py-1">
              {row.indices.map((idx) => {
                const slot = slots[idx];
                if (!slot) return null;
                return (
                  <PlayerCardPitch
                    key={idx}
                    player={slot.player}
                    slotPos={slot.posType}
                    isCaptain={slot.isCaptain}
                    isViceCaptain={slot.isViceCaptain}
                    isStarter={true}
                    mode={mode}
                    onClick={() => onSlotClick(idx)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bench strip ───────────────────────────────── */}
      <div
        className="rounded-b-xl border-t-2 border-dashed border-white/30 bg-slate-800/90 px-2 py-3"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {isRTL ? "الاحتياط" : "Bench"}
        </p>
        <div className="flex items-center justify-center gap-2">
          {benchSlots.map((slot) => (
            <PlayerCardPitch
              key={slot.index}
              player={slot.player}
              slotPos={slot.posType}
              isCaptain={slot.isCaptain}
              isViceCaptain={slot.isViceCaptain}
              isStarter={false}
              mode={mode}
              onClick={() => onSlotClick(slot.index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
