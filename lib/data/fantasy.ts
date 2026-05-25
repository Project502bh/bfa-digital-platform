// ============================================================
// BFL Fantasy — Data Layer
// ============================================================

export interface FantasyClub {
  id: string;
  name: { en: string; ar: string };
  short: string;
  color: string;
}

export type FPosition = 'GKP' | 'DEF' | 'MID' | 'FWD';

export interface FantasyPlayer {
  id: string;
  club_id: string;
  name: { en: string; ar: string };
  position: FPosition;
  now_cost: number;       // tenths of millions: 65 = 6.5M
  total_points: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  minutes: number;
  points_per_game: number;
  selected_by: number;    // percentage
  gw_points: number[];    // points per gameweek [gw1..gw5]
  status: 'available' | 'doubtful' | 'injured';
  news?: { en: string; ar: string };
}

export interface Gameweek {
  id: number;
  name: { en: string; ar: string };
  deadline: string;
  is_current: boolean;
  is_finished: boolean;
  average_score: number;
  highest_score: number;
}

export interface LeagueEntry {
  rank: number;
  user: string;
  team_name: string;
  gw_points: number;
  total: number;
}

// ============================================================
// CLUBS
// ============================================================

export const fantasyClubs: FantasyClub[] = [
  { id: 'muh', name: { en: 'Muharraq FC',   ar: 'نادي المحرق'       }, short: 'MUH', color: '#1A478A' },
  { id: 'rif', name: { en: 'Riffa Club',     ar: 'نادي الرفاع'       }, short: 'RIF', color: '#CC0000' },
  { id: 'kha', name: { en: 'Al-Khaldiya',    ar: 'الخلدية'           }, short: 'KHA', color: '#006633' },
  { id: 'man', name: { en: 'Manama Club',    ar: 'نادي المنامة'      }, short: 'MAN', color: '#7B0000' },
  { id: 'eri', name: { en: 'East Riffa',     ar: 'الرفاع الشرقي'     }, short: 'ERI', color: '#E65C00' },
  { id: 'ahl', name: { en: 'Al-Ahli',        ar: 'الأهلي'            }, short: 'AHL', color: '#C8A200' },
  { id: 'hid', name: { en: 'Al-Hidd',        ar: 'الحد'              }, short: 'HID', color: '#5B2D8E' },
  { id: 'naj', name: { en: 'Al-Najma',       ar: 'النجمة'            }, short: 'NAJ', color: '#007A85' },
];

// ============================================================
// PLAYERS (6 per club = 48 total)
// ============================================================

