import { Routes, Route } from 'react-router-dom';
// import React from 'react';
// // import logo from './logo.svg';
import './App.css';
import Pesquisa from './pesquisa';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Pesquisa /> } />
    </Routes>
  );
}

export default App;
