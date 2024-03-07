import Image from "next/image";
import Navbar from "./components/(navigation)/Navbar";
import Picture from "./components/(picture)/Picture";
import ContainerForum from "./components/(forum)/ContainerForum";


export default function Home() {
  return (
    <main className="flex w-screen sm:w-full flex-row gap-2 items-start  sm:items-start justify-start sm:justify-center  h-full sm:h-full">
        
        <div className="flex w-full items-center justify-center sm:hidden">

          <ContainerForum />
        </div>

        
    </main>
  );
}
