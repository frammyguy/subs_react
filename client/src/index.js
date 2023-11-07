import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/header/header';
import Browse from './components/browse/browse';
import Library from './components/library/library';
import ModifyLibrary from './components/library/ModifyLibrary';
import About from './components/about/about';
import Login from './components/login/login';
import Logout from './components/login/logout';
import Register from './components/login/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/library" element={<Library />} />
        <Route path="/add" element={<ModifyLibrary formAction='add' />} />
        <Route path="/update/:id" element={<ModifyLibrary formAction='update' />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);