import Link from "next/link";
import { isLocale, t } from "../../../../lib/i18n";
import { codLeagues, gameLabel } from "../../../../lib/games";
import { posts } from "../../../../data/news";
function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default async function GamePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string; game: string }>;
  searchParams: Promise<{ section?: string; league?: string }>;
}) {
  const { locale: rawLocale, game: rawGame } = await params;
  const sp = await searchParams;

  const locale = isLocale(rawLocale) ? rawLocale : "ar";
  const game = rawGame as GameSlug;

  const section = (sp.section ?? "news") as "news" | "tournaments" | "teams";
  const league = sp.league;

  const allLeagues = game === "cod"
    ? Array.from(codLeagues)
    : uniq(posts.filter(p => p.game === game && p.league).map(p => p.league as League));

  const filtered = posts
    .filter(p => p.locale === locale)
    .filter(p => p.game === game)
    .filter(p => p.category === section)
    .filter(p => section !== "tournaments" ? true : (league ? p.league === league : true))
    .sort((a,b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 30);

  return (
    <div>
      <h1 className="h1">{gameLabel(locale, game)}</h1>

      <div className="filters">
        <div>
          <div className="small">{t(locale, "choose_section")}</div>
          <select
            className="select"
            defaultValue={section}
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set("section", e.target.value);
              if (e.target.value !== "tournaments") url.searchParams.delete("league");
              window.location.href = url.toString();
            }}
          >
            <option value="news">{t(locale, "news")}</option>
            <option value="tournaments">{t(locale, "tournaments")}</option>
            <option value="teams">{t(locale, "teams")}</option>
          </select>
        </div>

        <div>
          <div className="small">{t(locale, "choose_league")}</div>
          <select
            className="select"
            defaultValue={league ?? ""}
            disabled={section !== "tournaments"}
            onChange={(e) => {
              const url = new URL(window.location.href);
              if (e.target.value) url.searchParams.set("league", e.target.value);
              else url.searchParams.delete("league");
              window.location.href = url.toString();
            }}
          >
            <option value="">{locale === "ar" ? "الكل" : "All"}</option>
            {allLeagues.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="small">{locale === "ar" ? "روابط سريعة" : "Quick links"}</div>
          <div className="pill" style={{ justifyContent: "center" }}>
            <Link href={`/${locale}/games/${game}?section=news`} className={section==="news" ? "active" : ""}>{t(locale,"news")}</Link>
            <span className="muted">|</span>
            <Link href={`/${locale}/games/${game}?section=tournaments`} className={section==="tournaments" ? "active" : ""}>{t(locale,"tournaments")}</Link>
            <span className="muted">|</span>
            <Link href={`/${locale}/games/${game}?section=teams`} className={section==="teams" ? "active" : ""}>{t(locale,"teams")}</Link>
          </div>
        </div>
      </div>

      <div className="list">
        {filtered.length === 0 ? (
          <div className="item">{t(locale, "no_results")}</div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="item">
              <div className="row">
                <div style={{ fontWeight: 800 }}>{p.title}</div>
                <div className="small">{new Date(p.createdAt).toLocaleString(locale === "ar" ? "ar-SA" : "en-US")}</div>
              </div>
              <div className="muted" style={{ marginTop: 6 }}>{p.summary}</div>
              <div className="badges">
                <span className="badge">{p.category}</span>
                {p.league ? <span className="badge">{p.league}</span> : null}
                <a className="badge" href="https://x.com/SoorEsport" target="_blank" rel="noreferrer">x.com/SoorEsport</a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
