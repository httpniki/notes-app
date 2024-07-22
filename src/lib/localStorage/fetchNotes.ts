import type { Note } from "@/types/note"

export default function fetchNotes(): Note[] {
   const notesJSON = window.localStorage.getItem('notes')

   if(!notesJSON) return []
   
   return JSON.parse(notesJSON)
}
