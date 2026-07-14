import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SENA CONSULTING — Cabinet de conseil en performance business pour PME/TPE",
  description: "Audit stratégique, vision claire et roadmap concrète pour décupler votre chiffre d'affaires. Méthodologie Grand Cabinet accessible aux PME/TPE. Diagnostic gratuit 45 min.",
  keywords: "conseil performance business, audit stratégique PME, cabinet conseil TPE, consultant manager, croissance entreprise, Ulrich GBADA, SENA CONSULTING",
  authors: [{ name: "Ulrich GBADA", url: "https://www.sena-consulting.fr" }],
  creator: "SENA CONSULTING",
  publisher: "SENA CONSULTING",
  metadataBase: new URL("https://www.sena-consulting.fr"),
  openGraph: {
    title: "SENA CONSULTING — Votre entreprise peut 10× sa croissance",
    description: "Cabinet de conseil en performance business pour dirigeants de PME/TPE. Diagnostic gratuit 45 min sans engagement.",
    url: "https://www.sena-consulting.fr",
    siteName: "SENA CONSULTING",
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: "/favicon-sena-consulting.png",
    shortcut: "/favicon-sena-consulting.png",
    apple: "/favicon-sena-consulting.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
