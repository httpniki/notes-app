'use client'

import type { Note } from "@/types/note";
import React, { ReactNode, useEffect, useState } from "react";

interface RenderMenuState {
   noteId: Note['id'] | null
   render: boolean
   mousePosition: {
      x: number
      y: number
   }
}

interface ContextValue {
   noteId: RenderMenuState['noteId']
   renderMenu: RenderMenuState
   onContextMenu: (event: any, id: Note['id']) => void
}

export const notesMenuContext = React.createContext<ContextValue | null>(null)

export default function NotesMenuProvider({ children }: { children: ReactNode }) {
   const [renderMenu, setRenderMenu] = useState<RenderMenuState>({ 
      noteId: null,
      render: false, 
      mousePosition: { x: 0, y: 0 } 
   })

   useEffect(() => {
      function closeMenu() {
         setRenderMenu({
            noteId: null,
            render: false,
            mousePosition: { x: 0, y: 0 }
         })
      }
   
      document.addEventListener('click', closeMenu)
      return () => document.removeEventListener('click', closeMenu)
   },[])

   function onContextMenu(event: any, id: Note['id']) {
      event.preventDefault()

      setRenderMenu({
         noteId: id,
         render: true,
         mousePosition: { x: event.clientX, y: event.clientY }
      })
   }

   return(
      <notesMenuContext.Provider value={{
         noteId: renderMenu.noteId,
         renderMenu,
         onContextMenu
      }}>
         {children}
      </notesMenuContext.Provider>
   )
}
