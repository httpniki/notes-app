import type { Note } from "@/types/note"
import { useState } from "react"
import Markdown from 'react-markdown'

interface Props {
   content: Note['content']
   onUpdateNote: (content: Note['content']) => void
}

export default function Content({ content, onUpdateNote }: Props) {
   const [isFocused, setIsFocused] = useState(false)

   return(
      <div 
         id="note-content"
         onClick={() => setIsFocused(true)}
         className="flex whitespace-break-spaces text-white text-sm pt-4 flex-1"
         style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
      >
         <label className="flex-1">
            {
               (isFocused || !content.length) 
                  ? <textarea 
                     className="bg-brown h-full w-full overflow-clip focus:outline-none"
                     placeholder="Start writing..."
                     onChange={({ target }) => onUpdateNote(target.value)}
                     onBlur={() => setIsFocused(false)}
                     defaultValue={content}
                  /> 
                  : <Markdown>{content}</Markdown>
            }
         </label>
      </div>

   )
}
