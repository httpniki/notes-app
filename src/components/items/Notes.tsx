'use client'

import useNotes from "@/hooks/useNotes"
import FilterNoteBy from "./FilterNoteBy"
import NotesMenuProvider from "@/context/NotesMenuContext"

export default function Notes() {
   const { notes } = useNotes()
   
   return(
      <NotesMenuProvider>
         <FilterNoteBy 
            title="Pinned"
            notes={notes.pinned}
         />

         <FilterNoteBy 
            title="Today"
            notes={notes.today}
         />

         <FilterNoteBy 
            title="Yesterday"
            notes={notes.yesterday}
         />
 
         <FilterNoteBy 
            title="Previous 7 days"
            notes={notes.previous7Days}
         />      

         <FilterNoteBy 
            title="Last Month"
            notes={notes.lastMonth}
         />  

         <FilterNoteBy 
            title="Older"
            notes={notes.older}
         />        
      </NotesMenuProvider>
   )
}
