import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kensa – Ultra-Fast GitHub PR Reviews",
  description: "A browser extension for reviewing GitHub pull requests in a full-screen, continuous scroll layout with inline comments, batch reviews, and 50+ themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
