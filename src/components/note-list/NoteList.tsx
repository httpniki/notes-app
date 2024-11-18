'use client'

import useNotes from "@/hooks/useNotes"
import FilterNoteBy from "./FilterNoteBy"

export default function NoteList() {
   const { notes, searchParams } = useNotes()

   return(
      <>
         {
            (searchParams) &&
               <FilterNoteBy 
                  title="Search"
                  notes={notes.search}
                  hideOnEmpty={false}
               />
         }

         {(!searchParams) && 
            <>
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
            </>
         }
      </>
   )
}
