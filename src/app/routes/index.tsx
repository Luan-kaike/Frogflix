import React from "react"
import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom"
import { Dashboard, Login, Description, List } from "../page"

export const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/pagina-inicial" element={<Dashboard />}/>
        <Route path="/descricao/:media/:id" element={<Description />}/>
        <Route path="/lista/:media/:recurse/:pag" element={<List />}/>
        <Route path="/entrar" element={<Login />}/>
        <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
      </Switch>
    </BrowserRouter>
  )
}
