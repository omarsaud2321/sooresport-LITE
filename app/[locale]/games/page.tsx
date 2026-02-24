import Link from "next/link";
import { isLocale, t } from "../../../lib/i18n";
import { games, gameLabel } from "../../../lib/games";

export default async function GamesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "ar";

  return (
    <div>
      <h1 className="h1">{t(locale, "games")}</h1>
      <div className="grid">
        {games.map((g) => (
          <div key={g.slug} className="card">
            <h2 className="h2">{gameLabel(locale, g.slug)}</h2>
            <p className="muted">{locale === "ar" ? "أقسام: الأخبار / البطولات / الفرق" : "Sections: news / tournaments / teams"}</p>
            <Link className="btn" href={`/${locale}/games/${g.slug}`}>{t(locale, "open")}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
