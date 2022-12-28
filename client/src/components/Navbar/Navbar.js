import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import Rank from '../../Pages/Rank/Rank'
import { FaTrophy, FaUserAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { MdStars } from 'react-icons/md';
import { RiCopperCoinLine } from 'react-icons/ri';
//import { MdVideogameAsset } from 'react-icons/md'
import '../../Styles/components/Navbar.css';
import '../../Styles/Global.css';

const Navbar = ({score, best, username, ranks}) => {

const [isOpen, setIsOpen] = useState(false);

const navigate = useNavigate(); 

const handleModal = () => {
  setIsOpen(true);
}

const logout = () => {
  // console.log("logout");
  // localStorage.removeItem('token');
  localStorage.removeItem('usermail');
  navigate("/home");     
}

  return (
    <nav>
      <div className='navbar'>
            <div className='navbar__sitelogo'>
                <Link to = "/">
                  <img src={require("../../assets/logo-white.png")} alt="logo" className='sitelogo'/>
                </Link>
            </div>       
            <div className='hud'>

                <div className='hud__scorewraper'> 
                  <div className='hud__scoretitle'>
                    <RiCopperCoinLine className='score__icon'/>
                    <p className='hud__title'>Score</p>
                  </div>
                  <div className='hud__pointswraper'>
                    <p className='hud__points'>{score}</p>
                  </div>
                </div>

                <div className='hud__scorewraper'> 
                <div className='hud__scoretitle'>
                  <MdStars className='score__icon'/>                 
                    <p className='hud__title'>Best</p>
                  </div>
                  <div className='hud__pointswraper'>
                    <p className='hud__points'>{best}</p>
                  </div>
                </div>
          
            </div>  
            <div className='hud__icons'>
              <div className='icon__wraper'>
                <FaUserAlt className='icon'/>
                <p className='icon__label'>{username}</p>
              </div>
              {/* <div className='icon__wraper'>
                <Link to ="/game" className = "menu__btn"><MdVideogameAsset className='icon'/> </Link>   
                <p className='icon__label'>New Game</p>
              </div> */}
              <div className='icon__wraper'>
                <FaTrophy className='icon' onClick={handleModal}/>                
                <p className='icon__label'>ranks</p>
              </div>
              <div className='icon__wraper'>
                <FiLogOut className='icon'  onClick={logout} />
                <p className='icon__label'>logout</p>
              </div>              
          
            </div>             
      </div>

       {/* Pop Ups (Modal) */}        
       <Rank open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="rank__datacontainer">
              { ranks?.map( (r, index) => 
                <div className="rank__data" key = {index}>
                  <p className="rank__order">{index + 1}</p>
                  <p className="rank__user">{r.user}</p>
                  <p className="rank__best">{r.score}</p>
                </div>
              ) }
        </div>
       </Rank>
    </nav>    
  )
}

export default Navbar