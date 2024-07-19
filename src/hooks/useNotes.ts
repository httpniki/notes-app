import { notesContext } from "@/context/NotesContext"
import { useContext } from "react"

export default function useNotes() {
   const context = useContext(notesContext)

   if(!context) throw new Error('Context not found')

   return context
}
