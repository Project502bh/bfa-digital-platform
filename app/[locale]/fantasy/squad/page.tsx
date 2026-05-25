import { setRequestLocale } from "next-intl/server";
import { SquadSelectionClient } from "./squad-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "اختيار الفريق - BFL Fantasy" : "Squad Selection - BFL Fantasy",
    description:
      locale === "ar"
        ? "اختر تشكيلتك لدوري البحرين الخيالي"
        : "Pick your BFL Fantasy squad",
  };
}

export default async function SquadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SquadSelectionClient />;
}
