import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmailUser from '../../../components/email'


const Userprofile = () => {
  const params = useParams()
  const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
  const [userDetail, setUserDetail] = useState({})
  const navigate = useNavigate()
  const [userTransactionDetail, setUserTransactionDetail] = useState({})
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  // const [userDetail, setUserDetail] = useState({})

  useEffect(() => {
    if(!loggedInAdmin){
      navigate("/")
  }
  if(loggedInAdmin){
      navigate('/userprofile/'+params.id)
  }
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
    <>
      {isEmailOpen && <EmailUser userEmail = {userDetail && userDetail.email} setIsEmailOpen={setIsEmailOpen}/>}
      <div className='user-details-container'>
        <div className="emailSendBtn">
          <p></p>
          <button onClick={() => setIsEmailOpen(!isEmailOpen)}>Send User Email</button>
        </div>
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
    </>
  )
}

export default Userprofile