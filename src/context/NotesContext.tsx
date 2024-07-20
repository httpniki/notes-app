'use client'

import getNotes from '@/lib/localStorage/getNotes'
import saveNote from '@/lib/localStorage/saveNote'
import { Note } from '@/types/note'
import React, { useEffect, useState } from 'react'

interface ContextValue {
   notes: Note[]
   createNote: () => void
   getNote: (id: Note['id'] | Note['title']['content']) => Note | null
}

interface ContextProps {
   children: React.ReactNode
}
import { v4 as uuid } from 'uuid'

export const notesContext = React.createContext<ContextValue | null>(null) 

export default function NotesContextProvider({ children }: ContextProps) {
   const [notes, setNotes] = useState<Note[]>([])

   useEffect(() => {
      const savedNotes = getNotes()
      setNotes(savedNotes)
   },[])
   function createNote() {
      const newNote: Note = {
         id: uuid(),
         title: {
            content: '',
            emoji: '📝'
         },
         content: '',
         createAt: new Date().toUTCString()
      }

      setNotes([...notes, newNote])
      saveNote(newNote)
   }

   function getNote(id: Note['id'] | Note['title']['content']) {
      if(!notes.length) return null

      const note = notes.filter(el => 
         (el.id === id) || 
         (el.title.content === id)
      )

      return note[0]
   }

   return(
      <notesContext.Provider 
         value={{
            notes,
            createNote,
            getNote
         }}>
         {children}
      </notesContext.Provider>
   )
}

