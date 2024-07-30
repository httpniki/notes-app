'use client'

import useNotes from "@/hooks/useNotes";
import type { Note } from "@/types/note";
import React, { ReactNode, useEffect, useState } from "react";

interface RenderMenuState {
   render: boolean
   mousePosition: {
      x: number
      y: number
   }
}

interface ContextValue {
   note: Note | null
   renderMenu: RenderMenuState
   onContextMenu: (event: any, id: Note['id']) => void
}

export const notesMenuContext = React.createContext<ContextValue | null>(null)

export default function NotesMenuProvider({ children }: { children: ReactNode }) {
   const { getNote } = useNotes()
   const [note, setNote] = useState<Note | null>(null)
   const [renderMenu, setRenderMenu] = useState<RenderMenuState>({ 
      render: false, 
      mousePosition: { x: 0, y: 0 } 
   })

   useEffect(() => {
      function closeMenu() {
         setRenderMenu({
            render: false,
            mousePosition: { x: 0, y: 0 }
         })

         setNote(null)
      }
   
      document.addEventListener('click', closeMenu)
      return () => document.removeEventListener('click', closeMenu)
   },[])

   function onContextMenu(event: any, id: Note['id']) {
      event.preventDefault()

      setRenderMenu({
         render: true,
         mousePosition: { x: event.clientX, y: event.clientY }
      })
      
      const note = getNote(id)
      setNote(note)
   }

   return(
      <notesMenuContext.Provider value={{
         note,
         renderMenu,
         onContextMenu
      }}>
         {children}
      </notesMenuContext.Provider>
   )
}
