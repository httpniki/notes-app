import type { Note } from "@/types/note"
import { DateTime } from "luxon"

export default function createNoteDate(noteDate: Note['createAt']) {
   const date = DateTime
      .fromISO(new Date(noteDate).toISOString())
      .setLocale('en-US')

   const month = date.monthShort
   const day = date.day
   const year = date.year
   const time = `${date.hour}:${date.minute < 10 ? '0' + date.minute : date.minute}`

   return `${month} ${day}, ${year} at ${time}`
}
