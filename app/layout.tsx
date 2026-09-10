import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/globalmart/store-provider";
import { Header, Footer } from "@/components/globalmart/shell";

export const metadata: Metadata = {
  title: "GlobalMart | Everyday wellness, thoughtfully chosen",
  description: "Discover a world of vitamins, supplements and everyday wellness. GlobalMart brings international brands closer to Sri Lanka.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><StoreProvider><Header/>{children}<Footer/></StoreProvider></body>
    </html>
  );
}
