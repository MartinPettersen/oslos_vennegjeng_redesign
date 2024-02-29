import Image from "next/image";
import Navbar from "./components/(navigation)/Navbar";
import Picture from "./components/(picture)/Picture";

export default function Home() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-start  h-full sm:h-[90%] pl-24 pr-24">
        
        <Picture />
        <div>bilde</div>
        <div>forum Container</div>
        
    </main>
  );
}
