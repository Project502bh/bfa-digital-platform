import { setRequestLocale } from "next-intl/server";
import { PointsClient } from "./points-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "نقاط الفريق - BFL Fantasy" : "My Points - BFL Fantasy",
    description:
      locale === "ar"
        ? "تحقق من نقاط فريقك في كل جولة"
        : "Check your squad points for each gameweek",
  };
}

export default async function PointsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PointsClient />;
}
