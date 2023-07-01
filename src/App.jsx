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
  const [users, setUsers] = useState([])
  const [numOfSubedUsers, setNumOfSubedUsers] = useState([])

  useEffect(() => {
        getAllUsers()
        getAllSubscribedUsers()
  },[])

  async function getAllUsers(){
    const response = await fetch("https://sportbetpredict.onrender.com/api/admin/fetch/all-users", {
      method:"POST",
      headers: {
        Authorization: `Bearer ${loggedInAdmin}`
      }
    })
    const data = await response.json()
    if(response.ok){
      console.log(data.message)
      setUsers(data.message)
    }
  }

  async function getAllSubscribedUsers(){
    const response = await fetch("https://sportbetpredict.onrender.com/api/admin/fetch/subscribed-users", {
      method:"POST",
      headers: {
        Authorization: `Bearer ${loggedInAdmin}`
      }
    })
    const data = await response.json()
    if(response.ok){
      console.log(data.message)
      setNumOfSubedUsers(data.message)
    }
  }

  return (
    <>
      <BrowserRouter>
      <Sidenav users={users} numOfSubedUsers={numOfSubedUsers}/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard users={users} />} />
          <Route path='/userprofile/:id' element={<Userprofile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
