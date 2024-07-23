import type { Note } from "@/types/note"

export default function createNoteDate(noteDate: Note['createAt']) {
   const date = new Date(noteDate)
   const month = date.toLocaleString('en-US', { month: 'long' })
   const time = date.toLocaleString('en-US')
      .replace(/[\d/]+,/i, '')
      .replace(/(\d{1,2}:\d{2}):\d{2}/, '$1')

   return `${month} ${date.getDay()}, ${date.getFullYear()} at ${time}`
}
