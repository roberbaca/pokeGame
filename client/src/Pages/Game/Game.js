import React, { useEffect, useState } from 'react'
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import useToken from '../../utils/useToken';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/components/Game.css';
import '../../Styles/Global.css';

const Game = ({searchPokemon}) => {

  const baseURL= "https://pokeapi.co/api/v2/pokemon";     // URL de la PokeApi 
  const [allPokemon, setAllpokemon] = useState([]);       // array con los datos de todos los pokemons
  const [pokeNames, setPokeNames] = useState([]);         // nombres de los pokemons random
  const [correctId, setCorrectId] = useState(0);          // id del pokemon correcto
  const [correctAnswer, setCorrectAnswer] = useState(""); // nombre del pokemon correcto
  const [correctImg, setCorrectImg] = useState("");       // imagen del pokemon correcto
  const [reveal, setReveal] = useState(false);            // flag para saber si se acerto al pokemon correcto
  const [selected0, setSelected0] = useState(false);      // flag para saber que opcion fue elegida
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [guessCount, setGuessCount] = useState(0);         // conteo de aciertos

  const [isLoading, setIsLoading] = useState(false);       // spinner
  const [newRecord, setNewRecord] = useState(false);
  const { token, setToken } = useToken();

  const navigate = useNavigate(); 

  // de la DB obtengo:
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [bestScore, setBestScore] = useState(0);           // mejor puntaje logrado (de la DB)
  const [currentRank, setCurrentRank] = useState([]);   

  const max = 151;                                         // maximo id de los pokemon
  let correct, option2, option3, option4 = 0;
  let allOptionsSorted = [];

  const getPokemonData = async () => {      
    
    setIsLoading(true);

        try {         
          for (let i = 1; i < ( max + 1 ); i++) {
            let pokemon = await axios.get(`${baseURL}/${i}/`);     
            
            let pokemonStats = {
              id: pokemon.data.id,
              name: pokemon.data.name,          
              img: pokemon.data.sprites.front_default,
            }
  
            allPokemon[i] = pokemonStats;            
          } 

          setAllpokemon(allPokemon);  // guardo toda la data             
          newRandomPokemon();
          setIsLoading(false)         // Hide loading screen 
        
      } catch (error){
        console.log(error);
        setIsLoading(false);
      }      
    } 
   
  const newRandomPokemon = () => {    
    correct = Math.floor(Math.random() * (max - 1 + 1)) + 1;    
    option2 = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    option3 = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    option4 = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    
    allOptionsSorted = [correct, option2, option3, option4].sort( () => Math.random() - 0.5);
    setCorrectId(correct);
    setPokeNames([allPokemon[allOptionsSorted[0]].name, allPokemon[allOptionsSorted[1]].name, allPokemon[allOptionsSorted[2]].name, allPokemon[allOptionsSorted[3]].name]);
    setCorrectAnswer(allPokemon[correct].name); 
    setCorrectImg(allPokemon[correct].img); 
  }


  const guess = (e) => {
    const guessed = e.target.value;
    const optnmb = e.target.name; 
  
    switch (optnmb) {
      case "0":
        setSelected0(true);      
        break;
      case "1":
        setSelected1(true);      
        break;
      case "2":
        setSelected2(true);     
        break;
      case "3":
        setSelected3(true);      
        break;
      default:
        break
    }

    if (guessed === correctAnswer) {
        //console.log("correcto!");
        setReveal(true);   
        setGuessCount(guessCount + 1);      
       
    } else {
        //console.log("incorrecto :(");  
        setGuessCount(0); 
        if (newRecord) {
          saveNewRecord(email, Number(bestScore));
          getRanks();
          newRecordToast();
          setNewRecord(false);
        }             
    }
  }


  // muestra el sig pokemon
  const newGame = () => {
    setReveal(false);  
    setSelected0(false);
    setSelected1(false);
    setSelected2(false);
    setSelected3(false);
    newRandomPokemon();     
  }  

  const getUserData = async (email) => {
    try {
      const response = await axiosInstance.get(`/user/userdata/${email}`);  
      setUsername(response.data.username);
      setBestScore(response.data.score);
    } catch (error) {
      console.log(error);
    }  
  }
  
  const newRecordToast = () => toast('😀 New Record!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const waitToast = () => toast('🔎 Please wait. Fetching pokemons...', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });



  const saveNewRecord = async (mail, score) => {
    try {
      const response = await axiosInstance.patch('/user/update-score', { email: mail, score: score });  // llamada al back y obtenemos el token       
      //console.log("record saved");
    } catch (error) {
      console.log(error);    
    }  
  }

  const getRanks = async () => {
    try {
      const response = await axiosInstance.get('/user/rank');  // llamada al back y obtenemos el token       
      setCurrentRank(response.data);
      //console.log("ranking: ", response.data);
    } catch (error) {
      console.log(error);    
    }  
  }

  useEffect( () => {    
    if (guessCount >= bestScore) {
      setBestScore(guessCount);    
      setNewRecord(true);
    }
    // console.log("score: " + guessCount);   
    // console.log("Best score: " + bestScore); 
  }, [guessCount]);
  

  
  useEffect( () => {    
    setEmail(localStorage.getItem("usermail"));

    if (email) {
      getUserData(email);
    }
  }, [email]);
  
  useEffect( () => {  
    waitToast();  
    getPokemonData();  
    getRanks();
    setGuessCount(0);
    setNewRecord(false);

    if (!token){
      navigate("/");  
    }
  }, []);



  return (    
    
   
    <div className='game__section'>  
    <Navbar score = {guessCount} best={bestScore} username = {username} ranks = {currentRank}/>
      <div className='game__card'>
        <h1 className='game__title'>Who's that <img src={require("../../assets/logo.png")} alt="pokemonheader" className='pokemontitle'/>?</h1>
            
        <div className='game__wraper'>            
          {isLoading ? <LoadingSpinner/> : 
          <div className='game__pokemonimg'>         
            <img src={correctImg} alt="pokemonImg" className={reveal ? "game__pokereveal" : "game__pokehide"}/>
          </div> }          
          <div className='game__choices'>          
            <div className='game__buttoncontainer'>
            {reveal && <div className='game__buttonblock'>
              <button className='game__button' onClick={newGame}>Next</button>
          </div>}  
              {!reveal && !isLoading && <div className='game__buttonblock'>
              <div className='game__buttonwraper'>
                <div className='pokeballcontainer'>
                  <img src={require("../../assets/pokeball.png")} alt="pokeball" className='pokeball'/>
                </div>
                <button className={ (selected0 && !reveal) ? "game__button--wrong" : "game__button" } onClick={guess} value = {pokeNames[0]} name="0">{pokeNames[0]}</button>   
              </div>
              <div className='game__buttonwraper'>
                <div className='pokeballcontainer'>
                  <img src={require("../../assets/pokeball.png")} alt="pokeball" className='pokeball'/>
                </div>
                <button className={ (selected1 && !reveal) ? "game__button--wrong" : "game__button"  } onClick={guess} value = {pokeNames[1]} name="1">{pokeNames[1]}</button>     
              </div>            
              <div className='game__buttonwraper'>
                <div className='pokeballcontainer'>
                  <img src={require("../../assets/pokeball.png")} alt="pokeball" className='pokeball'/>  
                </div>
                <button className={ (selected2 && !reveal) ? "game__button--wrong" : "game__button"  } onClick={guess} value = {pokeNames[2]} name="2">{pokeNames[2]}</button>
              </div>
              <div className='game__buttonwraper'>
                <div className='pokeballcontainer'>
                  <img src={require("../../assets/pokeball.png")} alt="pokeball" className='pokeball'/>
                </div>
                <button className={ (selected3 && !reveal) ? "game__button--wrong" : "game__button"  } onClick={guess} value = {pokeNames[3]} name="3">{pokeNames[3]}</button>    
              </div>
            </div>}                
          </div>
        </div>        
      </div>   
      <div className='game__answercontainer'>
            <p className={reveal ? "game__answerreveal" : "game__answerhide"}>It's {correctAnswer} !</p>
      </div>


      </div>  
      <Footer/>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Game


    
 