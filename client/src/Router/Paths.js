import Game from '../Pages/Game/Game'
import Home from '../Pages/Home/Home'

export const PATHS = {
    
    // rutas que se puede acceder solo SI el usuario esta logueado
    private: [
        {
            path: '/game',            
            element: <Game/>
        },      
        
        {
            path: '/home',            
            element: <Home/>
        },  
        
        {
            path: '*',            
            element: <Home/>
        },      
    ],

    
    // rutas a las que puede acceder el usuario que NO esta logueado
    noLoggedIn: [        

        {
            path: '/home',            
            element: <Home/>
        },   
        
        {
            path: '*',            
            element: <Home/>
        },        
        
    ],   
}