import type { Leader } from './types';

export const leaders: Leader[] = [
  {
    id: '1',
    name: {
      en: 'Sheikh Ali bin Khalifa Al Khalifa',
      ar: 'الشيخ علي بن خليفة آل خليفة',
    },
    position: {
      en: 'President',
      ar: 'الرئيس',
    },
    image: '/images/leaders/president.jpg',
  },
  {
    id: '2',
    name: {
      en: 'Ahmed Al Saati',
      ar: 'أحمد الساعاتي',
    },
    position: {
      en: 'Vice President',
      ar: 'نائب الرئيس',
    },
    image: '/images/leaders/vice-president.jpg',
  },
  {
    id: '3',
    name: {
      en: 'Mohammed Al Ansari',
      ar: 'محمد الأنصاري',
    },
    position: {
      en: 'General Secretary',
      ar: 'الأمين العام',
    },
    image: '/images/leaders/general-secretary.jpg',
  },
];

export const achievements = [
  {
    id: '1',
    year: '1966',
    title: { en: 'FIFA Membership', ar: 'العضوية في الفيفا' },
    description: { en: 'Bahrain joined FIFA as an official member federation.', ar: 'انضمت البحرين إلى الفيفا كاتحاد عضو رسمي.' },
  },
  {
    id: '2',
    year: '1970',
    title: { en: 'AFC Membership', ar: 'العضوية في الاتحاد الآسيوي' },
    description: { en: 'Bahrain became a member of the Asian Football Confederation.', ar: 'أصبحت البحرين عضواً في الاتحاد الآسيوي لكرة القدم.' },
  },
  {
    id: '3',
    year: '2004',
    title: { en: 'Gulf Cup Champions', ar: 'بطل كأس الخليج' },
    description: { en: 'Bahrain national team won the Gulf Cup for the first time.', ar: 'فاز المنتخب البحريني بكأس الخليج للمرة الأولى.' },
  },
  {
    id: '4',
    year: '2012',
    title: { en: 'AFC Challenge Cup', ar: 'كأس التحدي الآسيوي' },
    description: { en: 'Bahrain reached the final of the AFC Challenge Cup.', ar: 'وصل المنتخب البحريني إلى نهائي كأس التحدي الآسيوي.' },
  },
  {
    id: '5',
    year: '2019',
    title: { en: 'Asian Cup Qualifier', ar: 'التأهل لكأس آسيا' },
    description: { en: 'Bahrain qualified for the AFC Asian Cup 2019 in the UAE.', ar: 'تأهلت البحرين لكأس آسيا 2019 في الإمارات.' },
  },
  {
    id: '6',
    year: '2026',
    title: { en: 'Asian Cup 2027 Qualification', ar: 'التأهل لكأس آسيا 2027' },
    description: { en: 'Bahrain secured qualification for the AFC Asian Cup 2027.', ar: 'حجزت البحرين مقعدها في كأس آسيا 2027.' },
  },
];

export const affiliations = [
  {
    id: 'fifa',
    name: {
      en: 'FIFA',
      ar: 'الفيفا',
    },
    logo: '/images/affiliates/fifa.png',
    url: 'https://www.fifa.com',
  },
  {
    id: 'afc',
    name: {
      en: 'Asian Football Confederation',
      ar: 'الاتحاد الآسيوي لكرة القدم',
    },
    logo: '/images/affiliates/afc.png',
    url: 'https://www.the-afc.com',
  },
];
