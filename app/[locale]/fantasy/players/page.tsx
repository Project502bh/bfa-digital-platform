import { setRequestLocale } from "next-intl/server";
import { PlayersClient } from "./players-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "قاعدة بيانات اللاعبين - BFL Fantasy" : "Player Database - BFL Fantasy",
    description:
      locale === "ar"
        ? "تصفح إحصائيات جميع لاعبي الفانتازي"
        : "Browse all BFL Fantasy player statistics",
  };
}

export default async function PlayersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PlayersClient />;
}
