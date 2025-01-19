import ToastHandler from "@/components/ToastHandler";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./context/providers";
import "./globals.css";

// Local Fonts
const publicSans = localFont({
  src: "../public/assets/fonts/PublicSans-VariableFont_wght.ttf",
});

export const metadata: Metadata = {
  title: "Budget Pocket",
  description: "Budget-Pocket, your personal budgeting app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.className}  antialiased`}>
        <Providers>
          {children}
          <ToastHandler />
        </Providers>
      </body>
    </html>
  );
}
