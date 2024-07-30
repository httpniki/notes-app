import type { Note } from "@/types/note";

export default function deleteNote(id: Note['id']) {
   const savedNotes = window.localStorage.getItem('notes')
   if(!savedNotes) throw new Error('Notes not found')
   
   const notes: Note[] = JSON.parse(savedNotes)
   const updatedNotes = notes.filter(el => el.id !== id)
   
   window.localStorage.setItem('notes', JSON.stringify(updatedNotes))

   return notes
}
