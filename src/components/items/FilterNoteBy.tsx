import { Note as NoteType } from "@/types/note"
import Note from "./Note"

interface Props {
   title: 'Today' | 'Yesterday' | 'Previous 7 days' | 'Last Month'| 'Older'
   notes: NoteType[]
}

export default function FilterNoteBy({ title, notes }: Props) {
   return(
      <>
         { (!!notes.length) && 
            <li>
               <p className="text-xs">{title}</p>        

               <ul>
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