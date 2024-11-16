'use client'

import Note from "@/components/note/Note";
import useNotes from "@/hooks/useNotes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Note as NoteType } from "@/types/note";

export default function Page() {
   const path = usePathname()
   const { notes,  getNote } = useNotes()
   const [note, setNote] = useState<NoteType | null>(null)

   useEffect(() => {
      if(!notes) return
      const notePathID = path.split('/note-')[1] 
      const note = getNote(notePathID)
      setNote(note)
   },[notes])

   return (
      <>
         {(note) && <Note note={note}/>}
      </>
   )
}
