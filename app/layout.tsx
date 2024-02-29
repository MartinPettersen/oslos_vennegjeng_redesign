import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/(navigation)/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oslo's vennegjeng",
  description: "Finn venner i Oslo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "flex h-screen w-full bg-red-500 mx-auto"}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
