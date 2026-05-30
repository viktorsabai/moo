import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./components/landing.css";
import "./components/scroll-story.css";

export const metadata: Metadata = {
  title: "MOO | Ресторан в Telegram",
  description:
    "Заказы и постоянные гости без комиссии агрегаторов. Запуск за 48 часов — @topka_demo_bot",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
