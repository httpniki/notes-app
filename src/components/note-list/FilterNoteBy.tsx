import { Note as NoteType } from "@/types/note"
import Note from "./Note"

interface Props {
   title: 'Search' |  'Pinned'| 'Today' | 'Yesterday' | 'Previous 7 days' | 'Last Month'| 'Older' 
   notes: NoteType[]
   hideOnEmpty?: Boolean
}

export default function FilterNoteBy({ title, notes, hideOnEmpty = true }: Props) {
   return(
      <>
         {(!notes.length && hideOnEmpty) 
            ? null
            : <li>
               <p className="mb-1 px-1 mt-2 text-xs flex font-bold text-gray-200">{title}</p>        

               <ul className="flex flex-col gap-1">
                  {
                     notes.map(note => {
                        if(!note) return
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
