import { setRequestLocale } from "next-intl/server";
import { LeaguesClient } from "./leagues-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الدوريات - BFL Fantasy" : "Leagues - BFL Fantasy",
    description:
      locale === "ar"
        ? "تنافس في دوري البحرين الخيالي"
        : "Compete in BFL Fantasy leagues",
  };
}

export default async function LeaguesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LeaguesClient />;
}
