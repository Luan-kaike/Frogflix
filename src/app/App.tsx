import React from 'react';
import { Routes } from './routes/index';
import { UsuarioLogadoProvider } from './shared/context';

export const App = () => {
  return (
    <UsuarioLogadoProvider>
      <Routes/>
    </UsuarioLogadoProvider>
  )
}
