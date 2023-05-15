import React from 'react'
import DashLogo from "../../assets/navbar/dash-logo.svg"
import reciever from "../../assets/navbar/reciever.svg"
import settings from "../../assets/navbar/settings.svg"
import altorLogo from "../../assets/navbar/altorLogo.svg"
import "./navbar.css"
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav>
        <div className='first-panel'>
        <div className='dash-logo' onClick={() => navigate('/')}>
            <img src={DashLogo} alt='dash-logo' />
            <p>Dashboard</p>
        </div>
        <div className='rcvr'><img src={reciever} alt='reciever' /></div>
        <div className='settings'><img src={settings} alt="settings" /></div>
        </div>
        <div className='user_info'>
            <div className='admin-info'>
            <p>Nirjan Munshi</p>
            <p>Admin</p>
            </div>
            <img src={altorLogo} alt="altor-logo" style={{maxWidth:'50px', padding:'5px'}}/>
        </div>
    </nav>
  )
}

export default Navbar