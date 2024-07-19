'use client'

import { Note } from '@/types/note'
import React, { useState } from 'react'

interface ContextValue {
   notes: Note[]
   createNote: () => void
}

interface ContextProps {
   children: React.ReactNode
}

export const notesContext = React.createContext<ContextValue | null>(null) 

export default function NotesContextProvider({ children }: ContextProps) {
   const [notes, setNotes] = useState<Note[]>([])

   function createNote() {
      const newNote: Note = {
         id: notes.length + 1,
         title: {
            content: '',
            emoji: '📝'
         },
         content: '',
         createAt: new Date().toUTCString()
      }

      setNotes([...notes, newNote])
   }

   return(
      <notesContext.Provider 
         value={{
            notes,
            createNote
         }}>
         {children}
      </notesContext.Provider>
   )
}

