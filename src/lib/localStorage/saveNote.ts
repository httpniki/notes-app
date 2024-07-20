import { Note } from "@/types/note"

export default function saveNote(note: Note) {
   let updatedNotes: Note[] = []
   const notesJSON = window.localStorage.getItem('notes')

   if(!notesJSON) updatedNotes = [note]

   if(notesJSON) {
      const notes = JSON.parse(notesJSON)
      updatedNotes = [...notes, note]
   } 

   window.localStorage.setItem('notes', JSON.stringify(updatedNotes))
}
