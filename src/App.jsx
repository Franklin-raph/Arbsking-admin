import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/authentication/Register'
import Login from './pages/authentication/Login'
import Dashboard from './pages/layout/Dashboard'
import Sidenav from './components/sideNav'
import './App.css'

function App() {

  const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
  const [users, setUsers] = useState([])

  useEffect(() => {
        getAllUsers()
  },[])

  async function getAllUsers(){
    const response = await fetch("https://sportbetpredict.onrender.com/api/admin/fetch/all-users", {
      method:"POST",
      headers: {
        Authorization: `Bearer ${loggedInAdmin}`
      }
    })
    console.log(response)
    const data = await response.json()
    if(response.ok){
      setUsers(data.message)
      console.log(users)
    }
    console.log(data)
  }

  return (
    <>
      <BrowserRouter>
      <Sidenav users={users}/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard users={users}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
