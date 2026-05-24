import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/news-card";
import { newsItems, newsCategories } from "@/lib/data/news";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الأخبار" : "News",
    description: locale === "ar" 
      ? "آخر أخبار اتحاد كرة القدم البحريني"
      : "Latest news from the Bahrain Football Association",
  };
}

export default async function NewsPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  return <NewsContent category={category} />;
}

function NewsContent({ category }: { category?: string }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const categories = newsCategories.map((cat) => ({
    ...cat,
    label: isRTL ? cat.labelAr : cat.labelEn,
  }));

  const filteredNews = category
    ? newsItems.filter((item) => item.category === category)
    : newsItems;

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
              href="/news"
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
                href={`/news?category=${cat.value}`}
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

      {/* News Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          {filteredNews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted-foreground">{t("noNews")}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((news, index) => (
                <NewsCard
                  key={news.id}
                  news={news}
                  featured={index === 0 && !category}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
