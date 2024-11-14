// src/routers/AppRouter.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';

// Lazy load each page component
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

function AppRouter() {
    useEffect(()=>{
        console.log('helo')
    })
  return (
    <BrowserRouter>  
        <NavBar />    
      <Suspense fallback={<div>Loading...</div>}>  {/* Show a loader while components load */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
