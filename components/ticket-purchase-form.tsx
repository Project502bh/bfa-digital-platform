"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Minus, Plus, Ticket, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { TicketCategory } from "@/lib/types";

interface TicketSelection {
  [categoryId: string]: number;
}

interface TicketPurchaseFormProps {
  matchId: string;
  categories: TicketCategory[];
}

function generateBookingRef() {
  return "BFA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function TicketPurchaseForm({ matchId, categories }: TicketPurchaseFormProps) {
  const t = useTranslations("tickets");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

  const [selection, setSelection] = useState<TicketSelection>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const updateQty = (categoryId: string, delta: number, max: number) => {
    setSelection((prev) => {
      const current = prev[categoryId] ?? 0;
      const next = Math.min(Math.max(0, current + delta), Math.min(max, 6));
      if (next === 0) {
        const { [categoryId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [categoryId]: next };
    });
  };

  const totalTickets = Object.values(selection).reduce((a, b) => a + b, 0);
  const totalAmount = categories.reduce((sum, cat) => {
    return sum + (selection[cat.id] ?? 0) * cat.price;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (totalTickets === 0) {
      setError(t("noTicketsSelected"));
      return;
    }
    if (!agreed) return;

    setSubmitting(true);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 1500));
    setBookingRef(generateBookingRef());
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
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
            <p className="text-sm text-muted-foreground">{t("bookingRef")}</p>
            <p className="mt-1 text-2xl font-bold tracking-widest text-primary">{bookingRef}</p>
            <Separator className="my-4" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("totalTickets")}</span>
              <span className="font-semibold">{totalTickets}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-muted-foreground">{t("total")}</span>
              <span className="font-semibold">
                {t("currency")} {totalAmount.toFixed(3)}
              </span>
            </div>
          </CardContent>
        </Card>
        <p className="max-w-md text-xs text-muted-foreground">
          {t("disclaimer")}
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setSelection({}); setAgreed(false); }}>
          {t("bookAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
      {/* Left: Ticket selection */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold">{t("selectTickets")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="flex flex-col gap-4">
          {categories.map((cat) => {
            const qty = selection[cat.id] ?? 0;
            const soldOut = cat.available === 0;
            const occupancyPct = Math.round(((cat.total - cat.available) / cat.total) * 100);

            return (
              <Card
                key={cat.id}
                className={cn(
                  "transition-all",
                  qty > 0 && "ring-2 ring-primary",
                  soldOut && "opacity-60"
                )}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className={cn("mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg text-white", cat.color)}>
                        <Ticket className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{cat.name[lang]}</span>
                          {soldOut ? (
                            <Badge variant="destructive" className="text-xs">{t("soldOut")}</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {cat.available} {t("available")}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{cat.description[lang]}</p>

                        {/* Availability bar */}
                        <div className="mt-2 h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn("h-full rounded-full transition-all", cat.color)}
                            style={{ width: `${100 - occupancyPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-2">
                      <div className="text-end">
                        <span className="text-lg font-bold text-primary">
                          {t("currency")} {cat.price.toFixed(3)}
                        </span>
                        <span className="block text-xs text-muted-foreground">{t("perTicket")}</span>
                      </div>

                      {/* Qty selector */}
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-8"
                          onClick={() => updateQty(cat.id, -1, cat.available)}
                          disabled={soldOut || qty === 0}
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-8"
                          onClick={() => updateQty(cat.id, 1, cat.available)}
                          disabled={soldOut || qty >= Math.min(cat.available, 6)}
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact details */}
        <div>
          <h2 className="text-xl font-bold">{t("yourDetails")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{isRTL ? "أدخل بياناتك لإتمام الحجز" : "Enter your information to complete the booking"}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ticket-name">{t("name")} *</Label>
            <Input
              id="ticket-name"
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ticket-email">{t("email")} *</Label>
            <Input
              id="ticket-email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ticket-phone">{t("phone")} *</Label>
            <Input
              id="ticket-phone"
              type="tel"
              placeholder={t("phonePlaceholder")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ticket-id">{t("idNumber")}</Label>
            <Input
              id="ticket-id"
              placeholder={t("idNumberPlaceholder")}
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Right: Order summary */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("orderSummary")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {totalTickets === 0 ? (
              <p className="text-sm text-muted-foreground">
                {isRTL ? "لم يتم اختيار تذاكر بعد" : "No tickets selected yet"}
              </p>
            ) : (
              <>
                {categories
                  .filter((cat) => (selection[cat.id] ?? 0) > 0)
                  .map((cat) => {
                    const qty = selection[cat.id];
                    return (
                      <div key={cat.id} className="flex items-center justify-between gap-2 text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={cn("size-2.5 shrink-0 rounded-full", cat.color)} />
                          <span className="truncate">{cat.name[lang]}</span>
                          <span className="shrink-0 text-muted-foreground">× {qty}</span>
                        </div>
                        <span className="shrink-0 font-medium">
                          {t("currency")} {(cat.price * (qty ?? 0)).toFixed(3)}
                        </span>
                      </div>
                    );
                  })}

                <Separator />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("totalTickets")}</span>
                  <span className="font-semibold">{totalTickets}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t("total")}</span>
                  <span className="text-lg font-bold text-primary">
                    {t("currency")} {totalAmount.toFixed(3)}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Terms & Submit */}
        <div className="flex flex-col gap-4">
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
            className="w-full"
            disabled={submitting || !agreed || totalTickets === 0}
            size="lg"
          >
            {submitting ? t("sending") : t("submit")}
          </Button>

          <p className="text-center text-xs text-muted-foreground">{t("disclaimer")}</p>
        </div>
      </div>
    </form>
  );
}
