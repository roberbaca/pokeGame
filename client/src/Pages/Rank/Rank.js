import React, { useEffect, useState } from "react";
import "../../Styles/components/Rank.css";
import "../../Styles/Global.css";

const Rank = () => {
  
  /*
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
*/
  return (
    <div className="rank__section">
      <div className="rank_table">
        <h1 className="rank__title">Hall of Fame</h1>
        <div className="rank__subtitle">
          <p className="rank__order">#</p>
          <p className="rank__user">Username</p>
          <p className="rank__best">Best Score</p>
        </div>
        <div className="rank__datacontainer">
          <div className="rank__data">
            <p className="rank__order">1</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">2</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">3</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">4</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">5</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">6</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">7</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">8</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">9</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
          <div className="rank__data">
            <p className="rank__order">10</p>
            <p className="rank__user">Cosme</p>
            <p className="rank__best">19</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Rank;
