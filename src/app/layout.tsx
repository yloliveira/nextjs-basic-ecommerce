/* c8 ignore start */
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "./plugins/miragejs";
import Body from "./body";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Body>{children}</Body>
      </body>
    </html>
  );
}
/* c8 ignore stop */
