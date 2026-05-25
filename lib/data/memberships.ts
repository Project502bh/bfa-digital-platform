import type { Club, MembershipPlan } from '../types';

export const clubs: Club[] = [
  { id: 'muharraq',   name: { en: 'Muharraq FC',       ar: 'نادي المحرق'        } },
  { id: 'riffa',      name: { en: 'Riffa Club',         ar: 'نادي الرفاع'        } },
  { id: 'manama',     name: { en: 'Manama Club',        ar: 'نادي المنامة'       } },
  { id: 'east-riffa', name: { en: 'East Riffa Club',    ar: 'نادي الرفاع الشرقي' } },
  { id: 'al-ahli',    name: { en: 'Al-Ahli Club',       ar: 'نادي الأهلي'        } },
  { id: 'al-hidd',    name: { en: 'Al-Hidd Club',       ar: 'نادي الحد'          } },
  { id: 'al-najma',   name: { en: 'Al-Najma Club',      ar: 'نادي النجمة'        } },
  { id: 'busaiteen',  name: { en: 'Busaiteen Club',     ar: 'نادي البسيتين'      } },
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'regular',
    price: 20,
    highlighted: false,
    benefits: [
      { en: 'Access to all home matches for your chosen club', ar: 'الدخول لجميع المباريات المنزلية للنادي المختار' },
      { en: 'Digital BFA member card', ar: 'بطاقة عضوية BFA رقمية' },
      { en: 'Club newsletter & match-day updates', ar: 'نشرة النادي وتحديثات يوم المباراة' },
      { en: '48-hour early ticket booking window', ar: 'نافذة حجز مبكر للتذاكر قبل 48 ساعة' },
      { en: 'Exclusive member discounts at your club\'s shop', ar: 'خصومات حصرية للأعضاء في متجر ناديك' },
    ],
  },
  {
    id: 'premium',
    price: 50,
    highlighted: true,
    benefits: [
      { en: 'Unlimited access to ALL matches across ALL clubs', ar: 'الدخول غير المحدود لجميع المباريات في جميع الأندية' },
      { en: 'Priority seating allocation at every venue', ar: 'أولوية تخصيص المقاعد في جميع الملاعب' },
      { en: 'Digital member card + physical premium welcome pack', ar: 'بطاقة عضوية رقمية + حقيبة ترحيب بريميوم' },
      { en: 'All club newsletters & exclusive BFA digital content', ar: 'جميع نشرات الأندية والمحتوى الرقمي الحصري للاتحاد' },
      { en: '72-hour priority ticket booking window', ar: 'نافذة حجز تذاكر بأولوية قبل 72 ساعة' },
      { en: 'Exclusive members\' lounge access on match days', ar: 'وصول حصري لصالة الأعضاء المميزة أيام المباريات' },
      { en: 'Invitations to BFA events & annual gala dinner', ar: 'دعوات لفعاليات الاتحاد وحفل العشاء السنوي' },
      { en: '20% merchandise discount across all clubs', ar: 'خصم 20% على البضائع في جميع الأندية' },
    ],
  },
];
