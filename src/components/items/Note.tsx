import { Note as NoteType } from "@/types/note"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props extends NoteType {}

export default function Note({ id, title, content, createAt }: Props) {
   const pathname = usePathname()
   const date = new Date(createAt).toLocaleDateString()
   const href = `/note-${id}`

   return(
      <li className={"px-3 py-1 rounded-lg" + 
         `${(pathname === href) ? ' bg-light-brown' : ''}`
      }>
         <Link 
            className="w-full text-start"
            href={href}
         >
            <h6 className="text-md flex font-bold">
               <span>{title.emoji}</span>
               <span className="ml-1 text-ellipsis overflow-hidden">
                  {title.content}
               </span>
            </h6>

            <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
               <span className="text-[0.8125rem]">
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
