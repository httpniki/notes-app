'use client'

import { UpdateNoteFields } from "@/types/context/notesContext";
import { Note } from "@/types/note";
import { useState } from "react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface Props {
   title: Note['title']['content']
   emoji: Note['title']['emoji']
   onUpdateNote: (data: UpdateNoteFields) => void
}

export default function NoteTitle({ title, emoji, onUpdateNote }: Props) {
   const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

   function onSelectEmoji(emoji: Note['title']['emoji']) {
      onUpdateNote({ title: { emoji } })
      return setOpenEmojiPicker(false)
   }

   return(
      <>
         <div className="flex gap-2">
            <button 
               className="relative text-xl"
               onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
               {emoji}
            </button>

            <input 
               className="w-full focus:outline-none bg-brown text-white text-2xl font-bold"
               type="text" 
               placeholder="Your title here..."
               defaultValue={title}
               onChange={(event) => onUpdateNote({ title: { content: event.target.value } })}
            />

            <div className="absolute top-16">
               {(openEmojiPicker) && 
                  <Picker 
                     data={data} 
                     onEmojiSelect={(data: any) => onSelectEmoji(data.native)}
                     onClickOutside={() => setOpenEmojiPicker(false)}
                  />
               }

            </div>
         </div>
      </>
   )
}
