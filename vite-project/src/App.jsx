import { useState , useEffect, useRef} from 'react'
import {useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios"
// import './App.css'

function App() {
  const [count, setCount] = useState(true);
  const [name,setName] = useState("")
  const [email,setMail] = useState("")
  const [password,setPass] = useState("")
 
  // const [err,setErr] =useState(null)

  axios.defaults.withCredentials=true

  const navigate = useNavigate()
  const inputRef = useRef()
  
  useEffect(()=>{
    inputRef.current.focus()

  },[])

const HandleSubmit =async(e) =>{
    e.preventDefault()
    // console.log(JSON.stringify({name,email,password}))
     await axios.post("http://localhost:3200/register",{name,email,password})
    
    .then(data=>{
      if(data.data.error){
        // setErr(data.error)
        toast.error(data.data.error)
      }else{
        // setErr(null)
        
        setName("")
      setMail("")
      setPass("")
      toast.success("Sign On succesful. Welcome!!")
      navigate("/contact")
      }
      console.log(data)})
      
}

  return (
    <>
    <div className="m-4 text-center text-2xl" >
    Sign in
    </div>
    <form className='m-4 flex flex-col items-start' onSubmit={HandleSubmit}>
      <label htmlFor="form1">Name</label>
      <input className='p-1 border-2 rounded-md border-solid w-1/5 mb-4' ref={inputRef} value={name} onChange={(e)=>setName(e.target.value)} id='form1' type="text" />
      <label htmlFor="form2">Email</label>
      <input className='p-1 border-2 rounded-md border-solid w-1/5 mb-4'  value={email} type="email" onChange={(e)=>setMail(e.target.value)} id="form2" />
      <label htmlFor="form3">Password</label>
      <input className='p-1 border-2 rounded-md border-solid w-1/5 mb-4'  value={password} onChange={(e)=>setPass(e.target.value)} id="form3" type="text" />
      <button className='p-2 mt-3 border-emerald-400 bg-slate-400 hover:p-1 hover:rounded-xl  '>Submit</button>
    </form>
    
    </>
  )
}

export default App
