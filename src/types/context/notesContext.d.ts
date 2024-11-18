import type { Note } from "../note"
import type React from 'react'

export interface UpdateNoteFields {
   title?: {
      content?: Note['title']['content']
      emoji?: Note['title']['emoji']
   }
   content?: string
   pinned?: boolean
}

export interface FilteredNotesByElapsedTime {
   search: Note[]
   pinned: Note[]
   today: Note[]
   yesterday: Note[]
   previous7Days: Note[]
   lastMonth: Note[]
   older: Note[]
}

export interface ContextValue {
   notes: FilteredNotesByElapsedTime
   createNote: () => void
   getNote: (id: Note['id'] | Note['title']['content']) => Note | null
   updateNote: (id: Note['id'] | Note['title']['content'], fields: UpdateNoteFields) => void
   deleteNote: (id: Note['id']) => void
   searchParams: string
   setSearchParams: (value: String) => void
}

export interface ContextProps {
   children: React.ReactNode
}
