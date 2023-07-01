import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidenav = ({users, numOfSubedUsers}) => {

function logout(){
  localStorage.clear()
}

  const totalActiveUsers = users.filter(user => user.status === "activated").length;

  return (
    <div>
      <div className="d-flex justify-content-between p-3 mb-4" style={{ borderBottom:"1px solid grey" }}v>
        <h4 className='text-light'>Arbsking Admin</h4>
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div className='stats'>
        <div className="totalUsers">
          <div>
            <h6>{users && users.length}</h6>
            <p>Total Users</p>
          </div>
          <i className="fa-solid fa-users"></i>
        </div>
        <div className="totalActiveUsers">
          <div>
            <h6>{users && totalActiveUsers}</h6>
            <p>Activated Users</p>
          </div>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="totalUsers">
          <div>
            <h6>{numOfSubedUsers && numOfSubedUsers.length}</h6>
            <p>Subscribed Users</p>
          </div>
          <i className="fa-solid fa-user-check"></i>
        </div>
        <div className="totalUsers">
          <div>
            <h6>{users.length - numOfSubedUsers.length}</h6>
            <p>Un-Sub. Users</p>
          </div>
          <i className="fa-solid fa-users-slash"></i>
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