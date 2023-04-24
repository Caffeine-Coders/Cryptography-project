import React, { useState } from 'react'
import {ChatContainer, Avatar, ConversationHeader, MessageInput} from  "@chatscope/chat-ui-kit-react";
import { Message, MessageList, MessageSeparator, TypingIndicator } from '@chatscope/chat-ui-kit-react'

export const Chatbox = (props) => {
    const [messageInputValue, setMessageInputValue] = useState("");
    const{image, name, info} = props
  return (
    <ChatContainer>
    <ConversationHeader>
                  <ConversationHeader.Back />
                  <Avatar src={image} name={name}/>
                  <ConversationHeader.Content userName={name} info={info} />
    </ConversationHeader>

    <MessageList>
        <MessageSeparator content="Saturday, 30 November 2019" />
        <Message model={{
            message: "Eyyy",
            sentTime: "15 mins ago",
            sender: "Zoe",
            direction: "incoming",
            position: "single"
          }}>
          </Message>
    </MessageList>
    <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} />
    </ChatContainer>
  )
}
