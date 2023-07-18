import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

interface IWrapperProps{
  heightAuto?: boolean;
  pag: string;
  
  children: React.ReactNode;
}

export const Wrapper: React.FC<IWrapperProps> = 
({children, heightAuto, pag}) => {
  return(
    <div className="Wrapper">
      <Header />
      
      <main className={pag} style={{height: heightAuto?'auto' : '100vh'}}>
        {children}
      </main>

      <Footer />
    </div>
    
  )
}