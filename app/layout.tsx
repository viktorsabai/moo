import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOO | Telegram Restaurant Growth OS",
  description:
    "MOO turns Telegram Mini App commerce into an owned restaurant growth channel with Guest CRM, AI recommendations, and retention loops.",
  keywords: [
    "restaurant",
    "Telegram Mini App",
    "Guest CRM",
    "AI",
    "retention",
    "restaurant growth",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
