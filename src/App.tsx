import { Routes, Route } from 'react-router-dom';
// import React from 'react';
// // import logo from './logo.svg';
import './App.css';
import Pesquisa from './pesquisa';
import Carrinho from './Carrinho';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Pesquisa /> } />
      <Route path="/shopping-cart" element={ <Carrinho /> } />
    </Routes>
  );
}

export default App;
