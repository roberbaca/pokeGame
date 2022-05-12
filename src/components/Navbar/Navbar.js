import React from 'react'
import '../../Styles/components/Navbar.css';
import '../../Styles/Global.css';

const Navbar = () => {

  return (
    <div>
      <div className='navbar'>
            <div className='navbar__sitelogo'>
                <img src={require("../../assets/logo-white.png")} alt="logo" className='sitelogo'/>
            </div> 
            <div className='hud'>
                <div className='hud__category'>Guesses 
                  <p className='hud__data'>7</p>
                </div>
                <div className='hud__category'>Best in a row 
                  <p className='hud__data'>7</p>
                </div>
            </div>            
      </div>
    </div>    
  )
}

export default Navbar