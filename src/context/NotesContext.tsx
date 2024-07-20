'use client'

import getNotes from '@/lib/localStorage/getNotes'
import saveNote from '@/lib/localStorage/saveNote'
import type { ContextProps, ContextValue, UpdateNoteFields } from '@/types/context/notesContext'
import type { Note } from '@/types/note'
import React, { useEffect, useState } from 'react'
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

   function updateNote(id: Note['id'] | Note['title']['content'], fields: UpdateNoteFields) {
      const note = notes.filter(el => 
         (el.id === id) ||
         (el.title.content === id)
      )[0]

      note.title.content = fields.title?.content ?? note.title.content
      note.title.emoji = fields.title?.emoji ?? note.title.emoji
      note.content = fields.content ?? note.content

      saveNote(note)
      const updatedNotes = getNotes()
      setNotes(updatedNotes)
   }

   return(
      <notesContext.Provider 
         value={{
            notes,
            createNote,
            getNote,
            updateNote
         }}>
         {children}
      </notesContext.Provider>
   )
}

