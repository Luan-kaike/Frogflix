import React from "react"
import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom"
import { Dashboard, Login, Description } from "../page"

export const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/pagina-inicial" element={<Dashboard />}/>
        <Route path="/descricao" element={<Description />}/>
        <Route path="/entrar" element={<Login />}/>
        <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
      </Switch>
    </BrowserRouter>
  )
}