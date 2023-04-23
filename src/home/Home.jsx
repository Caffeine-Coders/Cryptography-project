import React from 'react'
import { Sideb } from '../common/sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Searchbar } from '../common/searchbar';
import { Chatlist } from '../chatlist/chatlist';
import { Chat } from '../chat/chat';


export const Home = () => {
  return (
    <ProSidebarProvider>
    <div className='sidebar'>
        <Sideb/>
    </div>
    <div className='home_holder'>
        <div className='chatlist'>
            <Searchbar/>
            <Chatlist/>
        </div>
        <div className='chat'>
          <Chat/>
        </div>
    </div>
   
    </ProSidebarProvider>
  )
}
