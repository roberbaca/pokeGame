import React, { useEffect, useState } from "react";
import "../../Styles/components/Auth.css";
import "../../Styles/Global.css";

const Auth = () => {
  const [loginText, setLoginText] = useState("");
  const [loginForm, setLoginForm] = useState("");

  const registerSlider = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
  };

  const loginSlider = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
  };

  useEffect(() => {
    setLoginText(document.querySelector(".title-text .login"));
    setLoginForm(document.querySelector("form.login"));
  }, []);

  return (
    <div className="form">
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">
            <div className="form__sitelogo">
              <img src={require("../../assets/logo.png")} alt="logo" className="form__logo"/>
            </div>
            <h1 className="form-title">Login</h1>
          </div>
          <div className="title register">
            <div className="form__sitelogo">
              <img src={require("../../assets/logo.png")}alt="logo" className="form__logo"/>
            </div>
            <h1 className="form-title">Register</h1>
          </div>
        </div>

        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login"checked onClick={loginSlider}/>
            <input type="radio" name="slide" id="register" onClick={registerSlider}/>
            <label htmlFor="login" className="slide login">Login</label>
            <label htmlFor="register" className="slide register">Register</label>
            <div className="slider-tab"></div>
          </div>

          <div className="form-inner">
            {/* LOGIN */}
            <form action="#" className="login">
              <div className="field">
                <input id="input-email" type="text" placeholder="Email" autoComplete="off" required/>
              </div>
              <div className="field">
                <input id="input-password" type="password" placeholder="Password" autoComplete="off" required/>
              </div>
              <div className="field btn">
                <button className="login-btn" type="submit" id="login-btn">Login</button>
              </div>
            </form>

            {/* REGISTER */}
            <form action="#" className="register">
              <div className="field">
                <input id="register-name" type="text" placeholder="User Name" autoComplete="off" required/>
              </div>
              <div className="field">
                <input id="register-email" type="text" placeholder="Email" autoComplete="off" required/>
              </div>
              <div className="field">
                <input id="register-password" type="password" placeholder="Password" autoComplete="off" required/>
              </div>
              <div className="field">
                <input id="register-newPassword" type="password" placeholder="Confirm password" autoComplete="off" required/>
              </div>
              <div className="field btn">
                <button className="register-btn" type="submit" id="register-btn">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
