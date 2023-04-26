import React from 'react'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom'
import {db,doc, collection, setDoc, auth, googleprovider, signInWithPopup} from './firebaseconfig'

export const Login = ({setuser}) => {
  const navigate = useNavigate();
  const collectionref = collection(db, 'users')

  const googlelogin = () => 
  {
   signInWithPopup(auth, googleprovider)
    .then((result) => {
      const newuser = {
        fullname: result.user.displayName,
        email:result.user.email,
        photoUrl:result.user.photoURL,
      }
      console.log(result.user.photoURL)
      localStorage.setItem('user',JSON.stringify(newuser))
      navigate("/")
      setuser(newuser)
      const docRef = doc(collectionref, result.user.email);

      setDoc(docRef, newuser).then(() => {console.log("added")})
      .catch((err)=> {console.log(err)})

    }).catch((err) => {
      
    });

  }

  return (
    <div>
        <GoogleButton
          onClick={googlelogin}
        />
    </div>
  )
}
