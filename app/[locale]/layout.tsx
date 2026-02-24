import type { ReactNode } from "react";
import Link from "next/link";
import { isLocale, t } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir}>
      <header className="header">
        <div className="header-inner">
          <Link href={`/${locale}`} className="brand">
            Soor<span>Esport</span>
          </Link>
          <nav className="nav">
            <Link href={`/${locale}`}>{t(locale, "home")}</Link>
            <Link href={`/${locale}/games`}>{t(locale, "games")}</Link>
            <div className="pill">
              <Link className={locale === "ar" ? "active" : ""} href="/ar">AR</Link>
              <span className="muted">|</span>
              <Link className={locale === "en" ? "active" : ""} href="/en">EN</Link>
            </div>
          </nav>
        </div>
      </header>
      <div className="container">{children}</div>
      <div className="footer">© {new Date().getFullYear()} SoorEsport</div>
    </div>
  );
}
