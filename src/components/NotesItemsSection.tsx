import SearchSVG from "./assets/SearchSVG";
import CreateNoteButton from "./items/CreateNoteButton";
import RenderNotes from "./items/RenderNotes";

export default function NotesItemsSection() {
   return(
      <section className="overflow-auto flex flex-col h-screen sticky top-0 p-4 w-64 border-r gap-4 border-white">
         <div className="flex w-full gap-2">
            <SearchSVG/>

            <input 
               className="text-sm bg-brown text-white w-full focus:outline-none" 
               type="text"
               placeholder="Search"
            />
         </div>

         <div className="flex justify-between">
            <h2 className="text-xl text-white font-bold">
               Notes
            </h2>

            <CreateNoteButton/>
         </div>

         <ul className="flex flex-col gap-2 text-white">
            <RenderNotes/>
         </ul>
      </section>
   )
}
