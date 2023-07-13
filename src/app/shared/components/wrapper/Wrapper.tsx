import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface IWrapperProps{
  children: React.ReactNode
}

export const Wrapper: React.FC<IWrapperProps> = ({children}) => {
  return(
    <>
      <Header />
      
      <main>
        {children}
      </main>

      <Footer />
    </>
    
  )
}