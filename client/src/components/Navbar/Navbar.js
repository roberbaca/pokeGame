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
                <div className='hud__col1'> 
                  <p className='hud__title'>Guesses</p>
                  <p className='hud__title'>Best in a row </p>
                </div>
                <div className='hud__col2'>                 
                  <p className='hud__data'>7</p>
                  <p className='hud__data'>7</p>
                </div>
            </div>            
      </div>
    </div>    
  )
}

export default Navbar