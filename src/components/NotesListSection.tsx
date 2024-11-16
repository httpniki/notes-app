import SearchSVG from "./assets/SearchSVG";
import CreateNoteButton from "./items/CreateNoteButton";
import NoteList from "./items/NoteList";

export default function NotesListSection() {
   return(
      <section className="overflow-auto flex flex-col h-screen sticky top-0 px-2 py-4 w-64 border-r border-white">
         <label className="flex w-full gap-2 mb-4 px-1">
            <SearchSVG/>

            <input 
               className="text-sm bg-brown text-white w-full focus:outline-none" 
               type="text"
               placeholder="Search"
            />
         </label>

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
