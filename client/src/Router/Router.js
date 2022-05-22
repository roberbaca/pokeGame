import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Game from '../Pages/Game/Game'
import Home from '../Pages/Home/Home'
import Auth from '../Pages/Auth/Auth'
import Rank from '../Pages/Rank/Rank'
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar/>                     
                <Routes>                
                    <Route path = "/" element = {<Home/>}></Route>                    
                    <Route path = "/game" element = {<Game/>}></Route>       
                    <Route path = "/home" element = {<Home/>}></Route>
                    <Route path = "/rank" element = {<Rank/>}></Route>
                    <Route path = "/login" element = {<Auth/>}></Route>
                </Routes>
                <Footer/>  
            </BrowserRouter>
        </div>
    )

}

export default Router