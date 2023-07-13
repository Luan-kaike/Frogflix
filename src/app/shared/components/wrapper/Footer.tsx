import React from "react";

import './css/Footer.css'

export const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <ul>
        <li><h2>Créditos</h2></li>
        <li>
          <a href="https://www.themoviedb.org/about?language=pt-BR" className="href">TMDB</a>
        </li>
        <li>
          <a href="https://fontawesome.com/" className="href">Font Awesome</a>
        </li>
      </ul>

      <ul>
        <li><h2>Sobre</h2></li>
        <li>
          <a href="#" className="href">Documentação</a>
        </li>
        <li>
          <a href="#" className="href">Sobre mim</a>
        </li>
      </ul>

      <ul>
        <li><h2>Contatos</h2></li>
        <li>
          <a href="mailto:luangaymer828@gmail.com" className="href">Email</a>
        </li>
        <li>
          <a href="https://github.com/Luan-kaike" className="href">Github</a>
        </li>
      </ul>
    </footer>
  )
} 