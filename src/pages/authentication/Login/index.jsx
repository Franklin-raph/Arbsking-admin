import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [adminID, setAdminID] = useState("")
    const [password, setPassword] = useState("")
    // const [adminID, setAdminID] = useState("ARBSK-6c02dA")
    // const [password, setPassword] = useState("123456789")
    const [loading, setLoading] = useState(false)
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

    async function adminLogin(e){
        setLoading(true)
        e.preventDefault()
        const resposnse = await fetch("https://sportbetpredict.onrender.com/api/admin/login", {
            method:"POST",
            headers: {
                'Content-type':"application/json"
            },
            body: JSON.stringify({adminID, password})
        })
        const data = await resposnse.json()
        console.log(data)
        if(resposnse){
            setLoading(false)
        }
        if(resposnse.ok){
            localStorage.setItem("admin", JSON.stringify(data.token))
            navigate("/dashboard")
        }
    }

  return (
    <div className='loginBg'>
        <form className='container' onSubmit={adminLogin}>
            <h3 className='text-center text-secondary mb-3'>Admin Login</h3>
            <div className="mb-3">
                <label className="form-label text-secondary">Admin ID</label>
                <input type="text" className="form-control" onChange={(e) => setAdminID(e.target.value)} value={adminID}/>
            </div>
            <div className="mb-3">
                <label className="form-label text-secondary">Password</label>
                <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className='w-50 mx-auto'>
                <button type="submit" className={loading? `disabled btn btn-success w-100` : `btn btn-success w-100` }>
                    {loading ? <i className="fa-solid fa-spinner fa-spin me-2"></i>:""}
                    Login
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login