import { useState,useEffect ,createContext ,useLayoutEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"

const UserCon = createContext()

const UserContext = ({children}) =>{
    const [user,setUser] = useState(null)
    const location = useLocation()
    axios.defaults.withCredentials = true
useEffect(()=>{
    
        axios.get("http://localhost:3200/profile")
        // .then(data=>data.json())
        .then((data)=>{
            setUser(data.data)
             })
             .catch(e=>console.log(e))
    // console.log(location.pathname)
},[location.pathname])

    return(
        <UserCon.Provider value={{user,setUser}}>
            {children}
        </UserCon.Provider>
    )
}

export {UserCon, UserContext}