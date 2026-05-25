import type { Match } from './types';

export const matches: Match[] = [
  {
    id: '1',
    homeTeam: {
      name: {
        en: 'Bahrain',
        ar: 'البحرين',
      },
      logo: '/images/teams/bahrain.png',
      score: 2,
    },
    awayTeam: {
      name: {
        en: 'Kuwait',
        ar: 'الكويت',
      },
      logo: '/images/teams/kuwait.png',
      score: 1,
    },
    competition: {
      en: 'Gulf Cup 2026',
      ar: 'كأس الخليج 2026',
    },
    venue: {
      en: 'Bahrain National Stadium, Riffa',
      ar: 'الملعب الوطني بالرفاع',
    },
    datetime: '2026-05-22T19:00:00',
    status: 'completed',
  },
  {
    id: '2',
    homeTeam: {
      name: {
        en: 'Bahrain',
        ar: 'البحرين',
      },
      logo: '/images/teams/bahrain.png',
    },
    awayTeam: {
      name: {
        en: 'Saudi Arabia',
        ar: 'السعودية',
      },
      logo: '/images/teams/saudi.png',
    },
    competition: {
      en: 'World Cup Qualifier',
      ar: 'تصفيات كأس العالم',
    },
    venue: {
      en: 'Bahrain National Stadium, Riffa',
      ar: 'الملعب الوطني بالرفاع',
    },
    datetime: '2026-05-28T20:00:00',
    status: 'scheduled',
    tickets: [
      {
        id: 'vip',
        name: { en: 'VIP Box', ar: 'صندوق VIP' },
        description: { en: 'Premium seating with exclusive hospitality lounge access', ar: 'مقاعد مميزة مع الوصول إلى صالة الضيافة الحصرية' },
        price: 25,
        available: 42,
        total: 50,
        color: 'bg-yellow-500',
      },
      {
        id: 'east',
        name: { en: 'East Stand', ar: 'المدرج الشرقي' },
        description: { en: 'Gold category — excellent central pitch view', ar: 'الفئة الذهبية — منظر مركزي ممتاز للملعب' },
        price: 15,
        available: 164,
        total: 200,
        color: 'bg-orange-400',
      },
      {
        id: 'west',
        name: { en: 'West Stand', ar: 'المدرج الغربي' },
        description: { en: 'Silver category — great atmosphere and value', ar: 'الفئة الفضية — أجواء رائعة وقيمة ممتازة' },
        price: 10,
        available: 278,
        total: 300,
        color: 'bg-slate-400',
      },
      {
        id: 'north',
        name: { en: 'North Stand', ar: 'المدرج الشمالي' },
        description: { en: 'General admission — join the heart of the fans', ar: 'دخول عام — انضم إلى قلب المشجعين' },
        price: 5,
        available: 487,
        total: 500,
        color: 'bg-green-500',
      },
    ],
  },
  {
    id: '3',
    homeTeam: {
      name: {
        en: 'Muharraq',
        ar: 'المحرق',
      },
      logo: '/images/teams/muharraq.png',
      score: 1,
    },
    awayTeam: {
      name: {
        en: 'Riffa',
        ar: 'الرفاع',
      },
      logo: '/images/teams/riffa.png',
      score: 1,
    },
    competition: {
      en: 'Bahraini Premier League',
      ar: 'الدوري البحريني الممتاز',
    },
    venue: {
      en: 'Muharraq Stadium',
      ar: 'ملعب المحرق',
    },
    datetime: '2026-05-24T18:30:00',
    status: 'live',
    minute: 67,
  },
  {
    id: '4',
    homeTeam: {
      name: {
        en: 'Manama',
        ar: 'المنامة',
      },
      logo: '/images/teams/manama.png',
    },
    awayTeam: {
      name: {
        en: 'East Riffa',
        ar: 'الرفاع الشرقي',
      },
      logo: '/images/teams/east-riffa.png',
    },
    competition: {
      en: 'Bahraini Premier League',
      ar: 'الدوري البحريني الممتاز',
    },
    venue: {
      en: 'Manama Club Stadium',
      ar: 'ملعب نادي المنامة',
    },
    datetime: '2026-05-26T19:00:00',
    status: 'scheduled',
    tickets: [
      {
        id: 'east',
        name: { en: 'East Stand', ar: 'المدرج الشرقي' },
        description: { en: 'Gold category — excellent pitch view', ar: 'الفئة الذهبية — منظر ممتاز للملعب' },
        price: 8,
        available: 120,
        total: 150,
        color: 'bg-orange-400',
      },
      {
        id: 'west',
        name: { en: 'West Stand', ar: 'المدرج الغربي' },
        description: { en: 'Silver category — great value seats', ar: 'الفئة الفضية — مقاعد بقيمة ممتازة' },
        price: 5,
        available: 210,
        total: 250,
        color: 'bg-slate-400',
      },
      {
        id: 'north',
        name: { en: 'General Admission', ar: 'دخول عام' },
        description: { en: 'Standing area with great fan atmosphere', ar: 'منطقة وقوف مع أجواء مشجعين رائعة' },
        price: 3,
        available: 390,
        total: 400,
        color: 'bg-green-500',
      },
    ],
  },
  {
    id: '5',
    homeTeam: {
      name: {
        en: 'Bahrain',
        ar: 'البحرين',
      },
      logo: '/images/teams/bahrain.png',
    },
    awayTeam: {
      name: {
        en: 'Oman',
        ar: 'عمان',
      },
      logo: '/images/teams/oman.png',
    },
    competition: {
      en: 'Friendly Match',
      ar: 'مباراة ودية',
    },
    venue: {
      en: 'Bahrain National Stadium, Riffa',
      ar: 'الملعب الوطني بالرفاع',
    },
    datetime: '2026-06-05T20:00:00',
    status: 'scheduled',
    tickets: [
      {
        id: 'vip',
        name: { en: 'VIP Box', ar: 'صندوق VIP' },
        description: { en: 'Premium seating with hospitality lounge access', ar: 'مقاعد مميزة مع صالة الضيافة' },
        price: 20,
        available: 48,
        total: 50,
        color: 'bg-yellow-500',
      },
      {
        id: 'east',
        name: { en: 'East Stand', ar: 'المدرج الشرقي' },
        description: { en: 'Gold category — central view', ar: 'الفئة الذهبية — منظر مركزي' },
        price: 12,
        available: 195,
        total: 200,
        color: 'bg-orange-400',
      },
      {
        id: 'west',
        name: { en: 'West Stand', ar: 'المدرج الغربي' },
        description: { en: 'Silver category — great atmosphere', ar: 'الفئة الفضية — أجواء رائعة' },
        price: 8,
        available: 290,
        total: 300,
        color: 'bg-slate-400',
      },
      {
        id: 'north',
        name: { en: 'North Stand', ar: 'المدرج الشمالي' },
        description: { en: 'General admission', ar: 'دخول عام' },
        price: 4,
        available: 476,
        total: 500,
        color: 'bg-green-500',
      },
    ],
  },
];

export const competitions = [
  { value: 'Gulf Cup 2026', labelEn: 'Gulf Cup 2026', labelAr: 'كأس الخليج 2026' },
  { value: 'World Cup Qualifier', labelEn: 'World Cup Qualifier', labelAr: 'تصفيات كأس العالم' },
  { value: 'Bahraini Premier League', labelEn: 'Bahraini Premier League', labelAr: 'الدوري البحريني الممتاز' },
  { value: 'Friendly Match', labelEn: 'Friendly Match', labelAr: 'مباراة ودية' },
] as const;

export function getMatchById(id: string): Match | undefined {
  return matches.find((match) => match.id === id);
}

export function getMatchesByStatus(status?: Match['status']): Match[] {
  if (!status) return matches;
  return matches.filter((match) => match.status === status);
}

export function getUpcomingMatches(): Match[] {
  return matches
    .filter((match) => match.status === 'scheduled')
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
}

export function getLiveMatches(): Match[] {
  return matches.filter((match) => match.status === 'live');
}
