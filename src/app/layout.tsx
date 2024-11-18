import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotesContextProvider from "@/context/NotesContext";
import React from "react";
import NoteSection from "@/components/NoteSection";
import NotesListSection from "@/components/NotesListSection";
import NotesMenuProvider from "@/context/NotesMenuContext";

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
               <NotesMenuProvider>
                  <main className="flex bg-brown w-screen h-screen">
                     <NotesListSection/>

                     <NoteSection>
                        {children}
                     </NoteSection>
                  </main>
               </NotesMenuProvider>
            </NotesContextProvider>
         </body>
      </html>
   );
}
