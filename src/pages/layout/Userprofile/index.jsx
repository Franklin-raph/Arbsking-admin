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
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    const response = await fetch("https://sportbetpredict.onrender.com/api/admin/fetch/one-user/"+params.id, {
      method:"GET",
      headers: {
        Authorization: `Bearer ${loggedInAdmin}`
      }
    })
    if(response) setLoading(false)
    const data = await response.json()
    setUserDetail(data.userDetails)
    if(response.ok){
      console.log(data)
    }
  }

  return (
    <>
      {isEmailOpen && <EmailUser userEmail = {userDetail && userDetail.email} setIsEmailOpen={setIsEmailOpen}/>}
      {loading ?
        <div className='user-detail-loader'>
          <i className='fa-solid fa-spinner fa-spin' style={{ cursor:"pointer" }}></i>
          <p>Fetching user details</p>
        </div>
        : 
        <div className='user-details-container'>
          <div className="emailSendBtn">
          <p></p>
          <button onClick={() => setIsEmailOpen(!isEmailOpen)}>Send User Email</button>
        </div>
        <div className="user-details">
          <h4>User Profile</h4>
          <div className='user-info'>
            <div>
              <h6>First Name</h6>
              <p>{userDetail && userDetail.firstname}</p>
            </div>
            <div>
              <h6>Last Name</h6>
              <p>{userDetail && userDetail.lastname}</p>
            </div>
            <div>
              <h6>Username</h6>
              <p>{userDetail && userDetail.username}</p>
            </div>
            <div>
              <h6>Email</h6>
              <p>{userDetail && userDetail.email}</p>
            </div>
          </div>
        </div>

        <div className="user-details">
          <h4>User Balance Details</h4>
          <div className='user-info'>
            <div>
              <h6>Balance</h6>
              <p>{userDetail && userDetail.balance}</p>
            </div>
            <div>
              <h6>Balance Spent</h6>
              <p>{userDetail && userDetail.balanceSpent}</p>
            </div>
          </div>
        </div>

        <div className="user-details">
          <h4>User Address Details</h4>
          <div className='user-info'>
            <div className='me-5'>
              <h6>Payment Address</h6>
              <p>{userDetail && userDetail.paymentAddress}</p>
            </div>
            <div>
              <h6>Withdrawal Address</h6>
              <p>{userDetail && userDetail.withdrawalAddress}</p>
            </div>
          </div>
        </div>

        <div className="user-details">
          <h4>User Referral Details</h4>
          <div className='user-info'>
            <div className='me-5'>
              <h6>Referral Agent</h6>
              <p>{userDetail && userDetail.referralAgent.toString()}</p>
            </div>
            <div>
              <h6>Referred By</h6>
              <p>{userDetail && userDetail.referredBy}</p>
            </div>
          </div>
          <div>
            <h6>Referal Link</h6>
            <p>{userDetail && userDetail.referrralLink}</p>
          </div>
        </div>

        <div className="user-details">
          <h4>User Subscription Status</h4>
            <div className='user-info'>
              <div className='me-5'>
                <h6>Sub Expiring Date</h6>
                <p>{userDetail && userDetail.subExpiringDate}</p>
              </div>
              <div>
                <h6>Sub Type</h6>
                <p>{userDetail && userDetail.subType}</p>
              </div>
          </div>
        </div>
      </div>
      }
      
    </>
  )
}

export default Userprofile