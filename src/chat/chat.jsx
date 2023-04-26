import React, { useEffect, useState } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, Sidebar, Search, ConversationList, ChatContainer, ConversationHeader, Avatar} from  "@chatscope/chat-ui-kit-react";
import { Convolist } from './Convolist';
import { Chatbox } from './chatbox';
import { collection, db ,getDocs} from '../auth/firebaseconfig';

export const Chat = ({currentuser}) => {
    const [image, setImage] = useState(" ");
    const [name, setName] = useState(" ");
    const [info, setInfo] = useState(" ");

    const [allusers, setallusers] = useState([])
    const [searchinput, setsearchinput] = useState("") 
    
    useEffect(()=>{

      const getallusers = async () =>{
        const usercollection = collection(db, 'users')
        const usersnapshot = await getDocs(usercollection)
        const list = usersnapshot.docs.filter((doc) => doc.data().email != currentuser?.email)
        setallusers(list)
       }
       getallusers()
       
    },[])

    // console.log(allusers)

    const searcheduser = allusers.filter((user) =>{
      if(searchinput)
      {
        if(user.data().fullname.toLowerCase().includes(searchinput.toLowerCase()))
        {
          return user
        }
      }
    } )

    function setter(image, name, info)
    {
        setImage(image)
        setName(name)
        setInfo(info)
    }
 

  return (
    <div style={{
        height: '810px',
        position: "relative"
      }}>

    <MainContainer responsive>   
        <Sidebar position="left" scrollable={true}>
            <Search placeholder="Search..." value={searchinput} onChange={e => setsearchinput(e)}/> 
        <ConversationList>
            {
            searcheduser.length > 0 ? 
              (searcheduser.map((item) =>{
              return(
                <div onClick={() => {setter(item.data().photoUrl, item.data().fullname, item.data().email)}}>
                <Convolist image = {item.data().photoUrl}  name = {item.data().fullname}  lastsendername="message" info = {item.data().email}/>
                </div>
              )}))
              :
              (
                <div onClick={() => {setter("https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-883x1000.jpg", "BOT", "bot@gmail.com")}}>
                  <Convolist image="https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-883x1000.jpg" name = "BOT" lastsendername= "BOT" info = "bot@gmail.com"/>
                </div>
              )
            }
        </ConversationList>
        </Sidebar>

        <Chatbox image ={image} name = {name} info ={info} currentuser = {currentuser} selectedemail = {info} selectedname = {name} selectedimage = {image}/>
    </MainContainer>
    </div>
  )
}
