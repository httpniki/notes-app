export default function getNotes() {
   const notesJSON = window.localStorage.getItem('notes')

   if(!notesJSON) return []
   
   return JSON.parse(notesJSON)
}
