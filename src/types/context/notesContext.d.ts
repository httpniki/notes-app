import type { Note } from "../note"
import type React from 'react'

export interface UpdateNoteFields {
   title?: {
      content?: Note['title']['content']
      emoji?: Note['title']['emoji']
   }
   content?: string
}

export interface ContextValue {
   notes: Note[]
   createNote: () => void
   getNote: (id: Note['id'] | Note['title']['content']) => Note | null
   updateNote: (id: Note['id'] | Note['title']['content'], fields: UpdateNoteFields) => void
}

export interface ContextProps {
   children: React.ReactNode
}
