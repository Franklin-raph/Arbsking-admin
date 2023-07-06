import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidenav = ({users, numOfSubedUsers, totalFunds, totalFundsInAllAddresses}) => {

  const navigate = useNavigate()

function logout(){
  localStorage.clear()
}

  const totalActiveUsers = users.filter(user => user.status === "activated").length;

  return (
    <div>
      <div className="d-flex justify-content-between p-3 mb-4" style={{ borderBottom:"1px solid grey" }}v>
        <h5 className='text-light' onClick={() => navigate("/dashboard")} style={{ cursor:"pointer" }}><i className="fa-solid fa-house"></i>Arbsking Admin</h5>
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
            <h6>${totalFunds && totalFunds.toFixed(2)}</h6>
            <p>Total Funds</p>
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
            <Link to="/dashboard">All Users</Link>
          </li>
          <li>
            <a href="/" onClick={logout}>Logout</a>
          </li>
        </div>
      </div>
    </div>
  )
}

export default Sidenav