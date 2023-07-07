import { Routes, Route } from 'react-router-dom';
// import React from 'react';
// // import logo from './logo.svg';
import './App.css';
import Pesquisa from './pesquisa';
import Carrinho from './Carrinho';
import ProductDetail from './ProductDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Pesquisa /> } />
      <Route path="/shopping-cart" element={ <Carrinho /> } />
      <Route path="/product/:productId" element={ <ProductDetail /> } />
    </Routes>
  );
}

export default App;
