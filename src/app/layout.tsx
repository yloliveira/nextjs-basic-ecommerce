/* c8 ignore start */
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Body from "./body";

if (process.env.NODE_ENV === "development") {
  require("../mock-api/miragejs/server").makeServer({
    environment: "development",
  });
}

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
