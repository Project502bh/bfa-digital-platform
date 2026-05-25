"use client";

import { type FantasyPlayer, type FPosition, fantasyClubs } from "@/lib/data/fantasy";
import { useLocale } from "next-intl";

export interface SlotData {
  index: number;
  posType: FPosition | "OUT";
  player: FantasyPlayer | null;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

interface PlayerCardPitchProps {
  player: FantasyPlayer | null;
  slotPos: FPosition | "OUT";
  isCaptain: boolean;
  isViceCaptain: boolean;
  isStarter: boolean;
  mode: "select" | "points";
  onClick: () => void;
  isTripleCaptain?: boolean;
}

const POS_COLORS: Record<string, string> = {
  GKP: "bg-yellow-400 text-yellow-900",
  DEF: "bg-green-500 text-white",
  MID: "bg-blue-500 text-white",
  FWD: "bg-red-500 text-white",
  OUT: "bg-gray-500 text-white",
};

const POS_LABELS_EN: Record<string, string> = {
  GKP: "GK", DEF: "DEF", MID: "MID", FWD: "FWD", OUT: "BENCH",
};
const POS_LABELS_AR: Record<string, string> = {
  GKP: "حارس", DEF: "دفاع", MID: "وسط", FWD: "هجوم", OUT: "احتياط",
};

function shortName(fullName: string): string {
  const parts = fullName.trim().split(" ");
  return parts[parts.length - 1] ?? fullName;
}

export function PlayerCardPitch({
  player,
  slotPos,
  isCaptain,
  isViceCaptain,
  isStarter,
  mode,
  onClick,
  isTripleCaptain = false,
}: PlayerCardPitchProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

  const club = player ? fantasyClubs.find((c) => c.id === player.club_id) : null;
  const posLabel = isRTL ? POS_LABELS_AR[slotPos] : POS_LABELS_EN[slotPos];

  // Empty slot
  if (!player) {
    return (
      <button
        onClick={onClick}
        className="flex h-16 w-[72px] flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-white/40 bg-white/5 text-white/60 transition hover:border-white/70 hover:bg-white/10 hover:text-white sm:h-20 sm:w-20"
        aria-label={`Add ${posLabel} player`}
      >
        <span className="text-lg font-bold leading-none">+</span>
        <span className={`text-[10px] font-medium ${POS_COLORS[slotPos]} rounded px-1 py-0.5`}>
          {posLabel}
        </span>
      </button>
    );
  }

  const gwPoints = mode === "points"
    ? (player.gw_points[3] ?? 0) // GW4 = index 3 (current)
    : null;
  const displayValue =
    mode === "select"
      ? `£${(player.now_cost / 10).toFixed(1)}m`
      : `${isCaptain ? (gwPoints ?? 0) * 2 : gwPoints ?? 0} pts`;

  const captainBadge = isTripleCaptain
    ? "3C"
    : isCaptain
    ? "C"
    : isViceCaptain
    ? "V"
    : null;

  return (
    <button
      onClick={onClick}
      className={`relative flex h-16 w-[72px] flex-col items-center overflow-hidden rounded-lg border border-white/20 bg-black/30 text-white shadow transition hover:bg-black/50 sm:h-20 sm:w-20 ${
        !isStarter ? "opacity-70" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Club color bar */}
      {club && (
        <div
          className="h-1.5 w-full flex-shrink-0"
          style={{ backgroundColor: club.color }}
        />
      )}

      <div className="flex flex-1 flex-col items-center justify-center gap-0.5 px-1 py-0.5">
        {/* Short name */}
        <span className="max-w-full truncate text-center text-[11px] font-bold leading-tight sm:text-xs">
          {shortName(player.name[lang])}
        </span>

        {/* Value */}
        <span
          className={`rounded px-1.5 py-0.5 text-[9px] font-semibold sm:text-[10px] ${
            mode === "points" ? "bg-amber-500 text-amber-950" : "bg-white/20 text-white"
          }`}
        >
          {displayValue}
        </span>
      </div>

      {/* Captain / Vice badge */}
      {captainBadge && (
        <span className="absolute right-0.5 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-amber-950 shadow sm:h-5 sm:w-5 sm:text-[10px]">
          {captainBadge}
        </span>
      )}

      {/* Injury/doubt dot */}
      {player.status !== "available" && (
        <span
          className={`absolute left-0.5 top-2 h-2 w-2 rounded-full ${
            player.status === "injured" ? "bg-red-500" : "bg-amber-400"
          }`}
        />
      )}
    </button>
  );
}
