import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotesContextProvider from "@/context/NotesContext";
import React from "react";
import NotesPreviewSection from "@/components/NotesPreviewSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Notes",
};

export default function RootLayout({
   children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <NotesContextProvider>
               <main className="flex bg-brown w-screen h-screen">
                  <NotesPreviewSection/>
                  {children}
               </main>
            </NotesContextProvider>
         </body>
      </html>
   );
}
