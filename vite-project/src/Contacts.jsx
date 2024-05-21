import { createContext,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCon,UserContext } from "./UserContext"

const Contacts = ()=>{
const usercnt = useContext(UserCon)
// console.log(usercnt)
const navigate = useNavigate()
useEffect(()=>{
    if(!usercnt.user){
        // navigate("/")
    }
})

    return (
        <>
      {usercnt.user && <p>Contact {usercnt.user.email}</p>}
        </>
    )
}

export default Contacts