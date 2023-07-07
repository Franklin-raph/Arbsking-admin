import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/authentication/Register'
import Login from './pages/authentication/Login'
import Dashboard from './pages/layout/Dashboard'
import Userprofile from './pages/layout/Userprofile'
import Sidenav from './components/sideNav'
import './App.css'

function App() {

  const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))

  return (
    <>
      <BrowserRouter>
      <Sidenav />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/userprofile/:id' element={<Userprofile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
