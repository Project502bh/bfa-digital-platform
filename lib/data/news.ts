import type { NewsArticle } from './types';

export const news: NewsArticle[] = [
  {
    id: '1',
    slug: 'bahrain-qualifies-asian-cup',
    title: {
      en: 'Bahrain National Team Qualifies for Asian Cup 2027',
      ar: 'المنتخب البحريني يتأهل لكأس آسيا 2027',
    },
    excerpt: {
      en: 'The Bahraini national team secured their place in the upcoming Asian Cup following a decisive victory.',
      ar: 'حجز المنتخب البحريني مقعده في كأس آسيا القادمة بعد فوز حاسم.',
    },
    content: {
      en: 'In a thrilling match that kept fans on the edge of their seats, the Bahrain national football team has officially qualified for the Asian Cup 2027. The team demonstrated exceptional skill and determination throughout the qualifying campaign, culminating in a decisive 3-1 victory that sealed their spot in the prestigious continental tournament.\n\nHead coach praised the players for their dedication and team spirit, highlighting the importance of this achievement for Bahraini football. The qualification marks another milestone in the nation\'s football development journey.',
      ar: 'في مباراة مثيرة أبقت المشجعين في حالة ترقب، تأهل المنتخب البحريني رسمياً لكأس آسيا 2027. أظهر الفريق مهارة وعزيمة استثنائية طوال حملة التصفيات، وتوج ذلك بفوز حاسم 3-1 أمّن مقعده في البطولة القارية المرموقة.\n\nأشاد المدرب بتفاني اللاعبين وروحهم الجماعية، مؤكداً على أهمية هذا الإنجاز لكرة القدم البحرينية. يمثل التأهل علامة فارقة أخرى في مسيرة تطوير كرة القدم في المملكة.',
    },
    category: 'national_team',
    image: '/images/news/asian-cup-qualification.jpg',
    publishedAt: '2026-05-20',
    featured: true,
  },
  {
    id: '2',
    slug: 'bahraini-premier-league-kicks-off',
    title: {
      en: 'Bahraini Premier League 2026-27 Season Kicks Off',
      ar: 'انطلاق موسم الدوري البحريني الممتاز 2026-27',
    },
    excerpt: {
      en: 'The new season of the Bahraini Premier League begins with exciting matches across all stadiums.',
      ar: 'يبدأ الموسم الجديد من الدوري البحريني الممتاز بمباريات مثيرة في جميع الملاعب.',
    },
    content: {
      en: 'The Bahraini Premier League has officially kicked off its 2026-27 season with a slate of exciting opening matches. Defending champions are set to face strong competition as several clubs have strengthened their squads during the transfer window.\n\nFans across the kingdom are eager to see their favorite teams compete for the prestigious title. The season promises to be one of the most competitive in recent memory.',
      ar: 'انطلق الدوري البحريني الممتاز رسمياً في موسمه 2026-27 بجولة من المباريات الافتتاحية المثيرة. يواجه البطل الحالي منافسة قوية حيث عززت عدة أندية صفوفها خلال فترة الانتقالات.\n\nالمشجعون في جميع أنحاء المملكة متحمسون لمشاهدة فرقهم المفضلة تتنافس على اللقب المرموق. يعد الموسم بأن يكون من أكثر المواسم تنافسية في الذاكرة الحديثة.',
    },
    category: 'league',
    image: '/images/news/premier-league-kickoff.jpg',
    publishedAt: '2026-05-18',
    featured: true,
  },
  {
    id: '3',
    slug: 'youth-development-program-launch',
    title: {
      en: 'BFA Launches New Youth Development Program',
      ar: 'الاتحاد يطلق برنامج تطوير الشباب الجديد',
    },
    excerpt: {
      en: 'A comprehensive youth development initiative aimed at nurturing the next generation of Bahraini football talent.',
      ar: 'مبادرة شاملة لتطوير الشباب تهدف إلى رعاية الجيل القادم من المواهب الكروية البحرينية.',
    },
    content: {
      en: 'The Bahrain Football Association has unveiled an ambitious new youth development program designed to identify and nurture talented young players across the kingdom. The program will establish training centers in multiple governorates and provide professional coaching to promising athletes.\n\nThis initiative represents a significant investment in the future of Bahraini football.',
      ar: 'كشف اتحاد البحرين لكرة القدم عن برنامج طموح جديد لتطوير الشباب مصمم لاكتشاف ورعاية اللاعبين الشباب الموهوبين في جميع أنحاء المملكة. سيؤسس البرنامج مراكز تدريب في محافظات متعددة ويوفر تدريباً احترافياً للرياضيين الواعدين.\n\nتمثل هذه المبادرة استثماراً كبيراً في مستقبل كرة القدم البحرينية.',
    },
    category: 'youth',
    image: '/images/news/youth-program.jpg',
    publishedAt: '2026-05-15',
  },
  {
    id: '4',
    slug: 'referees-training-workshop',
    title: {
      en: 'BFA Hosts FIFA Referees Training Workshop',
      ar: 'الاتحاد يستضيف ورشة عمل الفيفا لتدريب الحكام',
    },
    excerpt: {
      en: 'International referees gather in Bahrain for an intensive training workshop organized by FIFA and BFA.',
      ar: 'يجتمع الحكام الدوليون في البحرين لورشة عمل تدريبية مكثفة ينظمها الفيفا واتحاد البحرين.',
    },
    content: {
      en: 'The Bahrain Football Association is proud to host a prestigious FIFA referees training workshop this month. The event brings together match officials from across the region for intensive training sessions focused on the latest rule interpretations and VAR technology.\n\nThis workshop underscores Bahrain\'s commitment to developing officiating standards in the region.',
      ar: 'يفتخر اتحاد البحرين لكرة القدم باستضافة ورشة عمل الفيفا المرموقة لتدريب الحكام هذا الشهر. يجمع الحدث مسؤولي المباريات من جميع أنحاء المنطقة لجلسات تدريب مكثفة تركز على أحدث تفسيرات القواعد وتقنية الفار.\n\nتؤكد هذه الورشة التزام البحرين بتطوير معايير التحكيم في المنطقة.',
    },
    category: 'announcements',
    image: '/images/news/referees-workshop.jpg',
    publishedAt: '2026-05-12',
  },
  {
    id: '5',
    slug: 'womens-football-expansion',
    title: {
      en: "Women's Football League Expansion Announced",
      ar: 'الإعلان عن توسيع دوري كرة القدم للسيدات',
    },
    excerpt: {
      en: "BFA announces plans to expand the women's football league with four new teams joining next season.",
      ar: 'يعلن الاتحاد عن خطط لتوسيع دوري كرة القدم للسيدات بانضمام أربعة فرق جديدة الموسم القادم.',
    },
    content: {
      en: "In a landmark announcement for women's football in Bahrain, the BFA has revealed plans to expand the women's league from six to ten teams. This expansion reflects the growing interest and participation in women's football across the kingdom.\n\nThe new teams will represent previously underserved regions, providing more opportunities for female athletes.",
      ar: 'في إعلان تاريخي لكرة القدم النسائية في البحرين، كشف الاتحاد عن خطط لتوسيع دوري السيدات من ستة إلى عشرة فرق. يعكس هذا التوسع الاهتمام المتزايد والمشاركة في كرة القدم النسائية في جميع أنحاء المملكة.\n\nستمثل الفرق الجديدة مناطق لم تحظَ بالاهتمام الكافي سابقاً، مما يوفر المزيد من الفرص للرياضيات.',
    },
    category: 'announcements',
    image: '/images/news/womens-football.jpg',
    publishedAt: '2026-05-10',
  },
  {
    id: '6',
    slug: 'national-stadium-renovation',
    title: {
      en: 'National Stadium Renovation Project Begins',
      ar: 'بدء مشروع تجديد الملعب الوطني',
    },
    excerpt: {
      en: 'Major renovation work begins at the National Stadium to upgrade facilities to international standards.',
      ar: 'تبدأ أعمال التجديد الكبرى في الملعب الوطني لترقية المرافق إلى المعايير الدولية.',
    },
    content: {
      en: 'The BFA has commenced a major renovation project at the National Stadium in Riffa. The upgrades will include new seating, improved lighting systems, and state-of-the-art media facilities. The project is expected to be completed in time for the next international tournament.\n\nThis investment demonstrates the kingdom\'s commitment to world-class football infrastructure.',
      ar: 'بدأ اتحاد البحرين لكرة القدم مشروع تجديد كبير في الملعب الوطني بالرفاع. ستشمل الترقيات مقاعد جديدة وأنظمة إضاءة محسنة ومرافق إعلامية حديثة. من المتوقع اكتمال المشروع في الوقت المناسب للبطولة الدولية القادمة.\n\nيظهر هذا الاستثمار التزام المملكة ببنية تحتية عالمية المستوى لكرة القدم.',
    },
    category: 'announcements',
    image: '/images/news/stadium-renovation.jpg',
    publishedAt: '2026-05-08',
  },
];

export const newsItems = news;

export const newsCategories = [
  { value: 'national_team', labelEn: 'National Team', labelAr: 'المنتخب الوطني' },
  { value: 'league', labelEn: 'League', labelAr: 'الدوري' },
  { value: 'youth', labelEn: 'Youth', labelAr: 'الشباب' },
  { value: 'announcements', labelEn: 'Announcements', labelAr: 'إعلانات' },
] as const;

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return news.find((article) => article.slug === slug);
}

export function getNewsByCategory(category?: NewsArticle['category']): NewsArticle[] {
  if (!category) return news;
  return news.filter((article) => article.category === category);
}

export function getFeaturedNews(): NewsArticle[] {
  return news.filter((article) => article.featured);
}
