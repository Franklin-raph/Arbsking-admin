import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidenav = () => {

  const [users, setUsers] = useState([])
  const [numOfSubedUsers, setNumOfSubedUsers] = useState([])
  const [totalFunds, setTotalFunds] = useState("")
  const [totalFundsInAllAddresses, setTotalFundsInAllAddresses] = useState("")
  const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))

  const navigate = useNavigate()

  useEffect(() => {
    if(!loggedInAdmin){
      navigate("/")
  }
  if(loggedInAdmin){
    navigate("/dashboard")
    getAllUsers()
    getAllSubscribedUsers()
    getTotalFundsMade()
  }
    // getTotalFundsInAllAddresses()
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
      localStorage.setItem("users", JSON.stringify(data.message))
    }
    if(data.message === "You must be logged in to perform that action!") {
      navigate("/")
      localStorage.clear()
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
      // console.log(data.message)
      setNumOfSubedUsers(data.message)
    }
    if(data.message === "You must be logged in to perform that action!") {
      navigate("/")
      localStorage.clear()
    }
  }

  async function getTotalFundsMade(){
    const response = await fetch("https://sportbetpredict.onrender.com/api/admin/fetch-all/funds-made", {
      method:"GET",
      headers: {
        Authorization: `Bearer ${loggedInAdmin}`
      }
    })
    const data = await response.json()
    console.log(data)
    if(data.message === "You must be logged in to perform that action!") {
      navigate("/")
      localStorage.clear()
    }
    setTotalFunds(data.message)
  }

  async function getTotalFundsInAllAddresses(){
    const response = await fetch("https://sportbetpredict.onrender.com/api/admin/fetch/all-users/address-balance", {
      method:"GET",
      headers: {
        Authorization: `Bearer ${loggedInAdmin}`
      }
    })
    const data = await response.json()
    console.log(data)
    setTotalFundsInAllAddresses(data.message)
  }

function logout(){
  localStorage.clear()
}


  return (
    <div>
      <div className="d-flex justify-content-between p-3 mb-4" style={{ borderBottom:"1px solid grey" }}v>
        <h5 className='text-light' onClick={() => navigate("/dashboard")} style={{ cursor:"pointer" }}><i className="fa-solid fa-house" style={{ marginRight:"10px" }}></i>Arbsking Admin</h5>
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className='stats'>
        <div className="totalUsers">
          <div>
            <h6>{users && users.length - 4}</h6>
            <p>Total Users</p>
          </div>
          <i className="fa-solid fa-users"></i>
        </div>
        <div className="totalUsers">
          <div>
            <h6>{numOfSubedUsers && numOfSubedUsers - 4}</h6>
            <p>Subscribed Users</p>
          </div>
          <i className="fa-solid fa-user-check"></i>
        </div>
        <div className="totalUsers">
          <div>
            <h6>${totalFunds && totalFunds}</h6>
            <p className='d-flex align-items-center gap-2' style={{ fontSize:"12px" }}>Total Funds <span style={{ fontSize:"10px" }}>#{totalFunds && totalFunds*769.50}</span> </p>
          </div>
          <i className="fa-solid fa-money-check-dollar"></i>
        </div>
        <div className="totalUsers">
          <div>
            <h6>${0}</h6>
            <p>Total Revenue</p>
          </div>
          <i className="fa-solid fa-money-bill-trend-up"></i>
        </div>
      </div>

      <div className="stats2">
      <div className="totalUsers">
          <div>
            <h6>${totalFundsInAllAddresses && totalFundsInAllAddresses}</h6>
            <p>Total Funds in all Addresses</p>
          </div>
          <i className="fa-solid fa-money-bill-trend-up"></i>
        </div>
        <div className="totalUsers">
          <div>
            <h6>${0}</h6>
            <p>Total Expenses</p>
          </div>
          <i className="fa-solid fa-money-bill-trend-up"></i>
        </div>
      </div>

      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-dark" id="offcanvasWithBothOptionsLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <li>
            <Link to="/dashboard" className='text-dark'>All Users</Link>
          </li>
          <li className='text-dark' style={{ cursor:"pointer" }}>
            <p>Export All User Data</p>
          </li>
          <li>
            <a href="/" onClick={logout} className='text-dark'>Logout</a>
          </li>
        </div>
      </div>
    </div>
  )
}

export default Sidenav