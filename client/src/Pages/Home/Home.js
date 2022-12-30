import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import '../../Styles/components/Home.css';
import '../../Styles/Global.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirmedPassword, setConfirmedPassword] = useState(""); 
  const [username, setUserName] = useState(""); 
  const [token, setToken] = useState(null); 
  
  const navigate = useNavigate(); 

  const handleClick = () => {
    setRegisterFormVisible(!registerFormVisible);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
}

const handleChangeConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value);
}

const handleChangeEmail = (e) => {
    setEmail(e.target.value);
}

const handleChangeUserName = (e) => {
    setUserName(e.target.value);
}

const passwordNotify = () => toast("❌ Passwords do not match");
const loginNotify = () => toast("❌ Incorrect email or password");
const registerNotify = () => toast("✔ Registration successful. Please login");

const onLogin = async () => {
  try {
    const response = await axiosInstance.post('/user/login', { email, password });  // llamada al back y obtenemos el token       
    const accesToken = response.data.accessToken;    
    setToken(accesToken);  
    console.log(accesToken)
  } catch (error) {
    loginNotify();
    console.log(error);    
  }  
}

const onRegister = async () => {
  try {
    if (password === confirmedPassword) {
      const response = await axiosInstance.post('/user/register', { username, email, password });  // llamada al back y obtenemos el token    
      if (response.status == 200) {
        registerNotify();
        setRegisterFormVisible(!registerFormVisible);
        setEmail("");
        setPassword("");
      }
    }
    else {
      console.log("Passwords do not match"); 
      passwordNotify();

    }
  } catch (error) {
      console.log(error);
    }  
}

// guardamos el token en el local storage para poder usarlo en Game
useEffect(() => {
  if (token) {    
    // console.log("token: " + token); 
    localStorage.setItem('token', token);
    localStorage.setItem('usermail', email);
    navigate("/game");                                                 
  }        
}, [token]) 

// limpiamos el local storage apenas se inicia la app
useEffect(() => { 
    localStorage.clear();                                              
  }, []) 

  return (
    <section className='home'>
      <h1 className='home__title'>Who's That <img src={require("../../assets/logo.png")} alt="" className='logo' /> ?</h1>
       
      <div className="home__wraper">
        { !registerFormVisible && <form className="form__wraper">
          <h2 className='form__subtitle'>Login &amp; Play</h2>  
          <input type="text" placeholder="Email" autoComplete="off" className='form__input'  value={email} onChange={handleChangeEmail} required/>
          <input type="password" placeholder="Password" autoComplete="off" className='form__input' value={password} onChange={handleChangePassword} required/>
          <button className='form__btn' type='button' onClick = {onLogin}>Guess 'em all !</button>
          <p className='form__link' onClick={handleClick}>Create new Account</p>   
        </form> }

        { registerFormVisible && <form className="form__wraper">
          <h2 className='form__subtitle'>Create new account</h2>  
          <input type="text" placeholder="User Name" autoComplete="off" className='form__input' value={username} onChange={handleChangeUserName} required/>
          <input type="text" placeholder="Email" autoComplete="off" className='form__input'  value={email} onChange={handleChangeEmail} required/>
          <input type="password" placeholder="Password" autoComplete="off" className='form__input' value={password} onChange={handleChangePassword} required/>
          <input type="password" placeholder="Repeat password" autoComplete="off" className='form__input' value={confirmedPassword} onChange={handleChangeConfirmedPassword} required/>
          <button className='form__btn' type='button' onClick = {onRegister}>Sign Up</button>
          <p className='form__link' onClick={handleClick}>Do you have an account?</p>   
        </form> }

        <div className='image__wraper'>
          <img src={require("../../assets/main.png")} alt="" className='image' />   
        </div>
      </div>

      <ToastContainer 
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

    </section>
  )
}

export default Home