export const fantasyPlayers: FantasyPlayer[] = [
  // ── MUHARRAQ FC (muh) ──────────────────────────────────
  {
    id: 'muh-gk1', club_id: 'muh', position: 'GKP',
    name: { en: 'Sayed Jaafar',    ar: 'سيد جعفر'       },
    now_cost: 55, total_points: 68, goals_scored: 0, assists: 0, clean_sheets: 6,
    minutes: 450, points_per_game: 13.6, selected_by: 18.4,
    gw_points: [12, 15, 10, 18, 13], status: 'available',
  },
  {
    id: 'muh-df1', club_id: 'muh', position: 'DEF',
    name: { en: 'Mohamed Saleh',   ar: 'محمد صالح'      },
    now_cost: 62, total_points: 72, goals_scored: 1, assists: 2, clean_sheets: 5,
    minutes: 450, points_per_game: 14.4, selected_by: 22.1,
    gw_points: [14, 16, 12, 16, 14], status: 'available',
  },
  {
    id: 'muh-df2', club_id: 'muh', position: 'DEF',
    name: { en: 'Ali Madan',       ar: 'علي مدن'        },
    now_cost: 58, total_points: 61, goals_scored: 0, assists: 1, clean_sheets: 5,
    minutes: 420, points_per_game: 12.2, selected_by: 15.7,
    gw_points: [11, 13, 10, 14, 13], status: 'available',
  },
  {
    id: 'muh-md1', club_id: 'muh', position: 'MID',
    name: { en: 'Hussain Baba',    ar: 'حسين بابا'      },
    now_cost: 78, total_points: 84, goals_scored: 3, assists: 4, clean_sheets: 3,
    minutes: 450, points_per_game: 16.8, selected_by: 31.2,
    gw_points: [16, 18, 14, 20, 16], status: 'available',
  },
  {
    id: 'muh-md2', club_id: 'muh', position: 'MID',
    name: { en: 'Abdulla Yusuf',   ar: 'عبدالله يوسف'  },
    now_cost: 70, total_points: 75, goals_scored: 2, assists: 3, clean_sheets: 2,
    minutes: 430, points_per_game: 15.0, selected_by: 24.3,
    gw_points: [15, 16, 12, 18, 14], status: 'available',
  },
  {
    id: 'muh-fw1', club_id: 'muh', position: 'FWD',
    name: { en: 'Ismail Abdullatif', ar: 'إسماعيل عبداللطيف' },
    now_cost: 88, total_points: 91, goals_scored: 7, assists: 2, clean_sheets: 0,
    minutes: 440, points_per_game: 18.2, selected_by: 38.5,
    gw_points: [18, 20, 16, 22, 15], status: 'available',
  },

  // ── RIFFA CLUB (rif) ───────────────────────────────────
  {
    id: 'rif-gk1', club_id: 'rif', position: 'GKP',
    name: { en: 'Fadhel Khalil',   ar: 'فاضل خليل'     },
    now_cost: 52, total_points: 62, goals_scored: 0, assists: 0, clean_sheets: 5,
    minutes: 450, points_per_game: 12.4, selected_by: 14.2,
    gw_points: [10, 14, 12, 14, 12], status: 'available',
  },
  {
    id: 'rif-df1', club_id: 'rif', position: 'DEF',
    name: { en: 'Nasser Saeed',    ar: 'ناصر سعيد'     },
    now_cost: 65, total_points: 69, goals_scored: 1, assists: 1, clean_sheets: 4,
    minutes: 440, points_per_game: 13.8, selected_by: 19.5,
    gw_points: [13, 15, 11, 16, 14], status: 'available',
  },
  {
    id: 'rif-df2', club_id: 'rif', position: 'DEF',
    name: { en: 'Waleed Hamdan',   ar: 'وليد حمدان'    },
    now_cost: 60, total_points: 58, goals_scored: 0, assists: 2, clean_sheets: 4,
    minutes: 410, points_per_game: 11.6, selected_by: 13.8,
    gw_points: [10, 12, 11, 13, 12], status: 'doubtful',
    news: { en: 'Minor knee concern', ar: 'قلق طفيف في الركبة' },
  },
  {
    id: 'rif-md1', club_id: 'rif', position: 'MID',
    name: { en: 'Jamal Hassan',    ar: 'جمال حسن'      },
    now_cost: 82, total_points: 88, goals_scored: 4, assists: 5, clean_sheets: 2,
    minutes: 450, points_per_game: 17.6, selected_by: 35.4,
    gw_points: [17, 19, 15, 21, 16], status: 'available',
  },
  {
    id: 'rif-md2', club_id: 'rif', position: 'MID',
    name: { en: 'Tariq Mahmoud',   ar: 'طارق محمود'    },
    now_cost: 68, total_points: 71, goals_scored: 2, assists: 3, clean_sheets: 2,
    minutes: 430, points_per_game: 14.2, selected_by: 21.6,
    gw_points: [14, 15, 12, 17, 13], status: 'available',
  },
  {
    id: 'rif-fw1', club_id: 'rif', position: 'FWD',
    name: { en: 'Abdulrahman Faraj', ar: 'عبدالرحمن فرج' },
    now_cost: 92, total_points: 95, goals_scored: 8, assists: 3, clean_sheets: 0,
    minutes: 445, points_per_game: 19.0, selected_by: 41.2,
    gw_points: [19, 21, 17, 22, 16], status: 'available',
  },

  // ── AL-KHALDIYA (kha) ──────────────────────────────────
  {
    id: 'kha-gk1', club_id: 'kha', position: 'GKP',
    name: { en: 'Hasan Mirza',     ar: 'حسن ميرزا'     },
    now_cost: 48, total_points: 55, goals_scored: 0, assists: 0, clean_sheets: 4,
    minutes: 450, points_per_game: 11.0, selected_by: 11.5,
    gw_points: [9, 12, 10, 13, 11], status: 'available',
  },
  {
    id: 'kha-df1', club_id: 'kha', position: 'DEF',
    name: { en: 'Khalid Awadhi',   ar: 'خالد العوضي'   },
    now_cost: 56, total_points: 60, goals_scored: 0, assists: 2, clean_sheets: 4,
    minutes: 430, points_per_game: 12.0, selected_by: 14.3,
    gw_points: [11, 13, 10, 14, 12], status: 'available',
  },
  {
    id: 'kha-df2', club_id: 'kha', position: 'DEF',
    name: { en: 'Yousif Rashed',   ar: 'يوسف راشد'     },
    now_cost: 54, total_points: 57, goals_scored: 1, assists: 0, clean_sheets: 4,
    minutes: 400, points_per_game: 11.4, selected_by: 12.1,
    gw_points: [10, 13, 10, 13, 11], status: 'available',
  },
  {
    id: 'kha-md1', club_id: 'kha', position: 'MID',
    name: { en: 'Ibrahim Fawzi',   ar: 'إبراهيم فوزي'  },
    now_cost: 72, total_points: 77, goals_scored: 3, assists: 4, clean_sheets: 1,
    minutes: 440, points_per_game: 15.4, selected_by: 26.7,
    gw_points: [15, 16, 13, 18, 15], status: 'available',
  },
  {
    id: 'kha-md2', club_id: 'kha', position: 'MID',
    name: { en: 'Ahmed Mansoor',   ar: 'أحمد منصور'    },
    now_cost: 64, total_points: 66, goals_scored: 2, assists: 2, clean_sheets: 1,
    minutes: 420, points_per_game: 13.2, selected_by: 18.9,
    gw_points: [12, 14, 12, 16, 12], status: 'available',
  },
  {
    id: 'kha-fw1', club_id: 'kha', position: 'FWD',
    name: { en: 'Sami Hasan',      ar: 'سامي حسن'      },
    now_cost: 80, total_points: 82, goals_scored: 6, assists: 2, clean_sheets: 0,
    minutes: 435, points_per_game: 16.4, selected_by: 30.2,
    gw_points: [16, 18, 14, 19, 15], status: 'available',
  },

  // ── MANAMA CLUB (man) ──────────────────────────────────
  {
    id: 'man-gk1', club_id: 'man', position: 'GKP',
    name: { en: 'Qasim Abdulla',   ar: 'قاسم عبدالله'  },
    now_cost: 50, total_points: 59, goals_scored: 0, assists: 0, clean_sheets: 5,
    minutes: 450, points_per_game: 11.8, selected_by: 13.2,
    gw_points: [10, 13, 11, 14, 11], status: 'available',
  },
  {
    id: 'man-df1', club_id: 'man', position: 'DEF',
    name: { en: 'Isa Al-Dosari',   ar: 'عيسى الدوسري'  },
    now_cost: 67, total_points: 71, goals_scored: 1, assists: 3, clean_sheets: 4,
    minutes: 450, points_per_game: 14.2, selected_by: 20.8,
    gw_points: [13, 15, 12, 17, 14], status: 'available',
  },
  {
    id: 'man-df2', club_id: 'man', position: 'DEF',
    name: { en: 'Bader Nasser',    ar: 'بدر ناصر'      },
    now_cost: 59, total_points: 60, goals_scored: 0, assists: 1, clean_sheets: 4,
    minutes: 420, points_per_game: 12.0, selected_by: 14.5,
    gw_points: [11, 13, 10, 14, 12], status: 'available',
  },
  {
    id: 'man-md1', club_id: 'man', position: 'MID',
    name: { en: 'Rashid Jalal',    ar: 'راشد جلال'     },
    now_cost: 85, total_points: 90, goals_scored: 5, assists: 5, clean_sheets: 2,
    minutes: 450, points_per_game: 18.0, selected_by: 37.6,
    gw_points: [17, 20, 16, 21, 16], status: 'available',
  },
  {
    id: 'man-md2', club_id: 'man', position: 'MID',
    name: { en: 'Kareem Salman',   ar: 'كريم سلمان'    },
    now_cost: 71, total_points: 74, goals_scored: 2, assists: 4, clean_sheets: 2,
    minutes: 440, points_per_game: 14.8, selected_by: 23.4,
    gw_points: [14, 16, 13, 17, 14], status: 'available',
  },
  {
    id: 'man-fw1', club_id: 'man', position: 'FWD',
    name: { en: 'Alaa Hubail',     ar: 'علاء حبيل'     },
    now_cost: 115, total_points: 112, goals_scored: 12, assists: 4, clean_sheets: 0,
    minutes: 450, points_per_game: 22.4, selected_by: 62.3,
    gw_points: [22, 24, 20, 26, 20], status: 'available',
  },

  // ── EAST RIFFA (eri) ───────────────────────────────────
  {
    id: 'eri-gk1', club_id: 'eri', position: 'GKP',
    name: { en: 'Ammar Isa',       ar: 'عمار عيسى'     },
    now_cost: 46, total_points: 51, goals_scored: 0, assists: 0, clean_sheets: 3,
    minutes: 450, points_per_game: 10.2, selected_by: 9.8,
    gw_points: [9, 11, 9, 13, 9], status: 'available',
  },
  {
    id: 'eri-df1', club_id: 'eri', position: 'DEF',
    name: { en: 'Hussain Jaber',   ar: 'حسين جابر'     },
    now_cost: 57, total_points: 62, goals_scored: 0, assists: 2, clean_sheets: 3,
    minutes: 430, points_per_game: 12.4, selected_by: 15.6,
    gw_points: [11, 13, 11, 15, 12], status: 'available',
  },
  {
    id: 'eri-df2', club_id: 'eri', position: 'DEF',
    name: { en: 'Mahdi Yousif',    ar: 'مهدي يوسف'     },
    now_cost: 53, total_points: 56, goals_scored: 1, assists: 1, clean_sheets: 3,
    minutes: 410, points_per_game: 11.2, selected_by: 12.3,
    gw_points: [10, 12, 10, 13, 11], status: 'available',
  },
  {
    id: 'eri-md1', club_id: 'eri', position: 'MID',
    name: { en: 'Abdullah Saad',   ar: 'عبدالله سعد'   },
    now_cost: 75, total_points: 80, goals_scored: 3, assists: 5, clean_sheets: 1,
    minutes: 450, points_per_game: 16.0, selected_by: 28.9,
    gw_points: [15, 17, 14, 19, 15], status: 'available',
  },
  {
    id: 'eri-md2', club_id: 'eri', position: 'MID',
    name: { en: 'Faris Khalaf',    ar: 'فارس خلف'      },
    now_cost: 63, total_points: 65, goals_scored: 2, assists: 2, clean_sheets: 1,
    minutes: 420, points_per_game: 13.0, selected_by: 17.2,
    gw_points: [12, 14, 11, 16, 12], status: 'doubtful',
    news: { en: 'Hamstring tightness', ar: 'توتر في أوتار الركبة' },
  },
  {
    id: 'eri-fw1', club_id: 'eri', position: 'FWD',
    name: { en: 'Mubarak Salem',   ar: 'مبارك سالم'    },
    now_cost: 83, total_points: 85, goals_scored: 7, assists: 2, clean_sheets: 0,
    minutes: 440, points_per_game: 17.0, selected_by: 33.1,
    gw_points: [17, 18, 15, 20, 15], status: 'available',
  },

  // ── AL-AHLI (ahl) ──────────────────────────────────────
  {
    id: 'ahl-gk1', club_id: 'ahl', position: 'GKP',
    name: { en: 'Duaij Talal',     ar: 'دعيج طلال'     },
    now_cost: 51, total_points: 57, goals_scored: 0, assists: 0, clean_sheets: 4,
    minutes: 450, points_per_game: 11.4, selected_by: 12.7,
    gw_points: [10, 12, 10, 14, 11], status: 'available',
  },
  {
    id: 'ahl-df1', club_id: 'ahl', position: 'DEF',
    name: { en: 'Sultan Ghuloom',  ar: 'سلطان غلوم'    },
    now_cost: 61, total_points: 65, goals_scored: 1, assists: 1, clean_sheets: 4,
    minutes: 430, points_per_game: 13.0, selected_by: 17.4,
    gw_points: [12, 14, 11, 16, 12], status: 'available',
  },
  {
    id: 'ahl-df2', club_id: 'ahl', position: 'DEF',
    name: { en: 'Riyad Hamad',     ar: 'رياض حمد'      },
    now_cost: 55, total_points: 59, goals_scored: 0, assists: 2, clean_sheets: 4,
    minutes: 400, points_per_game: 11.8, selected_by: 13.9,
    gw_points: [11, 13, 10, 14, 11], status: 'available',
  },
  {
    id: 'ahl-md1', club_id: 'ahl', position: 'MID',
    name: { en: 'Jaffar Meer',     ar: 'جعفر مير'      },
    now_cost: 79, total_points: 83, goals_scored: 4, assists: 4, clean_sheets: 2,
    minutes: 445, points_per_game: 16.6, selected_by: 30.8,
    gw_points: [16, 18, 14, 20, 15], status: 'available',
  },
  {
    id: 'ahl-md2', club_id: 'ahl', position: 'MID',
    name: { en: 'Bilal Rajab',     ar: 'بلال رجب'      },
    now_cost: 66, total_points: 68, goals_scored: 2, assists: 3, clean_sheets: 2,
    minutes: 420, points_per_game: 13.6, selected_by: 19.2,
    gw_points: [13, 14, 12, 17, 12], status: 'available',
  },
  {
    id: 'ahl-fw1', club_id: 'ahl', position: 'FWD',
    name: { en: 'Subah Saad',      ar: 'صباح سعد'      },
    now_cost: 87, total_points: 89, goals_scored: 7, assists: 3, clean_sheets: 0,
    minutes: 440, points_per_game: 17.8, selected_by: 36.4,
    gw_points: [18, 19, 15, 22, 15], status: 'available',
  },

  // ── AL-HIDD (hid) ─────────────────────────────────────
  {
    id: 'hid-gk1', club_id: 'hid', position: 'GKP',
    name: { en: 'Talal Marzooq',   ar: 'طلال مرزوق'    },
    now_cost: 49, total_points: 54, goals_scored: 0, assists: 0, clean_sheets: 3,
    minutes: 450, points_per_game: 10.8, selected_by: 10.5,
    gw_points: [9, 12, 9, 14, 10], status: 'available',
  },
  {
    id: 'hid-df1', club_id: 'hid', position: 'DEF',
    name: { en: 'Hamad Thamer',    ar: 'حمد ثامر'      },
    now_cost: 58, total_points: 61, goals_scored: 0, assists: 2, clean_sheets: 3,
    minutes: 430, points_per_game: 12.2, selected_by: 14.9,
    gw_points: [11, 13, 10, 15, 12], status: 'available',
  },
  {
    id: 'hid-df2', club_id: 'hid', position: 'DEF',
    name: { en: 'Ali Bukhammas',   ar: 'علي بوخماس'    },
    now_cost: 52, total_points: 55, goals_scored: 1, assists: 0, clean_sheets: 3,
    minutes: 400, points_per_game: 11.0, selected_by: 11.4,
    gw_points: [10, 12, 9, 13, 11], status: 'available',
  },
  {
    id: 'hid-md1', club_id: 'hid', position: 'MID',
    name: { en: 'Osama Khalil',    ar: 'أسامة خليل'    },
    now_cost: 74, total_points: 78, goals_scored: 3, assists: 4, clean_sheets: 1,
    minutes: 440, points_per_game: 15.6, selected_by: 27.3,
    gw_points: [15, 17, 13, 19, 14], status: 'available',
  },
  {
    id: 'hid-md2', club_id: 'hid', position: 'MID',
    name: { en: 'Nawaf Tawfiq',    ar: 'نواف توفيق'    },
    now_cost: 65, total_points: 67, goals_scored: 2, assists: 2, clean_sheets: 1,
    minutes: 420, points_per_game: 13.4, selected_by: 18.6,
    gw_points: [12, 14, 12, 16, 13], status: 'available',
  },
  {
    id: 'hid-fw1', club_id: 'hid', position: 'FWD',
    name: { en: 'Yaqoob Hassan',   ar: 'يعقوب حسن'     },
    now_cost: 81, total_points: 84, goals_scored: 6, assists: 3, clean_sheets: 0,
    minutes: 435, points_per_game: 16.8, selected_by: 32.0,
    gw_points: [16, 18, 15, 20, 15], status: 'available',
  },

  // ── AL-NAJMA (naj) ─────────────────────────────────────
  {
    id: 'naj-gk1', club_id: 'naj', position: 'GKP',
    name: { en: 'Khaled Al-Aradi', ar: 'خالد العرادي'  },
    now_cost: 53, total_points: 60, goals_scored: 0, assists: 0, clean_sheets: 4,
    minutes: 450, points_per_game: 12.0, selected_by: 13.8,
    gw_points: [10, 13, 11, 15, 11], status: 'available',
  },
  {
    id: 'naj-df1', club_id: 'naj', position: 'DEF',
    name: { en: 'Salman Amer',     ar: 'سلمان عامر'    },
    now_cost: 63, total_points: 66, goals_scored: 1, assists: 2, clean_sheets: 4,
    minutes: 440, points_per_game: 13.2, selected_by: 18.1,
    gw_points: [12, 14, 11, 16, 13], status: 'available',
  },
  {
    id: 'naj-df2', club_id: 'naj', position: 'DEF',
    name: { en: 'Hamza Buali',     ar: 'حمزة بوعلي'    },
    now_cost: 57, total_points: 58, goals_scored: 0, assists: 1, clean_sheets: 4,
    minutes: 410, points_per_game: 11.6, selected_by: 12.8,
    gw_points: [10, 12, 10, 14, 12], status: 'injured',
    news: { en: 'Ankle injury - out 2 weeks', ar: 'إصابة في الكاحل - خارج أسبوعين' },
  },
  {
    id: 'naj-md1', club_id: 'naj', position: 'MID',
    name: { en: 'Mohamed Zain',    ar: 'محمد زين'       },
    now_cost: 76, total_points: 81, goals_scored: 4, assists: 4, clean_sheets: 2,
    minutes: 445, points_per_game: 16.2, selected_by: 29.4,
    gw_points: [16, 17, 14, 20, 14], status: 'available',
  },
  {
    id: 'naj-md2', club_id: 'naj', position: 'MID',
    name: { en: 'Bahaa Khamis',    ar: 'بهاء خميس'     },
    now_cost: 69, total_points: 70, goals_scored: 2, assists: 3, clean_sheets: 2,
    minutes: 425, points_per_game: 14.0, selected_by: 20.6,
    gw_points: [13, 15, 12, 17, 13], status: 'available',
  },
  {
    id: 'naj-fw1', club_id: 'naj', position: 'FWD',
    name: { en: 'Fawzi Marzooq',   ar: 'فوزي مرزوق'    },
    now_cost: 90, total_points: 93, goals_scored: 8, assists: 2, clean_sheets: 0,
    minutes: 445, points_per_game: 18.6, selected_by: 40.1,
    gw_points: [18, 21, 16, 22, 16], status: 'available',
  },
];

