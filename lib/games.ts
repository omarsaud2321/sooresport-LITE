export type Game = { slug: "cod"|"cs2"|"rocket-league"|"overwatch"; name_ar: string; name_en: string; };

export const games: Game[] = [
  { slug: "cod", name_ar: "Call of Duty", name_en: "Call of Duty" },
  { slug: "cs2", name_ar: "CS2", name_en: "CS2" },
  { slug: "rocket-league", name_ar: "Rocket League", name_en: "Rocket League" },
  { slug: "overwatch", name_ar: "Overwatch", name_en: "Overwatch" }
];

export const codLeagues = ["General","CDL","Challengers MENA","Challengers EU","Challengers NA","Saudi League"] as const;

export function gameLabel(locale: "ar"|"en", slug: Game["slug"]) {
  const g = games.find(x => x.slug === slug);
  if (!g) return slug;
  return locale === "ar" ? g.name_ar : g.name_en;
}
