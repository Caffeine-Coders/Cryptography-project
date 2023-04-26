import React, { useState, useEffect } from 'react'
import {ChatContainer, Avatar, ConversationHeader, MessageInput} from  "@chatscope/chat-ui-kit-react";
import { Message, MessageList, MessageSeparator, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import {orderBy, query, Timestamp } from 'firebase/firestore';
import { setDoc, addDoc, collection, db, doc, getDocs} from '../auth/firebaseconfig';

export const Chatbox = (props) => {
    const [messageInputValue, setMessageInputValue] = useState("");
    const{image, name, info, currentuser, selectedemail, selectedname, selectedimage} = props
    const [messageData, setMessageData] = useState([])

    const usercollection = collection(db, 'chats')
    const friendcollection = collection(db, 'friendslist')

    useEffect(() => 
    {
      const getMessgeData = async ()=>{
        const datacollect =  collection(db, 'chats')
        const docRef = doc(datacollect, selectedemail)
        const messageCollection = collection(docRef, 'messages');
        const qu = query(messageCollection, orderBy('timestamp', 'asc'));
        const usersnapshot = await getDocs(qu);

        const list = usersnapshot.docs.map((doc) => doc.data())
        let newmessage = list.filter((message) => 
          message.senderemail === (currentuser.email || selectedemail) ||
          message.recievername === (currentuser.email || selectedemail)
        );
        // console.log(newmessage)
        setMessageData(newmessage)

      }
      getMessgeData()
    }, [])

    // console.log("messagedata >>>>> ",messageData)

    const send = (e) =>
    {
      if(selectedemail !== " ")
      {
        let payload = {
          text:messageInputValue,
          senderemail:currentuser.email,
          recievername: selectedemail,
          timestamp: Timestamp.now()
        }
        // console.log(payload)

        //sender
        const docRef = doc(usercollection, currentuser.email)
        const messageCollection = collection(docRef, 'messages');
        
        addDoc(
          messageCollection, 
          {
            text:messageInputValue,
            senderemail:currentuser.email,
            recievername: selectedemail,
            timestamp: Timestamp.now()
          }
          )

        //reciever
        const docRef1 = doc(usercollection, selectedemail)
        const messageCollection1 = collection(docRef1, 'messages');

        addDoc(messageCollection1, {text:messageInputValue,
          senderemail:currentuser.email,
          recievername: selectedemail,
          timestamp: Timestamp.now()})


        //friendslist :
        const frienddoc = doc(friendcollection, currentuser.email)
        const listCollection = collection(frienddoc, 'list');
        const listdoc = doc(listCollection, selectedemail)
        
        setDoc(listdoc, {
          email: selectedemail,
          fullname: selectedname,
          photoUrl: selectedimage,
          lastMessage: messageInputValue,
        })

          //friendslist :
          const frienddoc1 = doc(friendcollection, selectedemail)
          const listCollection1 = collection(frienddoc1, 'list');
          const listdoc1 = doc(listCollection1,currentuser.email)
          
          setDoc(listdoc1, {
            email: currentuser.email,
            fullname: currentuser.fullname,
            photoUrl: currentuser.photoUrl,
            lastMessage: messageInputValue,
          })

          setMessageInputValue("");
      }

    }


  return (
    <ChatContainer>
    <ConversationHeader>
                  <ConversationHeader.Back />
                  <Avatar src={image} name={name}/>
                  <ConversationHeader.Content userName={name} info={info} />
    </ConversationHeader>

    <MessageList>
        <MessageSeparator content="CHAT" />
        {
          messageData.map((message) =>
            <Message model={{
            message: message.text,
            sentTime: message.timestamp,
            sender: message.senderemail,
            direction: "outgoing",
            position: "single"
             }}>
            </Message>
          )
        } 
    </MessageList>

    <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend = {send} attachButton = {false}/>
    </ChatContainer>
  )
}
