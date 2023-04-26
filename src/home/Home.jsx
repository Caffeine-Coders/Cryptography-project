import {React, useState, useRef} from 'react'
import { Sideb } from '../common/sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Chat } from '../chat/chat';

export const Home = ({currentuser, signout}) => {
  console.log(currentuser.photoUrl)
  return (
    <ProSidebarProvider>
    <div className='sidebar'>
        <Sideb currentuser = {currentuser} signout = {signout}/>
    </div>
    <div className='chat'>
      <Chat currentuser = {currentuser}/>
    </div>
    </ProSidebarProvider>
  )
}
