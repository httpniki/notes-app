import { Note as NoteType } from "@/types/note"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef } from "react"
import NotesPopup from "./NotesMenu"
import RenderModal from "./RenderModal"
import useNotesPopup from "@/hooks/useNotesMenu"

interface Props extends Pick<NoteType, 'id' | 'title' | 'content' | 'createAt'> {}

export default function Note({ id, title, content, createAt }: Props) {
   const { renderMenu, onContextMenu, note } = useNotesPopup() 
   const pathname = usePathname()
   const noteRef = useRef<HTMLLIElement>(null)

   const date = new Date(createAt).toLocaleDateString()
   const href = `/note-${id}`
   
   return(
      <li 
         className={"px-3 py-1 rounded-lg" + 
            `${(pathname === href) ? ' bg-light-brown' : ''}`
         }
         ref={noteRef}
         onContextMenu={(event) => onContextMenu(event, id)}
      >
         <Link 
            className="w-full text-start"
            href={href}
         >
            <h6 className="text-sm flex font-bold">
               <span>{title.emoji}</span>
               <span className="ml-1 text-ellipsis overflow-hidden">
                  {title.content}
               </span>
            </h6>

            <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
               <span className="text-[0.8125rem]">
                  {date}
               </span>      
               
               <span className={"ml-1" + 
                  `${(pathname === href) ? ' text-white opacity-65' : ' text-gray-400'}`
               }>
                  {content}
               </span>
            </p>
         </Link>

         <RenderModal>
            {
               (renderMenu.render && note?.id === id) && 
               <NotesPopup mousePoisiton={{ 
                  x: renderMenu.mousePosition.x,
                  y: renderMenu.mousePosition.y
               }}/>
            }
         </RenderModal>
      </li>
   )
}
