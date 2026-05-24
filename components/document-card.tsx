import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import type { Document } from "@/lib/types";

const categoryLabels: Record<string, { en: string; ar: string }> = {
  regulations: { en: "Regulations", ar: "اللوائح" },
  guidelines: { en: "Guidelines", ar: "الإرشادات" },
  forms: { en: "Forms", ar: "النماذج" },
  reports: { en: "Reports", ar: "التقارير" },
};

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const t = useTranslations("documents");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";
  const dateLocale = isRTL ? ar : enUS;

  const title = document.title[lang];
  const description = document.description[lang];
  const category = categoryLabels[document.category]?.[lang] ?? document.category;

  return (
    <Card className="group transition-all hover:shadow-md">
      <CardContent className="flex items-start gap-4 p-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="size-6" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold transition-colors group-hover:text-primary">
                {title}
              </h3>
              {description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <Badge variant="outline" className="shrink-0">
              {category}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <span>{format(new Date(document.updatedAt), "PP", { locale: dateLocale })}</span>
            </div>
            <span>{document.fileSize}</span>
          </div>
        </div>

        <Button variant="outline" size="icon" className="shrink-0" asChild>
          <a href={document.fileUrl} download target="_blank" rel="noopener noreferrer">
            <Download className="size-4" />
            <span className="sr-only">{t("downloadPdf")}</span>
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
