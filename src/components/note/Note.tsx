'use client'

import useNotes from "@/hooks/useNotes"
import type { Note as NoteType } from "@/types/note"
import NoteTitle from "./NoteTitle"
import type { UpdateNoteFields } from "@/types/context/notesContext"
import createNoteDate from "@/lib/createNoteDate"
import Content from "./Content"

interface Props {
   note: NoteType
}

export default function Note({ note }: Props) {
   const { updateNote } = useNotes()

   function onUpdateNote(data: UpdateNoteFields) {
      return updateNote((note as NoteType).id, data)
   }
   
   return (
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
   )
}
