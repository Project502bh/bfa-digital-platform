export type NewsCategory = 'national_team' | 'league' | 'youth' | 'announcements';

export interface NewsArticle {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  category: NewsCategory;
  image: string;
  publishedAt: string;
  featured?: boolean;
}

export type MatchStatus = 'scheduled' | 'live' | 'completed';

export interface TicketCategory {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number; // BHD
  available: number;
  total: number;
  color: string; // tailwind bg class for the category badge
}

export interface Match {
  id: string;
  homeTeam: {
    name: {
      en: string;
      ar: string;
    };
    logo: string;
    score?: number;
  };
  awayTeam: {
    name: {
      en: string;
      ar: string;
    };
    logo: string;
    score?: number;
  };
  competition: {
    en: string;
    ar: string;
  };
  venue: {
    en: string;
    ar: string;
  };
  datetime: string;
  status: MatchStatus;
  minute?: number;
  tickets?: TicketCategory[];
}

export type DocumentCategory = 'regulations' | 'guidelines' | 'forms' | 'reports';

export interface Document {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  category: DocumentCategory;
  fileUrl: string;
  fileSize: string;
  updatedAt: string;
}

export type MembershipType = 'regular' | 'premium';

export interface Club {
  id: string;
  name: { en: string; ar: string };
  logo?: string;
}

export interface MembershipBenefit {
  en: string;
  ar: string;
}

export interface MembershipPlan {
  id: MembershipType;
  price: number; // BHD per year
  highlighted: boolean;
  benefits: MembershipBenefit[];
}

export interface Leader {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  position: {
    en: string;
    ar: string;
  };
  image: string;
}
