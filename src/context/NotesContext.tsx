'use client'

import { Note } from '@/types/note'
import React, { useState } from 'react'

interface ContextValue {
   notes: Note[]
}

interface ContextProps {
   children: React.ReactNode
}

export const notesContext = React.createContext<ContextValue | null>(null) 

export default function NotesContextProvider({ children }: ContextProps) {
   const [notes, setNotes] = useState<Note[]>([])

   return(
      <notesContext.Provider 
         value={{
            notes,
         }}>
         {children}
      </notesContext.Provider>
   )
}

