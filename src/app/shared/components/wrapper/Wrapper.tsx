import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

interface IWrapperProps{
  pag: string;
  
  children: React.ReactNode;
}

export const Wrapper: React.FC<IWrapperProps> = 
({children, pag}) => {
  return(
    <div className="Wrapper">
      <Header />
      
      <main className={pag} >
        {children}
      </main>

      <Footer />
    </div>
    
  )
}