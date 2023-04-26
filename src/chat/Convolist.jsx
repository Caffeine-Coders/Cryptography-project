import React from 'react'
import {Conversation, Avatar} from  "@chatscope/chat-ui-kit-react";

export const Convolist = (props) => {
    const{image, name, lastsendername, info} = props
  return (
    <div>
        <Conversation name={name} lastSenderName={lastsendername} info={info}>
            <Avatar src={image} status="available" />
        </Conversation>
    </div>
  )
}
