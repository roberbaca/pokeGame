import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PATHS } from './Paths'
import React from 'react';
import useToken from '../utils/useToken';

const Router = () => {

    // custom hook para traer el token del local storage
    const { token, setToken } = useToken();

    return (
        <div>
            <BrowserRouter>            
                <Routes>    
                { token ? PATHS.private.map( (r,index) => <Route {...r} key = {index}/>) : PATHS.noLoggedIn.map( (r,ix) => <Route {...r} key = {ix}/>)}                     
                </Routes>           
            </BrowserRouter>             
        </div>
    )

}

export default Router