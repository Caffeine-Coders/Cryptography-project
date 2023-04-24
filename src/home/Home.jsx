import {React, useState, useRef} from 'react'
import { Sideb } from '../common/sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Chat } from '../chat/chat';

export const Home = () => {
  return (
    <ProSidebarProvider>
    <div className='sidebar'>
        <Sideb/>
    </div>
    <div className='chat'>
      <Chat />
    </div>
    </ProSidebarProvider>
  )
}
