import React from 'react';
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Contacts from './Contacts.jsx';
import {Toaster} from "react-hot-toast"
import Login from "./Login.jsx"
import { UserCon ,UserContext } from './UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserContext>
  
  <nav>
    <ul className='flex flex-row p-2 items-center justify-end'>
      <li><NavLink to="/" className={({isActive})=>isActive? "text-yellow-400 p-2" : null}>Home</NavLink></li>
      <li><NavLink to={"/login"}>Login</NavLink></li>
      <li><NavLink to="/contact" className={({isActive})=>isActive? "text-yellow-500 p-2" : null}>Contact</NavLink></li>
      <li><NavLink>Services</NavLink></li>

    
    </ul>
  </nav>
  
  
  <React.StrictMode>
    
    <Toaster position='top-right'toastOptions={{duration:3000}} />
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/contact' element={<Contacts/>}/>
      <Route path ="/login" element={<Login/>}/>
    </Routes>
  
    
  </React.StrictMode>
  </UserContext>
  </BrowserRouter>
)
