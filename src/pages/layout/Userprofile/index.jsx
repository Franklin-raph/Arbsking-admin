import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Userprofile = () => {
  const params = useParams()
  const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
  const [userDetail, setUserDetail] = useState({})
  const [userTransactionDetail, setUserTransactionDetail] = useState({})
  // const [userDetail, setUserDetail] = useState({})

  useEffect(() => {
    getAUsersDetails()
  },[])

  async function getAUsersDetails(){
    const response = await fetch("https://sportbetpredict.onrender.com/api/admin/fetch/one-user/"+params.id, {
      method:"GET",
      headers: {
        Authorization: `Bearer ${loggedInAdmin}`
      }
    })
    const data = await response.json()
    setUserDetail(data.userDetails)
    if(response.ok){
      console.log(data)
    }
  }

  return (
    <div className='user-details-container'>
      <div className="user-details">
        <div>
          <h6>Username</h6>
          <p>{userDetail && userDetail.username}</p>
        </div>
        <div>
          <h6>Email</h6>
          <p>{userDetail && userDetail.email}</p>
        </div>
      </div>

      <div className="user-details">
        <div>
          <h6>Referal Link</h6>
          <p>{userDetail && userDetail.referrralLink}</p>
        </div>
        <div>
          <h6>Status</h6>
          <p>{userDetail && userDetail.status}</p>
        </div>
      </div>
      <div className="user-details">
        <div>
          <h6>Sub Expiring Date</h6>
          <p>{userDetail && userDetail.subExpiringDate}</p>
        </div>
        <div>
          <h6>Sub Type</h6>
          <p>{userDetail && userDetail.subType}</p>
        </div>
      </div>
    </div>
  )
}

export default Userprofile