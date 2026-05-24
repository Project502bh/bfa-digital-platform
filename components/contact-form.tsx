"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
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
          <h3 className="mb-2 text-xl font-semibold">{t("form.success.title")}</h3>
          <p className="text-muted-foreground">{t("form.success.message")}</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => setIsSubmitted(false)}
          >
            {t("form.success.sendAnother")}
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
              <label htmlFor="name" className="text-sm font-medium">
                {t("form.name")} <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder={t("form.namePlaceholder")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t("form.email")} <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t("form.emailPlaceholder")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-medium">
              {t("form.phone")}
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t("form.phonePlaceholder")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-medium">
              {t("form.subject")} <span className="text-destructive">*</span>
            </label>
            <Input
              id="subject"
              name="subject"
              required
              placeholder={t("form.subjectPlaceholder")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t("form.message")} <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
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
