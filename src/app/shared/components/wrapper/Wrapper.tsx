import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

interface IWrapperProps{
  heightAuto?: boolean
  
  children: React.ReactNode
}

export const Wrapper: React.FC<IWrapperProps> = ({children, heightAuto}) => {
  return(
    <div className="Wrapper">
      <Header />
      
      <main style={{height: heightAuto?'auto' : '100vh'}}>
        {children}
      </main>

      <Footer />
    </div>
    
  )
}