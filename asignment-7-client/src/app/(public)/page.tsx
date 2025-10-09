// import About from "@/components/modules/about/About";

import HeroHeader42 from "@/components/modules/about/About";
import Tabs from "@/components/modules/tabs/Tabs";


export const metadata = {
  title: "HakimDev | Full-Stack Web Developer",
  description:
    "Portfolio of a passionate Full-Stack Web Developer skilled in React.js, Next.js, Node.js, PostgreSQL, and MongoDB. Crafting scalable and modern applications.",
};

export default function PublicPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto lg:mt-14 mt-2">
       
        <HeroHeader42></HeroHeader42>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto lg:mt-16 mt-5">
        <Tabs></Tabs>
      </div>
   
    </div>
  )
}
