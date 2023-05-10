import React, { useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { auth } from '../auth/firebaseconfig';
import { Login } from '../auth/login';
import { Aes } from '../encrypt/aes';
import { ECC, Encrypt } from '../encrypt/ECC';
import { Home } from '../home/Home';

export default function Path() {
  const[user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const signout =()=>
  {
    auth.signOut().then(()=>{
      setUser(null)
      localStorage.removeItem('user')
    }).catch((err)=> alert(err.message))
   
  }


  return (
    <BrowserRouter>
       {user ? 
       (
        <Routes>
          <Route path="/" element={<Home currentuser = {user} signout = {signout}/>}/>
          <Route path="/AEScheck" element={<Aes/>}/>
        </Routes>
      )
      :
      <Login setuser = {setUser}/>

        }
    </BrowserRouter>
  )
}
