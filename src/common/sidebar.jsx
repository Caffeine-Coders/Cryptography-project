import {React} from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {BsHouse, BsToggles, BsQuestionCircle, BsSend, BsFingerprint,BsFillPersonFill} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.css';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

export const Sideb = ({currentuser, signout}) => {
  let navigate = useNavigate()

  return (
<div  style={{ display: 'flex', height: '100%', minHeight: '1000px', overflowY:'hidden'}}>
  <Sidebar defaultCollapsed backgroundColor='#000000'>
    <Menu>
    <MenuItem disabled label="LOGO" icon={<BsSend style={{ color: 'grey', width:'50px', height:'35px'}}/>} ></MenuItem>
    <MenuItem disabled style={{fontSize: '8px'}}>SAFESEND</MenuItem>
    </Menu>

    <div style={{ flex: 1, marginBottom: '100px'}}>

    </div>

    <Menu>
      <MenuItem  label="HOME" icon={<BsHouse style={{ color: 'grey', width:'40px', height:'20px'}}  />} onClick = {()=> {navigate("/")}}></MenuItem>
      <MenuItem  label="Info" icon={<BsFingerprint style={{ color: 'grey', width:'40px', height:'20px'}}  />}> </MenuItem>
      <MenuItem  label="Info" icon={<BsQuestionCircle style={{ color: 'grey', width:'40px', height:'20px'}}  />}  > </MenuItem>
    </Menu>

    <div style={{ flex: 1, marginBottom: '410px'}}>

    </div>

    <Menu>
      <MenuItem  label="HOME" icon={<img src= {currentuser?.photoUrl} width='40px' />} onClick = {signout}></MenuItem>
      
    </Menu>
  </Sidebar>
</div>
  )
}
