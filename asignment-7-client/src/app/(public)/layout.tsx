

import Footer from "@/components/shared/Footer";
import Portfolio from "@/components/shared/Home";

import Navbar from "@/components/shared/Navbar/Navbar";
import React from "react";
import AllBlogsClients from "../blog/page";



 export interface IChildren {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: IChildren) {
  return (
    <div>
      <Navbar />
      <Portfolio></Portfolio>
      
     <main className="min-h-dvh ">{children}</main>

      <AllBlogsClients></AllBlogsClients>
      <Footer></Footer>
     
    </div>
  );
}
