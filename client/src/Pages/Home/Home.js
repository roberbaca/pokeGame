import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
//import Modal from '../Modal/Modal'
import '../../Styles/components/Home.css';
import '../../Styles/Global.css';

const Home = () => {
  return (
    <div>
        <Link to ="/game" >Play</Link> 
        <Link to ="/login" >LOGIN</Link> 
        <button>ranks</button>
    </div>
  )
}

export default Home