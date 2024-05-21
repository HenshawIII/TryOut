import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

const Login = ()=>{
    const [email,setMail] = useState("")
    const [password,setPass] = useState("")
    let navigate = useNavigate()
    axios.defaults.withCredentials = true
    const HandleSubmit =async(e) =>{
        e.preventDefault()
         await axios.post("http://localhost:3200/login",{ email,password})
        // .then(data=>data.json())
        .then(data=>{
          if(data.data.error){
            toast.error(data.data.error)
          }else{
            
          setMail("")
          setPass("")
          toast.success("Log in On succesful. Welcome!!")
          navigate("/contact")
          }
          console.log(data)})
          
    }


    return(
        <>
        <form className='m-4 flex flex-col items-start' onSubmit={HandleSubmit}>
        <label htmlFor="form2">Email</label>
      <input className='p-1 border-2 rounded-md border-solid w-1/5 mb-4'  value={email} type="email" onChange={(e)=>setMail(e.target.value)} id="form2" />
      <label htmlFor="form3">Password</label>
      <input className='p-1 border-2 rounded-md border-solid w-1/5 mb-4'  value={password} onChange={(e)=>setPass(e.target.value)} id="form3" type="text" />
      <button className='p-2 mt-3 border-emerald-400 bg-slate-400 hover:p-1 hover:rounded-xl  '>Submit</button>
    </form>
        </>
    )
}

export default Login