// ============================================================
// GAMEWEEKS
// ============================================================

export const gameweeks: Gameweek[] = [
  {
    id: 1,
    name: { en: 'Gameweek 1', ar: 'الجولة الأولى' },
    deadline: '2025-10-04T11:00:00Z',
    is_current: false, is_finished: true,
    average_score: 52, highest_score: 98,
  },
  {
    id: 2,
    name: { en: 'Gameweek 2', ar: 'الجولة الثانية' },
    deadline: '2025-10-11T11:00:00Z',
    is_current: false, is_finished: true,
    average_score: 55, highest_score: 102,
  },
  {
    id: 3,
    name: { en: 'Gameweek 3', ar: 'الجولة الثالثة' },
    deadline: '2025-10-18T11:00:00Z',
    is_current: false, is_finished: true,
    average_score: 48, highest_score: 95,
  },
  {
    id: 4,
    name: { en: 'Gameweek 4', ar: 'الجولة الرابعة' },
    deadline: '2025-10-25T11:00:00Z',
    is_current: true, is_finished: false,
    average_score: 58, highest_score: 112,
  },
  {
    id: 5,
    name: { en: 'Gameweek 5', ar: 'الجولة الخامسة' },
    deadline: '2025-11-01T11:00:00Z',
    is_current: false, is_finished: false,
    average_score: 0, highest_score: 0,
  },
];

