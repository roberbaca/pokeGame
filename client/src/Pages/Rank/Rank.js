import React, { useEffect, useState } from "react";
import ReactDom from 'react-dom'
import { IoIosCloseCircle } from "react-icons/io";
import "../../Styles/components/Rank.css";
import "../../Styles/Global.css";

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Rank({ open, children, onClose }) {
  
  if (!open) return null

  return ReactDom.createPortal(
    <>
 
 <div style={OVERLAY_STYLES} />
    <div className="rank__section">
      <div className="rank__table">
        <div className="rank__header">
          <img className="badge" src={require('../../assets/badge.png')} alt="badge" />
          <h1 className="rank__title">Hall of Fame</h1>
          <IoIosCloseCircle className="closebtn" onClick={onClose}/>
        </div>
        <div className="rank__subtitle">
          <p className="rank__order">#</p>
          <p className="rank__user">Username</p>
          <p className="rank__best">Best Score</p>
        </div>
        <div className='rank__datacontainer'>
            {children}
        </div> 
      </div>
    </div>      
   
  </>,
  document.getElementById('portal')
  )
}
