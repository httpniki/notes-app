'use client'

import getNotes from '@/lib/localStorage/getNotes'
import saveNote from '@/lib/localStorage/saveNote'
import type { ContextProps, ContextValue, FilteredNotes, UpdateNoteFields } from '@/types/context/notesContext'
import type { Note } from '@/types/note'
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

export const notesContext = React.createContext<ContextValue | null>(null) 

export default function NotesContextProvider({ children }: ContextProps) {
   const [notes, setNotes] = useState<FilteredNotes>({ 
      today: [], 
      yesterday: [], 
      previous7Days: [], 
      lastMonth: [],
      older: [] 
   })

   useEffect(() => {
      fetchNotes()
   },[])

   function fetchNotes() {
      const savedNotes = getNotes()
      const filteredNotes: FilteredNotes = {
         today: [],
         yesterday: [],
         previous7Days: [],
         lastMonth: [],
         older: [] 
      }
      
      savedNotes.map(note => {
         const todayDateInMiliseconds = new Date().getTime()
         const noteDateInMiliseconds = new Date(note.createAt).getTime()

         const seconds = (todayDateInMiliseconds - noteDateInMiliseconds) / 1000
         const minutes = seconds / 60
         const hours = minutes / 60
         const days = Math.floor(hours / 24)

         if(days === 0) return filteredNotes.today.push(note)
         if(days === 1) return filteredNotes.yesterday.push(note)
         if(days > 1 && days <= 7) return filteredNotes.previous7Days.push(note)
         if(days > 7 && days <= 30) return filteredNotes.lastMonth.push(note)
         return filteredNotes.older.push(note)
      })

      setNotes(filteredNotes)
   }

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

      setNotes({ ...notes, today: [...notes.today, newNote] })
      saveNote(newNote)
   }

   function getNote(id: Note['id']): Note | null {
      let note: Note | null = null

      for(const key in notes) {
         const filter = notes[key as keyof FilteredNotes]

         filter.forEach(el => {
            if(!el) return 
            if ((el.id === id) || (el.title.content === id)) note = el
         })  
      }

      return note 
   }

   function updateNote(id: Note['id'], fields: UpdateNoteFields) {
      const note = getNote(id)
      
      if(!note) throw new Error('Note not found')

      note.title.content = fields.title?.content ?? note.title.content
      note.title.emoji = fields.title?.emoji ?? note.title.emoji
      note.content = fields.content ?? note.content

      saveNote(note)
      fetchNotes()
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

