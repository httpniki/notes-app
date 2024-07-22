import { Note as NoteType } from "@/types/note"
import Link from "next/link"

interface Props extends NoteType {}

export default function Note({ id, title, content, createAt }: Props) {
   const date = new Date(createAt).toLocaleDateString()
   const href = `/note-${id}`

   return(
      <li>
         <Link 
            className="w-full text-start"
            href={href}
         >
            <h6 className="text-md flex font-bold">
               <span>{title.emoji}</span>
               <span className="ml-1 text-ellipsis overflow-hidden">{title.content}</span>
            </h6>

            <p className="text-sm overflow-hidden text-ellipsis">
               <span className="text-white">
                  {date}
               </span>      
               
               <span className="ml-1 text-gray-400">
                  {content}
               </span>
            </p>
         </Link>
      </li>
   )
}
