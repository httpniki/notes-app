import { notesMenuContext } from "@/context/NotesMenuContext";
import { useContext } from "react";

export default function useNotesMenu() {
   const context = useContext(notesMenuContext)

   if(!context) throw new Error('Context not found')

   return context
}
