export type Locale = "ar" | "en";
export function isLocale(v: string): v is Locale { return v === "ar" || v === "en"; }

export function t(locale: Locale, key: string) {
  const dict: Record<Locale, Record<string, string>> = {
    ar: { home:"الرئيسية", games:"الألعاب", choose_section:"اختر القسم", choose_league:"اختر الدوري", news:"الأخبار", tournaments:"البطولات", teams:"الفرق", latest:"آخر الأخبار", open:"فتح", no_results:"ما فيه نتائج حسب اختيارك." },
    en: { home:"Home", games:"Games", choose_section:"Choose section", choose_league:"Choose league", news:"News", tournaments:"Tournaments", teams:"Teams", latest:"Latest posts", open:"Open", no_results:"No results for your filters." }
  };
  return dict[locale][key] ?? key;
}
