'use client'

import useNotes from "@/hooks/useNotes"
import FilterNoteBy from "./FilterNoteBy"

export default function Notes() {
   const { notes } = useNotes()
   
   return(
      <>
         <FilterNoteBy 
            title="Today"
            notes={notes.today}
         />

         <FilterNoteBy 
            title="Yesterday"
            notes={notes.yesterday}
         />
 
         <FilterNoteBy 
            title="Last Month"
            notes={notes.lastMonth}
         />

         <FilterNoteBy 
            title="Previous 7 days"
            notes={notes.previous7Days}
         />        

         <FilterNoteBy 
            title="Older"
            notes={notes.older}
         />        
      </>
   )
}
