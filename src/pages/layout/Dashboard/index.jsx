import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = ({users}) => {
    const navigate = useNavigate()
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
    useEffect(() => {
        if(!loggedInAdmin){
            navigate("/")
        }
        if(loggedInAdmin){
            navigate('/dashboard')
        }
    },[])

    // async function getAllUsers(){
    //   // console.log(loggedInAdmin)
    //   const response = await fetch("https://sportbetpredict.onrender.com/api/admin/fetch/all-users", {
    //     method:"POST",
    //     headers: {
    //       Authorization: `Bearer ${loggedInAdmin}`
    //     }
    //   })
    //   console.log(response)
    //   const data = await response.json()
    //   if(response.ok){
    //     setUsers(data.message)
    //     console.log(users)
    //   }
    //   console.log(data)
    // }


  return (
    <div className='container-fluid px-5'>
      
      <table className="table table-bordered table-responsive text-light">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Balance</th>
            <th scope="col">Balance Spent</th>
          </tr>
        </thead>
        <tbody>
        {users && users.map(user => (
          <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.status}</td>
            <td>{Number(user.balance).toFixed(2)}</td>
            <td>{Number(user.balanceSpent).toFixed(2)}</td>
          </tr>
        ))}
        </tbody>
        {/* <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody> */}
      </table>
    </div>
  )
}

export default Dashboard