// ============================================================
// GLOBAL LEADERBOARD
// ============================================================

export const globalLeaderboard: LeagueEntry[] = [
  { rank: 1,  user: 'Ahmed Al-Muharraq',  team_name: 'Desert Eagles',      gw_points: 112, total: 348 },
  { rank: 2,  user: 'Khalid Al-Rifai',    team_name: 'Gulf Warriors',       gw_points: 105, total: 332 },
  { rank: 3,  user: 'Fatima Zahraa',      team_name: 'Pearl FC',            gw_points: 98,  total: 321 },
  { rank: 4,  user: 'Hassan Buhindi',     team_name: 'Buhindi United',      gw_points: 95,  total: 318 },
  { rank: 5,  user: 'Yousif Al-Najma',    team_name: 'Star Gazers',         gw_points: 92,  total: 311 },
  { rank: 6,  user: 'Mariam Isa',         team_name: 'Queens of the Gulf',  gw_points: 90,  total: 307 },
  { rank: 7,  user: 'Ali Khalaf',         team_name: 'Manama Reds',         gw_points: 88,  total: 303 },
  { rank: 8,  user: 'Noor Al-Bahrani',    team_name: 'Bahraini Blasters',   gw_points: 87,  total: 299 },
  { rank: 9,  user: 'Jassim Saeed',       team_name: 'Riffa Royals XI',     gw_points: 85,  total: 295 },
  { rank: 10, user: 'Hessa Mohamed',      team_name: 'Golden Gate FC',      gw_points: 84,  total: 291 },
];

