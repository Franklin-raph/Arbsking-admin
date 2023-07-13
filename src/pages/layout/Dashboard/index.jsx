import React, {useEffect, useState} from 'react'
import EmailUser from '../../../components/email'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
    const [users, setUsers] = useState([])
    const [searchUser, setSearchUser] = useState("")

    useEffect(() => {
        if(!loggedInAdmin){
            navigate("/")
        }
        if(loggedInAdmin){
            navigate('/dashboard')
            getAllUsers()
        }
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
      console.log(data)
      if(response.ok){
        setUsers(data.message)
        localStorage.setItem("users", JSON.stringify(data.message))
      }
    }

  return (
    <>
      <div className='container-fluid px-5'>
        <div className='searchUser'>
          <input type='search' onChange={e => setSearchUser(e.target.value.toLocaleLowerCase())} placeholder='Search user by email or username or id'/>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {users.length === 0 ? 
            <div className='loaderBg'>
              <i className="fa-solid fa-circle-notch fa-spin" id='loader'></i>
            </div>
          :
            <table className="table table-bordered table-responsive text-light">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Sub Status</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Balance Spent</th>
                </tr>
              </thead>
              <tbody>
              {users && users
                .filter(user => user.username
                .toLowerCase().includes(searchUser) || user.email
                .toLowerCase().includes(searchUser) || user.arbsKingId
                .toLocaleLowerCase().includes(searchUser))
                .map(user =>{
                  return(
                    <tr key={user.username} onClick={() => navigate('/userprofile/'+user._id)} style={{ cursor:"pointer" }}>
                      <td>{user.username}</td>
                    <td>{user.email}</td>
                    {new Date() > new Date(user.subExpiringDate) ? (
                      <td style={{ color:"#d20000" }}>Expired</td>
                    ) : new Date() < new Date(user.subExpiringDate) ? (
                      <td style={{ color:"#00d25b" }}>Active</td>
                    ) : (
                      <td>No Sub</td>
                    )}
                    <td>{Number(user.balance).toFixed(2)}</td>
                    <td>{Number(user.balanceSpent).toFixed(2)}</td>
                  </tr>
                )
                })}
              </tbody>
          </table>
        }
      </div>
        <div className='mobileUserInfo'>
        {users && users
        .filter(user => user.username
        .toLowerCase().includes(searchUser) || user.email
        .toLowerCase().includes(searchUser) || user.arbsKingId
        .toLocaleLowerCase().includes(searchUser))
        .map(user =>{
          return(
            <div className="userInfo" onClick={() => navigate('/userprofile/'+user._id)} style={{ cursor:"pointer" }}>
              <h5>{user.username}</h5>
                {new Date() > new Date(user.subExpiringDate) ? (
                <p style={{ color:"#d20000" }}>Expired</p>
              ) : new Date() < new Date(user.subExpiringDate) ? (
                <p style={{ color:"#00d25b" }}>Active</p>
              ) : (
                <p>No Sub</p>
              )}
            </div>
          )
        })}
        </div>
  </>
  )
}

export default Dashboard