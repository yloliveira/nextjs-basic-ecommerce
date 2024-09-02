"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { makeServer } from "../mock-api/miragejs/server";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
