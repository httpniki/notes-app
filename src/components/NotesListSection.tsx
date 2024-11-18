import CreateNoteButton from "./note-list/CreateNoteButton";
import InputSearch from "./note-list/InputSearch";
import NoteList from "./note-list/NoteList";

export default function NotesListSection() {
   return(
      <section className="overflow-auto flex flex-col h-screen sticky top-0 px-2 py-4 w-64 border-r border-white">
         <InputSearch/>

         <div className="flex justify-between px-1">
            <h2 className="text-xl text-white font-bold">
               Notes
            </h2>

            <CreateNoteButton/>
         </div>

         <ul className="flex flex-col mt-1 text-white">
            <NoteList/>
         </ul>
      </section>
   )
}
