'use client' 

import useNotes from "@/hooks/useNotes";
import SearchSVG from "../assets/SearchSVG";

export default function InputSearch() {
   const { setSearchParams } = useNotes()

   return(
      <label className="flex w-full gap-2 mb-4 px-1">
         <SearchSVG/>

         <input 
            className="text-sm bg-brown text-white w-full focus:outline-none" 
            type="text"
            placeholder="Search"
            onChange={e => setSearchParams(e.target.value)}
         />
      </label>
   )
}
