import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DocumentCard } from "@/components/document-card";
import { documents, documentCategories } from "@/lib/data/documents";
import { Link } from "@/i18n/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الوثائق" : "Documents",
    description: locale === "ar" 
      ? "تحميل اللوائح والنماذج والتقارير الرسمية"
      : "Download official regulations, forms, and reports",
  };
}

export default async function DocumentsPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  return <DocumentsContent category={category} />;
}

function DocumentsContent({ category }: { category?: string }) {
  const t = useTranslations("documents");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const categories = documentCategories.map((cat) => ({
    ...cat,
    label: isRTL ? cat.labelAr : cat.labelEn,
  }));

  const filteredDocuments = category
    ? documents.filter((doc) => doc.category === category)
    : documents;

  // Group documents by category for display
  const groupedDocuments = categories.map((cat) => ({
    ...cat,
    documents: documents.filter((doc) => doc.category === cat.value),
  }));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("badge")}
            </Badge>
            <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="border-b border-border bg-muted/30 py-4">
        <div className="container">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/documents"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                !category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {t("allCategories")}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={`/documents?category=${cat.value}`}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  category === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-12 md:py-16">
        <div className="container">
          {category ? (
            // Show filtered documents
            <div>
              {filteredDocuments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-lg text-muted-foreground">{t("noDocuments")}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredDocuments.map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Show all documents grouped by category
            <div className="flex flex-col gap-12">
              {groupedDocuments.map((group) => (
                group.documents.length > 0 && (
                  <div key={group.value}>
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-xl font-bold">{group.label}</h2>
                      <Badge variant="outline">
                        {group.documents.length} {t("files")}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-4">
                      {group.documents.map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
