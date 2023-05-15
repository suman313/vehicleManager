import React, { useState } from 'react'
// import uphill from "../../assets/eventCards/uphill.svg"
import './uphill.css'

function Uphill({icon, cardText, show, setShowEventModal, setEventType}) {

  const handleShow = () => {
    setEventType(cardText);
    setShowEventModal(true);
  }

  let iconHeight = 'auto';
  if(cardText == 'Walking') {
    iconHeight = '37px'
  }

  return (
    <div class="uphil-riding" onClick={handleShow}>
    <img class="uphill-icon" alt="" src={icon} style={{height: iconHeight}}/>

    <div class="uphil-riding-txt">{cardText}</div>
  </div>
  )
}

export default Uphill