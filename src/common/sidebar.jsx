import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses} from 'react-pro-sidebar';
import {BsFillHouseLockFill,BsSignal, BsQuestionCircle } from "react-icons/bs";

export const Sideb = () => {
  return (
<div style={{ display: 'flex', height: '100%', minHeight: '1000px'}}>
  <Sidebar image="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b9a21791534383.5e341720a5140.jpg" >
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
           <div style={{ flex: 1, marginBottom: '32px' }}>

          </div>
    </div>
  </Sidebar>
</div>
  )
}
