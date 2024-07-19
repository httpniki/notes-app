'use client'

import useNotes from "@/hooks/useNotes"
import CreateNoteSVG from "./assets/CreateNoteSVG"

export default function CreateNoteButton() {
   const { createNote } = useNotes()

   return(
      <button onClick={() => createNote()}>
         <CreateNoteSVG/>
      </button>
   )
}
