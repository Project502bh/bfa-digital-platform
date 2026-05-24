export type SponsorshipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface SponsorshipPackage {
  id: SponsorshipTier;
  price: { en: string; ar: string };
  period: { en: string; ar: string };
  highlighted: boolean;
  benefits: { en: string; ar: string }[];
}

export const sponsorshipPackages: SponsorshipPackage[] = [
  {
    id: 'bronze',
    price: { en: 'BD 5,000', ar: 'BD 5,000' },
    period: { en: 'per season', ar: 'لكل موسم' },
    highlighted: false,
    benefits: [
      { en: 'Logo on match day programmes', ar: 'شعار في برامج يوم المباراة' },
      { en: 'Social media mention (2× per month)', ar: 'ذكر على وسائل التواصل الاجتماعي (مرتين شهرياً)' },
      { en: 'BFA website logo listing', ar: 'إدراج الشعار في موقع الاتحاد' },
      { en: '5 VIP match tickets per game', ar: '5 تذاكر VIP لكل مباراة' },
    ],
  },
  {
    id: 'silver',
    price: { en: 'BD 15,000', ar: 'BD 15,000' },
    period: { en: 'per season', ar: 'لكل موسم' },
    highlighted: false,
    benefits: [
      { en: 'All Bronze benefits', ar: 'جميع مزايا الباقة البرونزية' },
      { en: 'Match day perimeter banner (1 board)', ar: 'لافتة محيط يوم المباراة (لوحة واحدة)' },
      { en: 'Logo on official BFA communications', ar: 'شعار على مراسلات الاتحاد الرسمية' },
      { en: '15 VIP match tickets per game', ar: '15 تذكرة VIP لكل مباراة' },
      { en: 'Dedicated social media post (monthly)', ar: 'منشور خاص على وسائل التواصل (شهرياً)' },
    ],
  },
  {
    id: 'gold',
    price: { en: 'BD 30,000', ar: 'BD 30,000' },
    period: { en: 'per season', ar: 'لكل موسم' },
    highlighted: true,
    benefits: [
      { en: 'All Silver benefits', ar: 'جميع مزايا الباقة الفضية' },
      { en: 'LED perimeter board exposure during matches', ar: 'عرض على اللوحة المحيطية LED أثناء المباريات' },
      { en: 'Logo on press conference backdrop', ar: 'شعار على خلفية المؤتمر الصحفي' },
      { en: '25 VIP match tickets per game', ar: '25 تذكرة VIP لكل مباراة' },
      { en: 'Hospitality suite access (selected matches)', ar: 'الوصول إلى جناح الضيافة (مباريات مختارة)' },
      { en: 'Co-branded digital content', ar: 'محتوى رقمي مشترك' },
    ],
  },
  {
    id: 'platinum',
    price: { en: 'BD 60,000', ar: 'BD 60,000' },
    period: { en: 'per season', ar: 'لكل موسم' },
    highlighted: false,
    benefits: [
      { en: 'All Gold benefits', ar: 'جميع مزايا الباقة الذهبية' },
      { en: 'Jersey sleeve logo (national team)', ar: 'شعار على كم القميص (المنتخب الوطني)' },
      { en: 'Title sponsorship of one BFA competition', ar: 'الرعاية الرئيسية لإحدى مسابقات الاتحاد' },
      { en: 'Full stadium branding rights', ar: 'حقوق العلامة التجارية الكاملة في الملعب' },
      { en: 'Exclusive hospitality for all home matches', ar: 'ضيافة حصرية في جميع المباريات الرئيسية' },
      { en: 'Annual joint media campaign', ar: 'حملة إعلامية مشتركة سنوية' },
      { en: 'CEO-level BFA partnership meetings', ar: 'اجتماعات شراكة على مستوى الرئيس التنفيذي' },
    ],
  },
];

export const sponsorshipTierNames: Record<SponsorshipTier, { en: string; ar: string }> = {
  bronze: { en: 'Bronze', ar: 'برونزي' },
  silver: { en: 'Silver', ar: 'فضي' },
  gold: { en: 'Gold', ar: 'ذهبي' },
  platinum: { en: 'Platinum', ar: 'بلاتيني' },
};
