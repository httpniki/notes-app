import { FilteredNotesByElapsedTime } from "@/types/context/notesContext";
import type { Note } from "@/types/note";
import { DateTime } from 'luxon'

function sortNotes(notes: FilteredNotesByElapsedTime) {
   const sortedNotes = {} as FilteredNotesByElapsedTime
   
   for(const key in notes) {
      const filter = notes[key as keyof FilteredNotesByElapsedTime]

      const sortedArray = filter.sort((a, b) => {
         const dateA = new Date(a.createAt).getTime()
         const dateB = new Date(b.createAt).getTime()

         if(dateA > dateB) return -1
         return 1
      })

      Object.assign(
         sortedNotes, 
         { [key]: sortedArray }
      )
   }

   return sortedNotes
}

export default function filterNotesByElapsedTime(notes: Note[]): FilteredNotesByElapsedTime {
   const filteredNotes: FilteredNotesByElapsedTime = {
      pinned: [],
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

      if(note.pinned) return filteredNotes.pinned.push(note)
      if(elapsedTime === 0) return filteredNotes.today.push(note)
      if(elapsedTime === 1) return filteredNotes.yesterday.push(note)
      if(elapsedTime > 1 && elapsedTime <= 7) return filteredNotes.previous7Days.push(note)
      if(elapsedTime > 7 && elapsedTime <= 30) return filteredNotes.lastMonth.push(note)

      return filteredNotes.older.push(note)
   })

   return sortNotes(filteredNotes)
}
