'use client'

import useNotes from "@/hooks/useNotes"
import type { Note as NoteType } from "@/types/note"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import NoteTitle from "./NoteTitle"
import { UpdateNoteFields } from "@/types/context/notesContext"

export default function Note() {
   const path = usePathname()
   const { notes,  getNote, updateNote } = useNotes()
   const [note, setNote] = useState<NoteType | null>(null)

   useEffect(() => {
      if(!notes) return
      const notePathID = path.split('/note-')[1] 
      const note = getNote(notePathID)

      setNote(note)
   },[notes])

   function handleUpdateNote(data: UpdateNoteFields) {
      return updateNote((note as NoteType).id, data)
   }

   return (
      <>
         {(note) && 
            <>
               <p className="text-gray-300 text-center text-xs">
                  {note.createAt}
               </p>

               <NoteTitle
                  title={note.title.content}
                  emoji={note.title.emoji}
                  handleUpdateNote={handleUpdateNote}
               />

               <textarea 
                  className="bg-brown overflow-clip text-sm flex-1 mt-4 text-white focus:outline-none"
                  placeholder="Start writing..."
                  onChange={({ target }) => handleUpdateNote({ content: target.value })}
               />
            </>
         }
      </>
   )
}
