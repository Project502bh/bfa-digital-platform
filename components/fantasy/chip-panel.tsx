"use client";

import { useLocale } from "next-intl";
import { Wand2, Zap, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipStatus {
  wildcard: boolean;
  freeHit: boolean;
  benchBoost: boolean;
  tripleCaptain: boolean;
}

interface ChipPanelProps {
  chips: ChipStatus;
  usedGws: {
    wildcard?: number;
    freeHit?: number;
    benchBoost?: number;
    tripleCaptain?: number;
  };
  onActivate: (chip: string) => void;
  activeChip: string | null;
}

const CHIPS = [
  {
    key: "wildcard",
    icon: Wand2,
    name: { en: "Wildcard", ar: "البطاقة الجوكر" },
    desc: {
      en: "Make unlimited free transfers for one gameweek",
      ar: "أجرِ تبديلات غير محدودة لجولة واحدة مجاناً",
    },
  },
  {
    key: "freeHit",
    icon: Zap,
    name: { en: "Free Hit", ar: "الضربة الحرة" },
    desc: {
      en: "Temporary squad for one gameweek, reset after",
      ar: "استخدم تشكيلة مؤقتة لجولة واحدة ثم تعود للأصلية",
    },
  },
  {
    key: "benchBoost",
    icon: Users,
    name: { en: "Bench Boost", ar: "تعزيز الاحتياط" },
    desc: {
      en: "Your bench players' points count this gameweek",
      ar: "نقاط لاعبي الاحتياط تُحتسب لهذه الجولة",
    },
  },
  {
    key: "tripleCaptain",
    icon: Star,
    name: { en: "Triple Captain", ar: "الكابتن الثلاثي" },
    desc: {
      en: "Your captain earns triple points this gameweek",
      ar: "كابتنك يحصل على ثلاثة أضعاف النقاط هذه الجولة",
    },
  },
] as const;

export function ChipPanel({ chips, usedGws, onActivate, activeChip }: ChipPanelProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {CHIPS.map((chip) => {
        const used = !chips[chip.key as keyof ChipStatus];
        const gwUsed = usedGws[chip.key as keyof typeof usedGws];
        const isActive = activeChip === chip.key;
        const Icon = chip.icon;

        return (
          <button
            key={chip.key}
            disabled={used}
            onClick={() => onActivate(chip.key)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition",
              isActive
                ? "border-yellow-400 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400"
                : used
                ? "cursor-not-allowed border-border bg-muted/30 opacity-50"
                : "border-border bg-card hover:border-primary hover:bg-primary/5"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-semibold leading-tight">{chip.name[lang]}</span>
            <p className="text-[9px] leading-tight text-muted-foreground">
              {chip.desc[lang]}
            </p>
            {used ? (
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                {isRTL
                  ? gwUsed
                    ? `استُخدم الجولة ${gwUsed}`
                    : "مستخدم"
                  : gwUsed
                  ? `Used GW${gwUsed}`
                  : "Used"}
              </span>
            ) : isActive ? (
              <span className="rounded-full bg-yellow-400/20 px-1.5 py-0.5 text-[9px] font-bold text-yellow-600">
                {isRTL ? "نشط" : "Active"}
              </span>
            ) : (
              <span className="rounded-full bg-green-500/10 px-1.5 py-0.5 text-[9px] text-green-600">
                {isRTL ? "متاح" : "Available"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
