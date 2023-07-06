import React, {useEffect, useState} from 'react'
import EmailUser from '../../../components/email'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({users}) => {
    const navigate = useNavigate()
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
    const [searchUser, setSearchUser] = useState("")

    useEffect(() => {
        if(!loggedInAdmin){
            navigate("/")
        }
        if(loggedInAdmin){
            navigate('/dashboard')
        }
    },[])

  return (
    <>
      <div className='container-fluid px-5'>
        <div className='searchUser'>
          <input type='search' onChange={e => setSearchUser(e.target.value.toLocaleLowerCase())} placeholder='Search user by email or username or id'/>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        {users.length === 0 ? 
            <i className="fa-solid fa-circle-notch fa-spin" id='loader'></i>
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
                    {/* {new Date() > new Date(user.subExpiringDate) ? <td style={{ backgroundColor:"#d20000" }}>Expired</td> : new Date() < new Date(user.subExpiringDate) ? <td style={{ backgroundColor:"#00d25b" }}>Active</td>} */}
                    <td>{Number(user.balance).toFixed(2)}</td>
                    <td>{Number(user.balanceSpent).toFixed(2)}</td>
                  </tr>
                )
                })}
              </tbody>
          </table>
        }
      </div>
  </>
  )
}

export default Dashboard