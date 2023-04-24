import React, { useState } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, Sidebar, Search, ConversationList, ChatContainer, ConversationHeader, Avatar} from  "@chatscope/chat-ui-kit-react";
import { Convolist } from './Convolist';
import { Chatbox } from './chatbox';

export const Chat = () => {
    const [image, setImage] = useState(" ");
    const [name, setName] = useState();
    const [info, setInfo] = useState(" ");

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
            <Search placeholder="Search..." /> 
        <ConversationList>
           <div  onClick = {() => setter("https://i.scdn.co/image/ab67616d0000b2731cf092f7828a17c0790e2f00", "Anudeep", "LEVELS")}><Convolist image = "https://i.scdn.co/image/ab67616d0000b2731cf092f7828a17c0790e2f00" name = "Anudeep" lastsendername="Anudeep" info = "LEVELS"/></div>
            <Convolist image = "https://images.indianexpress.com/2019/11/hindustani-bhau-759.jpg" name = "forum" lastsendername="forum" info = "nikal L****"/>
        </ConversationList>
        </Sidebar>

        <Chatbox image ={image} name = {name} info ={info}/>
    </MainContainer>
    </div>
  )
}
