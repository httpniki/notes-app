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
      search: [],
      pinned: [],
      today: [], 
      yesterday: [], 
      previous7Days: [], 
      lastMonth: [],
      older: [] 
   })
   const [searchParams, setSearchParams] = useState('')

   useEffect(getNotes, [])
   useEffect(searchNote, [searchParams])

   function searchNote() {
      if(!searchParams) return  
      const findedNotes: Note[] = []

      for(const key in notes) {
         const filter = notes[key as keyof FilteredNotesByElapsedTime] 

         filter.map(note => {
            if(!note) return

            if(findedNotes.some(el => el.id === note.id)) return

            const conditions = [
               note.title.content.toString().includes(searchParams.toString()),
               note.content.toString().includes(searchParams.toString())
            ]

            if(conditions.some(el => el === true)) findedNotes.push(note)
         })
      }

      setNotes((prevState) => {
         return { ...prevState, search: findedNotes }
      })
   }

   function getNotes() {
      const notes = fetchNotes()
      const filteredNotes = filterNotesByElapsedTime(notes)

      setNotes({ ...filteredNotes, search: [] })
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

      saveNote(newNote)
      getNotes()
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
      removeNote(id)
      getNotes()
      setSearchParams("")
   }


   return(
      <notesContext.Provider 
         value={{
            notes,
            createNote,
            getNote,
            updateNote,
            deleteNote,
            searchParams,
            setSearchParams: setSearchParams as ContextValue['setSearchParams'] ,
         }}>
         {children}
      </notesContext.Provider>
   )
}

