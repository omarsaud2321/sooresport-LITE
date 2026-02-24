export type League = "CDL" | "Challengers MENA" | "Challengers EU" | "Challengers NA" | "Saudi League" | "General";
export type GameSlug = "cod" | "cs2" | "rocket-league" | "overwatch";

export type Post = {
  id: string;
  createdAt: string;
  locale: "ar" | "en";
  game: GameSlug;
  category: "news" | "tournaments" | "teams";
  league?: League;
  title: string;
  summary: string;
  source?: string;
};

export const posts: Post[] = [
  {
    id: "ar-001",
    createdAt: "2026-02-24T12:00:00Z",
    locale: "ar",
    game: "cod",
    category: "tournaments",
    league: "CDL",
    title: "خبر تجريبي: تحديثات CDL",
    summary: "هذا مثال فقط — تقدر تعدّل الأخبار من ملف data/news.ts.",
    source: "https://x.com/SoorEsport"
  },
  {
    id: "en-001",
    createdAt: "2026-02-24T12:00:00Z",
    locale: "en",
    game: "cod",
    category: "tournaments",
    league: "CDL",
    title: "Demo: CDL updates",
    summary: "This is a demo entry — edit data/news.ts to change content.",
    source: "https://x.com/SoorEsport"
  }
];
