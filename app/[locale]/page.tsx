import Link from "next/link";
import { isLocale, t } from "@/lib/i18n";
import { games, gameLabel } from "@/lib/games";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "ar";

  return (
    <div>
      <h1 className="h1">SoorEsport</h1>
      <p className="muted">
        {locale === "ar"
          ? "نسخة خفيفة بدون قاعدة بيانات — تقدر تشوف الشكل وتبدأ بسرعة."
          : "Lightweight version without a database — preview the site and start fast."}
      </p>

      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card">
          <h2 className="h2">{t(locale, "games")}</h2>
          <p className="muted">{locale === "ar" ? "اختر لعبة وادخل أقسامها." : "Pick a game and open its sections."}</p>
          <div className="badges">
            {games.map((g) => (
              <Link key={g.slug} className="badge" href={`/${locale}/games/${g.slug}`}>
                {gameLabel(locale, g.slug)}
              </Link>
            ))}
          </div>
          <Link className="btn" href={`/${locale}/games`}>{t(locale, "open")}</Link>
        </div>

        <div className="card">
          <h2 className="h2">{t(locale, "latest")}</h2>
          <p className="muted">
            {locale === "ar"
              ? "الهدف: تدخل اللعبة + القسم وتطلع لك النتائج."
              : "Goal: pick game + section and see results."}
          </p>
          <Link className="btn" href={`/${locale}/games`}>{t(locale, "open")}</Link>
        </div>
      </div>
    </div>
  );
}
