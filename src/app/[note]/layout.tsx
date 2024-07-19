import React from "react";

export default function NoteLayout({ children }: { children: React.ReactNode }) {
   return(
      <section className="flex-1 overflow-auto h-full">
         {children}
      </section>
   )
}
