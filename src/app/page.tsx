import SearchSVG from "@/components/assets/SearchSVG";

export default function Home() {
   return (
      <main className="flex bg-brown w-screen h-screen">
         <section className="overflow-auto flex flex-col h-full p-4 w-64 border-r gap-4 border-white">
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
            </div>
            <ul className="flex flex-col gap-2 text-white">
            </ul>
         </section>

         <section className="flex-1 h-full"></section>
      </main>
   );
}
