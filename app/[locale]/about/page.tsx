import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Award, Users, Building2, Trophy } from "lucide-react";
import { leaders, achievements } from "@/lib/data/about";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "من نحن" : "About Us",
    description: locale === "ar"
      ? "تعرف على اتحاد كرة القدم البحريني - تاريخنا ورؤيتنا ومهمتنا"
      : "Learn about the Bahrain Football Association - our history, vision, and mission",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

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

      {/* Mission & Vision */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Target className="size-6" />
                  </div>
                  <CardTitle className="text-xl">{t("mission.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t("mission.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Eye className="size-6" />
                  </div>
                  <CardTitle className="text-xl">{t("vision.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t("vision.description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Building2 className="size-6" />
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">{t("history.title")}</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {t("history.description").split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="size-6" />
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">{t("leadership.title")}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((person) => (
              <Card key={person.id} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-muted">
                    {person.image ? (
                      <img
                        src={person.image}
                        alt={person.name[lang]}
                        className="size-full rounded-full object-cover"
                      />
                    ) : (
                      <Users className="size-10 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="font-semibold">{person.name[lang]}</h3>
                  <p className="text-sm text-muted-foreground">{person.position[lang]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy className="size-6" />
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">{t("achievements.title")}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {achievement.year}
                    </Badge>
                    <h3 className="font-semibold">{achievement.title[lang]}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {achievement.description[lang]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
