import { Note } from "@/types/note"

interface Props extends Note {}

export default function NoteItem({ id, title, content, createAt }: Props) {
   const date = new Date(createAt).toLocaleDateString()

   return(
      <li>
         <button className="w-full text-start">
            <h6 className="text-md font-bold">
               <span>{title.emoji}</span>
               <span className="ml-1">{title.content}</span>
            </h6>

            <p className="text-sm">
               <span className="text-white">
                  {date}
               </span>      
               
               <span className="ml-1 text-gray-400">
                  {content}
               </span>
            </p>
         </button>
      </li>
   )
}
