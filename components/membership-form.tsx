"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, Crown, Star, ChevronDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { membershipPlans, clubs } from "@/lib/data/memberships";
import type { MembershipType } from "@/lib/types";

function generateMembershipNumber() {
  return "BFA-M-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

interface MembershipFormProps {
  initialPlan?: MembershipType;
}

export function MembershipForm({ initialPlan }: MembershipFormProps) {
  const t = useTranslations("membership");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

  const [selectedPlan, setSelectedPlan] = useState<MembershipType>(initialPlan ?? "regular");
  const [selectedClub, setSelectedClub] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [membershipNumber, setMembershipNumber] = useState("");

  const plan = membershipPlans.find((p) => p.id === selectedPlan)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (selectedPlan === "regular" && !selectedClub) {
      setError(t("selectClubError"));
      return;
    }
    if (!agreed) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setMembershipNumber(generateMembershipNumber());
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    const club = clubs.find((c) => c.id === selectedClub);
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="size-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-700">{t("successTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("successMessage")}</p>
        </div>
        <Card className="w-full max-w-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{t("membershipNumber")}</p>
            <p className="mt-1 text-xl font-bold tracking-widest text-primary">{membershipNumber}</p>
            <Separator className="my-4" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("plan")}</span>
              <span className="font-semibold">
                {selectedPlan === "premium" ? t("premiumName") : t("regularName")}
              </span>
            </div>
            {selectedPlan === "regular" && club && (
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-muted-foreground">{t("club")}</span>
                <span className="font-semibold">{club.name[lang]}</span>
              </div>
            )}
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-muted-foreground">{t("annualFee")}</span>
              <span className="font-semibold">{t("currency")} {plan.price.toFixed(3)}</span>
            </div>
          </CardContent>
        </Card>
        <p className="max-w-md text-xs text-muted-foreground">{t("disclaimer")}</p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setAgreed(false);
            setName(""); setEmail(""); setPhone(""); setDob(""); setIdNumber(""); setSelectedClub("");
          }}
        >
          {t("registerAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
      {/* Left: plan selection + details */}
      <div className="lg:col-span-2 flex flex-col gap-8">

        {/* Plan selector */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{t("choosePlan")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {membershipPlans.map((p) => {
              const isSelected = selectedPlan === p.id;
              const isPremium = p.id === "premium";
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlan(p.id)}
                  className={cn(
                    "relative flex flex-col gap-3 rounded-xl border-2 p-5 text-start transition-all",
                    isSelected
                      ? isPremium
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                        : "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  )}
                >
                  {isPremium && (
                    <Badge className="absolute end-3 top-3 gap-1 bg-yellow-500 text-white hover:bg-yellow-500">
                      <Crown className="size-3" />
                      {t("popular")}
                    </Badge>
                  )}

                  <div className={cn(
                    "flex size-10 items-center justify-center rounded-full",
                    isPremium ? "bg-yellow-100 text-yellow-600" : "bg-primary/10 text-primary"
                  )}>
                    {isPremium ? <Crown className="size-5" /> : <Star className="size-5" />}
                  </div>

                  <div>
                    <p className="font-bold">{p.id === "premium" ? t("premiumName") : t("regularName")}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {p.id === "premium" ? t("premiumTagline") : t("regularTagline")}
                    </p>
                  </div>

                  <div>
                    <span className={cn("text-2xl font-bold", isPremium ? "text-yellow-600" : "text-primary")}>
                      {t("currency")} {p.price.toFixed(3)}
                    </span>
                    <span className="text-sm text-muted-foreground"> / {t("year")}</span>
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {p.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className={cn("mt-0.5 size-3.5 shrink-0", isPremium ? "text-yellow-500" : "text-primary")} />
                        {b[lang]}
                      </li>
                    ))}
                  </ul>

                  {isSelected && (
                    <div className={cn(
                      "absolute inset-0 rounded-xl ring-2",
                      isPremium ? "ring-yellow-500" : "ring-primary"
                    )} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Club selector (Regular only) */}
        {selectedPlan === "regular" && (
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{t("chooseClub")}</h2>
            <p className="text-sm text-muted-foreground">{t("chooseClubDesc")}</p>
            <div className="relative">
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="w-full appearance-none rounded-lg border border-border bg-background px-4 py-3 pe-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required={selectedPlan === "regular"}
              >
                <option value="">{t("selectClubPlaceholder")}</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name[lang]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Personal details */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{t("personalDetails")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="m-name">{t("name")} *</Label>
              <Input id="m-name" placeholder={t("namePlaceholder")} value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="m-email">{t("email")} *</Label>
              <Input id="m-email" type="email" placeholder={t("emailPlaceholder")} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="m-phone">{t("phone")} *</Label>
              <Input id="m-phone" type="tel" placeholder={t("phonePlaceholder")} value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="m-dob">{t("dob")} *</Label>
              <Input id="m-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="m-id">{t("idNumber")} *</Label>
              <Input id="m-id" placeholder={t("idNumberPlaceholder")} value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
            </div>
          </div>
        </div>
      </div>

      {/* Right: summary + submit */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <Card className={cn(
          "border-2",
          selectedPlan === "premium" ? "border-yellow-500/40 bg-yellow-50/50 dark:bg-yellow-950/10" : "border-primary/20"
        )}>
          <CardContent className="pt-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex size-10 items-center justify-center rounded-full",
                selectedPlan === "premium" ? "bg-yellow-100 text-yellow-600" : "bg-primary/10 text-primary"
              )}>
                {selectedPlan === "premium" ? <Crown className="size-5" /> : <Star className="size-5" />}
              </div>
              <div>
                <p className="font-bold">
                  {selectedPlan === "premium" ? t("premiumName") : t("regularName")}
                </p>
                <p className="text-xs text-muted-foreground">{t("annualMembership")}</p>
              </div>
            </div>

            {selectedPlan === "regular" && selectedClub && (
              <>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("club")}</span>
                  <span className="font-medium">
                    {clubs.find((c) => c.id === selectedClub)?.name[lang] ?? "—"}
                  </span>
                </div>
              </>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-semibold">{t("annualFee")}</span>
              <span className={cn("text-xl font-bold", selectedPlan === "premium" ? "text-yellow-600" : "text-primary")}>
                {t("currency")} {plan.price.toFixed(3)}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-primary"
            />
            <span className="text-muted-foreground">{t("terms")}</span>
          </label>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className={cn("w-full", selectedPlan === "premium" && "bg-yellow-500 text-white hover:bg-yellow-600")}
            disabled={submitting || !agreed}
          >
            {submitting ? t("processing") : t("submit")}
          </Button>
          <p className="text-center text-xs text-muted-foreground">{t("disclaimer")}</p>
        </div>
      </div>
    </form>
  );
}
