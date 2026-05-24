import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsArticle } from "@/lib/types";

const categoryLabels: Record<string, { en: string; ar: string }> = {
  national_team: { en: "National Team", ar: "المنتخب الوطني" },
  league: { en: "League", ar: "الدوري" },
  youth: { en: "Youth", ar: "الشباب" },
  announcements: { en: "Announcements", ar: "إعلانات" },
};

interface NewsCardProps {
  news: NewsArticle;
  featured?: boolean;
}

export function NewsCard({ news, featured = false }: NewsCardProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";
  const dateLocale = isRTL ? ar : enUS;

  const title = news.title[lang];
  const excerpt = news.excerpt[lang];
  const category = categoryLabels[news.category]?.[lang] || news.category;

  return (
    <Link href={`/news/${news.slug}`}>
      <Card className={`group overflow-hidden transition-all hover:shadow-lg ${featured ? "md:flex md:flex-row" : ""}`}>
        <div className={`relative overflow-hidden ${featured ? "md:w-1/2" : "aspect-video"}`}>
          <img
            src={news.image}
            alt={title}
            className={`size-full object-cover transition-transform duration-300 group-hover:scale-105 ${featured ? "aspect-video md:aspect-auto md:h-full" : ""}`}
          />
          <Badge className="absolute start-3 top-3" variant="secondary">
            {category}
          </Badge>
        </div>
        <CardContent className={`flex flex-col gap-2 p-4 ${featured ? "md:w-1/2 md:justify-center md:p-6" : ""}`}>
          <time className="text-xs text-muted-foreground">
            {format(new Date(news.publishedAt), "PPP", { locale: dateLocale })}
          </time>
          <h3 className={`font-semibold leading-tight transition-colors group-hover:text-primary ${featured ? "text-xl md:text-2xl" : "text-lg line-clamp-2"}`}>
            {title}
          </h3>
          <p className={`text-sm text-muted-foreground ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
            {excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
