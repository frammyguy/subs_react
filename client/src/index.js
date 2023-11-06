import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/header/header';
import Browse from './components/browse/browse';
import Library from './components/library/library';
import ModifyLibrary from './components/library/ModifyLibrary';
import Login from './components/login/login';
import Register from './components/login/register';
import About from './components/about/about';
import User from './components/login/user.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/library" element={user ? <Library /> : <Navigate to="/login" />} />
        <Route path="/add" element={user ? <ModifyLibrary formAction='add' /> : <Navigate to="/login" />} />
        <Route path="/update/:id" element={user ? <ModifyLibrary formAction='update' /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);