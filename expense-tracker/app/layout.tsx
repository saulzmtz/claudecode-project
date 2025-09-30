import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ExpenseProvider } from "@/lib/hooks/useExpenses";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker - Manage Your Finances",
  description: "Track and manage your personal expenses with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <ExpenseProvider>
          {children}
        </ExpenseProvider>
      </body>
    </html>
  );
}
