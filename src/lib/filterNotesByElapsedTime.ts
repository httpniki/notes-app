import { FilteredNotesByElapsedTime } from "@/types/context/notesContext";
import type { Note } from "@/types/note";
import { getElapsedTime } from "./getElapsedTime";

export default function filterNotesByElapsedTime(notes: Note[]): FilteredNotesByElapsedTime {
   const filteredNotes: FilteredNotesByElapsedTime = {
      today: [],
      yesterday: [],
      previous7Days: [],
      lastMonth: [],
      older: [] 
   }
      
   notes.forEach(note => {
      const { days } = getElapsedTime(new Date(note.createAt))

      if(days === 0) return filteredNotes.today.push(note)
      if(days === 1) return filteredNotes.yesterday.push(note)
      if(days > 1 && days <= 7) return filteredNotes.previous7Days.push(note)
      if(days > 7 && days <= 30) return filteredNotes.lastMonth.push(note)

      return filteredNotes.older.push(note)
   })

   return filteredNotes
}
