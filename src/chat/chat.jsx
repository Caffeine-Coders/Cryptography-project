import React, { useEffect, useRef, useState } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, Sidebar, Search, ConversationList} from  "@chatscope/chat-ui-kit-react";
import { Convolist } from './Convolist';
import { collection, db ,getDocs} from '../auth/firebaseconfig';
import {ChatContainer, Avatar, ConversationHeader, MessageInput} from  "@chatscope/chat-ui-kit-react";
import { Message, MessageList, MessageSeparator, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import {orderBy, query, Timestamp } from 'firebase/firestore';
import { setDoc, addDoc, doc} from '../auth/firebaseconfig';
import { async } from '@firebase/util';
import { Decrypt, Encrypt, genkey } from '../encrypt/ECC';

function Dectemp(hexString)
{
  const uint8Array = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const string = new TextDecoder("utf-8").decode(uint8Array);
  return string
}

export const Chat = ({currentuser}) => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [info, setInfo] = useState("");

    const [allusers, setallusers] = useState([])
    const [searchinput, setsearchinput] = useState("") 
    const [selectedemail, setselectedemail] = useState("")
    const [selectedname, setselectedname] = useState("")
    const [selectedimage, setselectedimage] = useState("")
   
    const [friendslist, setfriendslist] = useState([]);

    const [messageInputValue, setMessageInputValue] = useState("");
    const [messageData, setMessageData] = useState([])

    const usercollection = collection(db, 'chats')
    const friendcollection = collection(db, 'friendslist')

    const firsttime = useRef(true)

    const [decrypt, setdecrypted] = useState("")
    
    const [ind, setind] = useState()
    //encryption-decryption stuff here
    
    const keys = genkey();
    const shared1 = keys.shared1;
    const shared2 = keys.shared2;
    

    useEffect(()=>{

      const getallusers = async () =>{
        const usercollection = collection(db, 'users')
        const usersnapshot = await getDocs(usercollection)
        const list = usersnapshot.docs.filter((doc) => doc.data().email != currentuser?.email)
        setallusers(list)
       }
       getallusers()

    },[searchinput])

    useEffect(() => {
      const getMessgeData = async () =>{
        const datacollect =  collection(db, 'chats')
        const docRef = doc(datacollect, selectedemail)
        const messageCollection = collection(docRef, 'messages');
        const qu = query(messageCollection, orderBy('timestamp', 'asc'));
        const usersnapshot = await getDocs(qu);

        const list =  usersnapshot.docs.map((doc) => doc.data())
        let newmessage = list.filter((message) => 
          message.senderemail === (currentuser.email || selectedemail) ||
          message.recievername === (currentuser.email || selectedemail)
        );
        console.log(newmessage)
        setMessageData(newmessage)

      }
      getMessgeData()
    }, [selectedemail, messageInputValue, messageData])

    useEffect(()=>{
      if(firsttime.current)
      {
        const getFriendslist = async () => 
        {
          const frienddoc = doc(friendcollection, currentuser.email)
          const listCollection = collection(frienddoc, 'list');
          const usersnapshot = await getDocs(listCollection)
          const list = usersnapshot.docs.map((doc) => doc.data())
          setfriendslist(list)
        }
        getFriendslist()
       
        firsttime.current = false
      }
     
    },[])

    // console.log(allusers)

    const searcheduser = allusers.filter((user) =>{
      if(searchinput)
      {
        let str = user.data()?.fullname?.toLowerCase();
        let searchInputLower = searchinput?.toLowerCase(); 
        if(str && str.includes(searchInputLower))
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
        setselectedemail(info)
        setselectedname(name)
        setselectedimage(image)
    }
 
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
        
        addDoc(messageCollection, {
          key:shared1.toString(16),
          text:Encrypt(messageInputValue, shared1.toString(16)),
          senderemail:currentuser.email,
          recievername: selectedemail,
          timestamp: Timestamp.now(),
          direction: "incoming"
        })

        //reciever
        const docRef1 = doc(usercollection, selectedemail)
        const messageCollection1 = collection(docRef1, 'messages');

        addDoc(messageCollection1, {
          key:shared2.toString(16),
          text:Encrypt(messageInputValue, shared1.toString(16)),
          senderemail:currentuser.email,
          recievername: selectedemail,
          timestamp: Timestamp.now(),
          direction: "outgoing"
        })


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
    <div style={{
        height: '835px',
        position: "relative"
      }}>

    <MainContainer responsive>   
        <Sidebar position="left" scrollable={true}>
            <Search placeholder="Search..." value={searchinput} onChange={(e) => {setsearchinput(e)}}/> 
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
              (friendslist.map((item) =>{
              return(
                <div onClick={() => {setter(item.photoUrl, item.fullname, item.email)}}>
                 <Convolist image = {item.photoUrl}  name = {item.fullname} info = {item.email}/>
                </div>
              )}))
            }
        </ConversationList>
        </Sidebar>

    <ChatContainer>
    <ConversationHeader>
      <ConversationHeader.Back />
        <Avatar src={image} name={name}/>
      <ConversationHeader.Content userName={name} info={info} />
     
    </ConversationHeader>

    <MessageList>
        <MessageSeparator content="CHAT" />
        {
          messageData.map((message, index) =>
          <div onClick={()=> {setind(index)}}>
          {
            (ind === index)?
            (
              <Message model={{
                message: decrypt?decrypt:message.text,
                sentTime: message.timestamp,
                sender: message.senderemail,
                direction: message.direction,
                position: "single"
                }} onDoubleClick={() => {setdecrypted(Decrypt(message.text,message.key))}}>

             <Avatar src={message.direction == 'incoming'? selectedimage:currentuser.photoUrl} name={message.senderemail} />
            </Message> 
            )
            :
            (
              <Message model={{
                message: message.text,
                sentTime: message.timestamp,
                sender: message.senderemail,
                direction: message.direction,
                position: "single"
                }} onMouseOver={()=>{setdecrypted("")}} >

             <Avatar src={message.direction == 'incoming'? selectedimage:currentuser.photoUrl} name={message.senderemail} />
            </Message> 
            )
          }
          </div>
          )
        } 
    </MessageList>

    <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend = {send} attachButton = {false}/>
    </ChatContainer>
  
    </MainContainer>
    </div>
  )
}
