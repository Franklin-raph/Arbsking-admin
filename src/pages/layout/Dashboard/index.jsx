import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div className='container-fluid px-5'>
      {users.length === 0 ? 
          <i className="fa-solid fa-circle-notch fa-spin" id='loader'></i>
        : 
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
              <tr key={user.username} onClick={() => navigate('/userprofile/'+user._id)}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{Number(user.balance).toFixed(2)}</td>
                <td>{Number(user.balanceSpent).toFixed(2)}</td>
              </tr>
            ))}
            </tbody>
        </table>
      }
    </div>
  )
}

export default Dashboard