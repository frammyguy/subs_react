import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.sass';
import Header from './components/header/header';
import Browse from './components/browse/browse';
import Library from './components/library/library';
import Add from './components/library/add';
import Update from './components/library/update';
import Login from './components/login/login';
import Register from './components/login/register';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Browse/>} />
        <Route path="/library" element={<Library/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/update/:id" element={<Update/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);