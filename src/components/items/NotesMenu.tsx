import useNotes from "@/hooks/useNotes"
import useNotesMenu from "@/hooks/useNotesMenu"

interface Props {
   mousePoisiton: {
      x: number
      y: number
   }
}

export default function NotesMenu({ mousePoisiton }: Props) {
   const { noteId } = useNotesMenu()
   const { deleteNote } = useNotes()

   return(
      <div 
         className="top-0 left-0 flex py-1 gap-1 flex-col w-36 rounded-lg shadow-[0_0_5px_#00000075] z-10 bg-brown absolute"
         style={{ translate: `${mousePoisiton.x}px ${mousePoisiton.y}px` }}
         data-context-menu
      >
         <button className="w-full px-4 text-start text-sm text-white hover:bg-black/10 py-1">
            Pin
         </button>
         <button 
            className="w-full px-4 text-start text-sm text-white hover:bg-black/10 py-1"
            onClick={() => deleteNote(noteId as string)}
         >
            Delete
         </button> 
      </div>
   )
}
