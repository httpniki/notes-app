'use client'

import useNotes from "@/hooks/useNotes"
import NoteItem from "./NoteItem"

export default function RenderNotes() {
   const { notes } = useNotes()

   return(
      <>
         {
            notes.map(note => {
               return <NoteItem
                  key={note.id}
                  id={note.id}
                  createAt={note.createAt}
                  content={note.content}
                  title={note.title}
               />
            })
         }     
      </>
   )
}
