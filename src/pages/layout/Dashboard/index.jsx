import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const loggedInAdmin = localStorage.getItem('admin')
    useEffect(() => {
        if(!loggedInAdmin){
            navigate("/")
        }
        if(loggedInAdmin){
            navigate('/dashboard')
        }
    },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard