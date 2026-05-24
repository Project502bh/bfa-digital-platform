"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";
import { sponsorshipTierNames, type SponsorshipTier } from "@/lib/data/sponsorship";

const tiers: SponsorshipTier[] = ["bronze", "silver", "gold", "platinum"];

export function SponsorshipForm({ defaultPackage }: { defaultPackage?: SponsorshipTier }) {
  const t = useTranslations("sponsorship");
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<SponsorshipTier | "">(defaultPackage ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="size-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">{t("form.successTitle")}</h3>
          <p className="text-muted-foreground">{t("form.successMessage")}</p>
          <Button variant="outline" className="mt-6" onClick={() => setIsSubmitted(false)}>
            {t("form.sendAnother")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("form.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="sp-name" className="text-sm font-medium">
                {t("form.name")} <span className="text-destructive">*</span>
              </label>
              <Input id="sp-name" name="name" required placeholder={t("form.namePlaceholder")} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="sp-org" className="text-sm font-medium">
                {t("form.organization")} <span className="text-destructive">*</span>
              </label>
              <Input id="sp-org" name="organization" required placeholder={t("form.organizationPlaceholder")} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="sp-email" className="text-sm font-medium">
                {t("form.email")} <span className="text-destructive">*</span>
              </label>
              <Input id="sp-email" name="email" type="email" required placeholder={t("form.emailPlaceholder")} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="sp-phone" className="text-sm font-medium">
                {t("form.phone")}
              </label>
              <Input id="sp-phone" name="phone" type="tel" placeholder={t("form.phonePlaceholder")} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="sp-package" className="text-sm font-medium">
              {t("form.package")}
            </label>
            <select
              id="sp-package"
              name="package"
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value as SponsorshipTier | "")}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">{t("form.packagePlaceholder")}</option>
              {tiers.map((tier) => (
                <option key={tier} value={tier}>
                  {sponsorshipTierNames[tier][lang]}
                </option>
              ))}
              <option value="custom">{t("form.packageCustom")}</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="sp-message" className="text-sm font-medium">
              {t("form.message")} <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="sp-message"
              name="message"
              required
              rows={5}
              placeholder={t("form.messagePlaceholder")}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto sm:self-end">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {t("form.sending")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="size-4" />
                {t("form.submit")}
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
