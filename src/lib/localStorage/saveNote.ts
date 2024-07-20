import type { Note } from "@/types/note"

export default function saveNote(note: Note) {
   let updatedNotes: Note[] = []
   const notesJSON = window.localStorage.getItem('notes')

   if(!notesJSON) updatedNotes = [note]

   if(notesJSON) {
      const notes: Note[] = JSON
         .parse(notesJSON)
         .map((el: Note) => {
            if(el.id === note.id) return note
            return el
         })

      updatedNotes = (notes.some(el => el.id === note.id))  
         ? notes
         : [...notes, note]
   } 

   window.localStorage.setItem('notes', JSON.stringify(updatedNotes))
}
