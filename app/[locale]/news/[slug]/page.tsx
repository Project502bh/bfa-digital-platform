import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Calendar, Facebook, Twitter } from "lucide-react";
import { newsItems } from "@/lib/data/news";
import { NewsCard } from "@/components/news-card";

const categoryLabels: Record<string, { en: string; ar: string }> = {
  national_team: { en: "National Team", ar: "المنتخب الوطني" },
  league: { en: "League", ar: "الدوري" },
  youth: { en: "Youth", ar: "الشباب" },
  announcements: { en: "Announcements", ar: "إعلانات" },
};

export async function generateStaticParams() {
  return newsItems.map((news) => ({ slug: news.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const lang = locale === "ar" ? "ar" : "en";
  const article = newsItems.find((n) => n.slug === slug);

  if (!article) return { title: "Not Found" };

  return {
    title: article.title[lang],
    description: article.excerpt[lang],
    openGraph: {
      title: article.title[lang],
      description: article.excerpt[lang],
      images: [article.image],
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = newsItems.find((n) => n.slug === slug);
  if (!article) notFound();

  return <NewsDetailContent slug={slug} />;
}

function NewsDetailContent({ slug }: { slug: string }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";
  const dateLocale = isRTL ? ar : enUS;

  const article = newsItems.find((n) => n.slug === slug)!;
  const title = article.title[lang];
  const content = article.content[lang];
  const category = categoryLabels[article.category]?.[lang] || article.category;

  const relatedNews = newsItems
    .filter((n) => n.category === article.category && n.id !== article.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <section className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        <img
          src={article.image}
          alt={title}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-12">
          <div className="container">
            <Badge variant="secondary" className="mb-4">
              {category}
            </Badge>
            <h1 className="mb-4 max-w-4xl text-balance text-2xl font-bold md:text-3xl lg:text-4xl">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <time>{format(new Date(article.publishedAt), "PPP", { locale: dateLocale })}</time>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Back Button */}
            <Button variant="ghost" className="mb-8" asChild>
              <Link href="/news">
                {isRTL ? (
                  <ArrowRight className="size-4" />
                ) : (
                  <ArrowLeft className="size-4" />
                )}
                {t("backToNews")}
              </Link>
            </Button>

            {/* Article Content */}
            <article className="prose prose-gray dark:prose-invert max-w-none">
              {content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Share Buttons */}
            <Separator className="my-8" />
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{t("share")}:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="size-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold">{t("relatedNews")}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
