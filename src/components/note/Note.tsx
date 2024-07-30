'use client'

import useNotes from "@/hooks/useNotes"
import type { Note as NoteType } from "@/types/note"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import NoteTitle from "./NoteTitle"
import type { UpdateNoteFields } from "@/types/context/notesContext"
import createNoteDate from "@/lib/createNoteDate"
import Content from "./Content"

export default function Note() {
   const path = usePathname()
   const { notes,  getNote, updateNote } = useNotes()
   const [note, setNote] = useState<NoteType | null>(null)

   useEffect(() => {
      if(!notes) return
      const notePathID = path.split('/note-')[1] 
      setNote(getNote(notePathID))
   },[notes])

   function onUpdateNote(data: UpdateNoteFields) {
      return updateNote((note as NoteType).id, data)
   }

   return (
      <>
         {(note) && 
            <>
               <p className="text-gray-300 text-center text-xs">
                  {
                     createNoteDate(note.createAt)
                  }
               </p>

               <NoteTitle
                  title={note.title.content}
                  emoji={note.title.emoji}
                  onUpdateNote={onUpdateNote}
               />
               
               <Content 
                  content={note.content}
                  onUpdateNote={(content) => onUpdateNote({ content })}
               />
            </>
         }
      </>
   )
}
