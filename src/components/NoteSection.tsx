import type React from "react"

interface Props {
   children: React.ReactNode
}

export default function NoteSection({ children }: Props) {
   return (
      <section className="flex-1 flex flex-col gap-2 px-5 py-4 overflow-auto min-h-screen">
         {children}
      </section>
   )
}
