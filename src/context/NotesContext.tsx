'use client'

import filterNotesByElapsedTime from '@/lib/filterNotesByElapsedTime'
import fetchNotes from '@/lib/localStorage/fetchNotes'
import saveNote from '@/lib/localStorage/saveNote'
import type { 
   ContextProps, 
   ContextValue, 
   FilteredNotesByElapsedTime, 
   UpdateNoteFields 
} from '@/types/context/notesContext'
import type { Note } from '@/types/note'
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import removeNote from '@/lib/localStorage/deleteNote'

export const notesContext = React.createContext<ContextValue | null>(null) 

export default function NotesContextProvider({ children }: ContextProps) {
   const [notes, setNotes] = useState<FilteredNotesByElapsedTime>({ 
      pinned: [],
      today: [], 
      yesterday: [], 
      previous7Days: [], 
      lastMonth: [],
      older: [] 
   })

   useEffect(getNotes, [])

   function getNotes() {
      const notes = fetchNotes()
      const filteredNotes = filterNotesByElapsedTime(notes)

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
         createAt: new Date().toUTCString(),
         pinned: false
      }

      setNotes({ ...notes, today: [...notes.today, newNote] })
      saveNote(newNote)
   }

   function getNote(id: Note['id']): Note | null {
      let note: Note | null = null

      for(const key in notes) {
         const filter = notes[key as keyof FilteredNotesByElapsedTime]

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

      if(fields.title?.content) note.title.content = fields.title.content
      if(fields.title?.emoji) note.title.emoji = fields.title.emoji
      if(fields.content) note.content = fields.content
      if(typeof fields.pinned === 'boolean') note.pinned = fields.pinned

      saveNote(note)
      getNotes()
   }

   function deleteNote(id: Note['id']) {
      let updatedNotes = {} as FilteredNotesByElapsedTime

      for(const key in notes) {
         const filter = notes[key as keyof FilteredNotesByElapsedTime]
         const updatedFilter = filter.filter(el => el.id !== id)

         Object.assign(updatedNotes, { [key]: updatedFilter })
      }
   
      removeNote(id)
      return setNotes(updatedNotes)
   }


   return(
      <notesContext.Provider 
         value={{
            notes,
            createNote,
            getNote,
            updateNote,
            deleteNote
         }}>
         {children}
      </notesContext.Provider>
   )
}

