import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/(navigation)/Navbar";
import AuthProvider from "./components/AuthProvider";
import SideBar from "./components/(sidebar)/SideBar";

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
      <AuthProvider>
        <body
          className={
            inter.className +
            "flex h-screen w-full mx-auto bg-gradient-radial from-[#72bcde] to-[#efb4e9]"
          }
        >
          <Navbar />
          <div className="flex sm:h-[90%] h-full w-screen flex-row">
            <SideBar />
            <div className="h-full w-[75%] ">{children}</div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
