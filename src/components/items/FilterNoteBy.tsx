import { Note as NoteType } from "@/types/note"
import Note from "./Note"

interface Props {
   title: 'Pinned'| 'Today' | 'Yesterday' | 'Previous 7 days' | 'Last Month'| 'Older' 
   notes: NoteType[]
}

export default function FilterNoteBy({ title, notes }: Props) {
   return(
      <>
         { (!!notes.length) && 
            <li>
               <p className="mb-1 px-1 mt-2 text-xs flex font-bold text-gray-200">{title}</p>        

               <ul className="flex flex-col gap-1">
                  {
                     notes.map(note => {
                        return <Note
                           key={note.id}
                           id={note.id}
                           createAt={note.createAt}
                           content={note.content}
                           title={note.title}
                        />
                     })
                  }
               </ul>
            </li>
         }
      </>
   )
}
