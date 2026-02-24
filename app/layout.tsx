import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "SoorEsport",
  description: "SoorEsport Lite",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
