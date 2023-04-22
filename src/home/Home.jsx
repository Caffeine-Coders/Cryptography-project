import React from 'react'
import { Sideb } from '../common/sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar';


export const Home = () => {
  return (
    <ProSidebarProvider>
    <div>
        <Sideb/>
    </div>
    </ProSidebarProvider>
  )
}
