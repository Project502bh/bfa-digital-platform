import type { Document } from './types';

export const documents: Document[] = [
  {
    id: '1',
    title: {
      en: 'BFA Competition Regulations 2026',
      ar: 'لوائح مسابقات الاتحاد 2026',
    },
    description: {
      en: 'Official regulations governing all BFA-sanctioned competitions including the Premier League and Cup competitions.',
      ar: 'اللوائح الرسمية التي تحكم جميع المسابقات المعتمدة من الاتحاد بما في ذلك الدوري الممتاز ومسابقات الكأس.',
    },
    category: 'regulations',
    fileUrl: '/documents/bfa-competition-regulations-2026.pdf',
    fileSize: '2.4 MB',
    updatedAt: '2026-01-15',
  },
  {
    id: '2',
    title: {
      en: 'Player Registration Guidelines',
      ar: 'إرشادات تسجيل اللاعبين',
    },
    description: {
      en: 'Complete guidelines for player registration, transfers, and eligibility requirements for all leagues.',
      ar: 'إرشادات كاملة لتسجيل اللاعبين والانتقالات ومتطلبات الأهلية لجميع الدوريات.',
    },
    category: 'guidelines',
    fileUrl: '/documents/player-registration-guidelines.pdf',
    fileSize: '1.8 MB',
    updatedAt: '2026-02-20',
  },
  {
    id: '3',
    title: {
      en: 'Club Licensing Application Form',
      ar: 'نموذج طلب ترخيص النادي',
    },
    description: {
      en: 'Application form for clubs seeking to obtain or renew their BFA license for league participation.',
      ar: 'نموذج طلب للأندية الراغبة في الحصول على ترخيص الاتحاد أو تجديده للمشاركة في الدوري.',
    },
    category: 'forms',
    fileUrl: '/documents/club-licensing-form.pdf',
    fileSize: '450 KB',
    updatedAt: '2026-03-01',
  },
  {
    id: '4',
    title: {
      en: 'Annual Report 2025',
      ar: 'التقرير السنوي 2025',
    },
    description: {
      en: "Comprehensive annual report covering BFA's activities, achievements, and financial statements for 2025.",
      ar: 'تقرير سنوي شامل يغطي أنشطة الاتحاد وإنجازاته وبياناته المالية لعام 2025.',
    },
    category: 'reports',
    fileUrl: '/documents/bfa-annual-report-2025.pdf',
    fileSize: '5.2 MB',
    updatedAt: '2026-02-28',
  },
  {
    id: '5',
    title: {
      en: 'Referee Assessment Form',
      ar: 'نموذج تقييم الحكام',
    },
    description: {
      en: 'Standard form used for evaluating referee performance during official matches.',
      ar: 'النموذج المعياري المستخدم لتقييم أداء الحكام خلال المباريات الرسمية.',
    },
    category: 'forms',
    fileUrl: '/documents/referee-assessment-form.pdf',
    fileSize: '320 KB',
    updatedAt: '2026-01-10',
  },
  {
    id: '6',
    title: {
      en: 'Stadium Safety Guidelines',
      ar: 'إرشادات سلامة الملاعب',
    },
    description: {
      en: 'Safety requirements and guidelines for all stadiums hosting BFA-sanctioned matches.',
      ar: 'متطلبات وإرشادات السلامة لجميع الملاعب التي تستضيف مباريات الاتحاد.',
    },
    category: 'guidelines',
    fileUrl: '/documents/stadium-safety-guidelines.pdf',
    fileSize: '1.1 MB',
    updatedAt: '2026-04-15',
  },
  {
    id: '7',
    title: {
      en: 'Youth Development Strategy 2026-2030',
      ar: 'استراتيجية تطوير الشباب 2026-2030',
    },
    description: {
      en: "Strategic document outlining BFA's vision and plans for youth football development over the next five years.",
      ar: 'وثيقة استراتيجية تحدد رؤية وخطط الاتحاد لتطوير كرة قدم الشباب خلال السنوات الخمس القادمة.',
    },
    category: 'reports',
    fileUrl: '/documents/youth-development-strategy.pdf',
    fileSize: '3.8 MB',
    updatedAt: '2026-03-20',
  },
  {
    id: '8',
    title: {
      en: 'Match Day Operations Manual',
      ar: 'دليل عمليات يوم المباراة',
    },
    description: {
      en: 'Comprehensive guide for organizing and managing match day operations at all venues.',
      ar: 'دليل شامل لتنظيم وإدارة عمليات يوم المباراة في جميع الملاعب.',
    },
    category: 'guidelines',
    fileUrl: '/documents/match-day-operations.pdf',
    fileSize: '2.1 MB',
    updatedAt: '2026-04-01',
  },
];

export function getDocumentById(id: string): Document | undefined {
  return documents.find((doc) => doc.id === id);
}

export const documentCategories = [
  { value: 'regulations', labelEn: 'Regulations', labelAr: 'اللوائح' },
  { value: 'guidelines', labelEn: 'Guidelines', labelAr: 'الإرشادات' },
  { value: 'forms', labelEn: 'Forms', labelAr: 'النماذج' },
  { value: 'reports', labelEn: 'Reports', labelAr: 'التقارير' },
] as const;

export function getDocumentsByCategory(category?: Document['category']): Document[] {
  if (!category) return documents;
  return documents.filter((doc) => doc.category === category);
}