// ============================================================
// SCORING RULES & CONSTANTS
// ============================================================

export const SCORING_RULES = {
  minutesUnder60: 1, minutes60Plus: 2,
  goalGKP: 6, goalDEF: 6, goalMID: 5, goalFWD: 4,
  assist: 3,
  cleanSheetGKP: 4, cleanSheetDEF: 4, cleanSheetMID: 1,
  yellowCard: -1, redCard: -3, ownGoal: -2, penaltyMiss: -2,
  savesEvery3: 1, penaltySave: 5,
  bonusMax: 3,
} as const;

export const BUDGET = 1000; // 100.0M in tenths
export const MAX_PLAYERS_PER_CLUB = 3;
export const SQUAD_REQS = { GKP: 2, DEF: 5, MID: 5, FWD: 3, TOTAL: 15 };

// ============================================================
// HELPERS
// ============================================================

export function getClub(id: string): FantasyClub {
  const club = fantasyClubs.find((c) => c.id === id);
  if (!club) throw new Error(`Club not found: ${id}`);
  return club;
}

export function getPlayersByPosition(pos: FPosition): FantasyPlayer[] {
  return fantasyPlayers.filter((p) => p.position === pos);
}

export function getPlayersByClub(clubId: string): FantasyPlayer[] {
  return fantasyPlayers.filter((p) => p.club_id === clubId);
}
