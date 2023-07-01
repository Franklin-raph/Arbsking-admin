import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Userprofile = () => {
  const params = useParams()
  const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
  const [userDetail, setUserDetail] = useState({})

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
    setUserDetail(data)
    if(response.ok){
      console.log(data)
    }
  }

  return (
    <div>
      <div className="user-details">
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Userprofile