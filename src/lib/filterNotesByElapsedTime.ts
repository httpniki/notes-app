import { FilteredNotesByElapsedTime } from "@/types/context/notesContext";
import type { Note } from "@/types/note";
import { DateTime } from 'luxon'

export default function filterNotesByElapsedTime(notes: Note[]): FilteredNotesByElapsedTime {
   const filteredNotes: FilteredNotesByElapsedTime = {
      today: [],
      yesterday: [],
      previous7Days: [],
      lastMonth: [],
      older: [] 
   }
      
   notes.forEach(note => {
      const elapsedDayString = (DateTime
         .fromISO(new Date(note.createAt).toISOString())
         .setLocale('en-US')
         .toRelative({ unit: 'days' })
         ?.match(/\d+/i) as RegExpMatchArray)[0] 

      const elapsedTime = Number(elapsedDayString)

      if(elapsedTime === 0) return filteredNotes.today.push(note)
      if(elapsedTime === 1) return filteredNotes.yesterday.push(note)
      if(elapsedTime > 1 && elapsedTime <= 7) return filteredNotes.previous7Days.push(note)
      if(elapsedTime > 7 && elapsedTime <= 30) return filteredNotes.lastMonth.push(note)

      return filteredNotes.older.push(note)
   })

   return filteredNotes
}
