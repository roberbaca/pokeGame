import React, { useEffect, useState } from 'react'
import axios from "axios";
//import Modal from '../Modal/Modal'
import '../../Styles/components/Game.css';
import '../../Styles/Global.css';


const Game = ({searchPokemon}) => {

  const baseURL= "https://pokeapi.co/api/v2/pokemon";     // URL de la PokeApi
  const [allPokemon, setAllpokemon] = useState([]);                                  // array con los datos de todos los pokemons
  const [pokeNames, setPokeNames] = useState([]);         // nombres de los pokemons random

  const [correctAnswer, setCorrectAnswer] = useState(""); // nombre del pokemon correcto
  const [correctImg, setCorrectImg] = useState("");       // imagen del pokemon correcto
  const [reveal, setReveal] = useState(false);            // flag para saber si se acerto al pokemon correcto
  const [selected0, setSelected0] = useState(false);      // flag para saber que opcion fue elegida
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [guessCount, setGuessCount] = useState(0);         // conteo de aciertos
  
  const max = 151;                                         // maximo id de los pokemon
  let correct, option2, option3, option4 = 0;
  let allOptionsSorted = [];

  //const [isOpen, setIsOpen] = useState(false);
  //const [pokeModal, setPokeModal] = useState({});   
  
    
  const clearCache = () => {
    localStorage.removeItem("pokemon");
    console.log("CACHE CLEARED!");
  }

  const loadCache = () => {
    const cache = JSON.parse(localStorage.getItem("pokemon"));
    setAllpokemon(cache);
    console.log("Cache: ", cache);
  }
 


  const getPokemonData = async () => {

    setReveal(false);  
    getRandomPokemon();     

    try {     
      
        // Chequeo si ya tengo la data de la PokeApi.
        // Si no encuentra nada, hago un fetch

        if (localStorage.getItem("pokemon") != null) {          
       
          console.log("NO HICE FETCH !");
          let cache = JSON.parse(localStorage.getItem("pokemon"));
          setAllpokemon(cache);
          setPokeNames([allPokemon[allOptionsSorted[0]].name, allPokemon[allOptionsSorted[1]].name, allPokemon[allOptionsSorted[2]].name, allPokemon[allOptionsSorted[3]].name]);
          setCorrectAnswer(allPokemon[correct].name); 
          setCorrectImg(allPokemon[correct].img); 

        } else if (localStorage.getItem("pokemon") == null) {

          for (let i = 1; i < ( max + 1 ); i++) {
            let pokemon = await axios.get(`${baseURL}/${i}/`);     
            let pokeDescription = await axios.get(pokemon.data.species.url);          
            let pokeDescriptionEn = pokeDescription.data.flavor_text_entries.find(d => d.language.name === "en"); // buscamos la descripcion en ingles
      
            let pokemonStats = {
              id: pokemon.data.id,
              name: pokemon.data.name,          
              img: pokemon.data.sprites.front_default,
              types: [pokemon.data.types[0].type.name, pokemon.data.types[1] ? pokemon.data.types[1].type.name : ""], // algunos pokemon tiene un solo tipo otros 2       
              stats: {
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                hp: pokemon.data.stats[0].base_stat,            
                atk: pokemon.data.stats[1].base_stat,
                def: pokemon.data.stats[2].base_stat,
                spAtk: pokemon.data.stats[3].base_stat,
                spDef: pokemon.data.stats[4].base_stat,
                speed: pokemon.data.stats[5].base_stat,
              },                  
              description: pokeDescriptionEn.flavor_text // damos formato al texto de la descripcion del pokemon
                .replace(/u'\f'/, /u'\n'/)
                .replace(/\u00AD/g, '')
                .replace(/\u000C/g, ' ')
                .replace(/u' -\n'/, ' - ')
                .replace(/u'-\n'/, '-')
                .replace(/(\r\n|\n|\r)/gm, ' ')               
            }    
  
            allPokemon[i] = pokemonStats;            
          } 

          setAllpokemon(allPokemon);
          
          // guardo en el local Storage
          localStorage.setItem("pokemon", JSON.stringify(allPokemon));

          setPokeNames([allPokemon[allOptionsSorted[0]].name, allPokemon[allOptionsSorted[1]].name, allPokemon[allOptionsSorted[2]].name, allPokemon[allOptionsSorted[3]].name]);
          setCorrectAnswer(allPokemon[correct].name); 
          setCorrectImg(allPokemon[correct].img); 
          console.log("Todos los pokemones: ", allPokemon);
        }

/*
        if ( allPokemon.length == 0 ) {
          for (let i = 1; i < ( max + 1 ); i++) {
            let pokemon = await axios.get(`${baseURL}/${i}/`);     
            let pokeDescription = await axios.get(pokemon.data.species.url);          
            let pokeDescriptionEn = pokeDescription.data.flavor_text_entries.find(d => d.language.name === "en"); // buscamos la descripcion en ingles
      
            let pokemonStats = {
              id: pokemon.data.id,
              name: pokemon.data.name,          
              img: pokemon.data.sprites.front_default,
              types: [pokemon.data.types[0].type.name, pokemon.data.types[1] ? pokemon.data.types[1].type.name : ""], // algunos pokemon tiene un solo tipo otros 2       
              stats: {
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                hp: pokemon.data.stats[0].base_stat,            
                atk: pokemon.data.stats[1].base_stat,
                def: pokemon.data.stats[2].base_stat,
                spAtk: pokemon.data.stats[3].base_stat,
                spDef: pokemon.data.stats[4].base_stat,
                speed: pokemon.data.stats[5].base_stat,
              },                  
              description: pokeDescriptionEn.flavor_text // damos formato al texto de la descripcion del pokemon
                .replace(/u'\f'/, /u'\n'/)
                .replace(/\u00AD/g, '')
                .replace(/\u000C/g, ' ')
                .replace(/u' -\n'/, ' - ')
                .replace(/u'-\n'/, '-')
                .replace(/(\r\n|\n|\r)/gm, ' ')               
            }    
  
            allPokemon[i] = pokemonStats;            
          } 

          setAllpokemon(allPokemon);
          // guardo en el local Storage
          localStorage.setItem("pokemon", JSON.stringify(allPokemon));

          setPokeNames([allPokemon[allOptionsSorted[0]].name, allPokemon[allOptionsSorted[1]].name, allPokemon[allOptionsSorted[2]].name, allPokemon[allOptionsSorted[3]].name]);
          setCorrectAnswer(allPokemon[correct].name); 
          setCorrectImg(allPokemon[correct].img); 
          console.log("Todos los pokemones: ", allPokemon);
          
        } else if ( allPokemon.length > 0 ){
          
          console.log("No hice fetch!");
          loadCache();
          setPokeNames([allPokemon[allOptionsSorted[0]].name, allPokemon[allOptionsSorted[1]].name, allPokemon[allOptionsSorted[2]].name, allPokemon[allOptionsSorted[3]].name]);
          setCorrectAnswer(allPokemon[correct].name); 
          setCorrectImg(allPokemon[correct].img);   
        }
       
        console.log("pokenames: ", pokeNames);         
        //setLoad(true); 
        //setPokeModal(pokeList[0]);
*/
    } catch (error){
        console.log(error);
      }  
      
      
  }    

 
//   const handleClickModal = (e) => {
//     setIsOpen(true);
//     const id = e.target.value;    
//     setPokeModal(pokeList[id-1]);
//     console.log("clickeaste en el pokemon #", id);
//   };

  const getRandomPokemon = () => {

    // genero 4 numeros random entre 1 y el max definido
    correct = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    option2 = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    option3 = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    option4 = Math.floor(Math.random() * (max - 1 + 1)) + 1;

    // desordeno los numeros
    allOptionsSorted = [correct, option2, option3, option4].sort( () => Math.random() - 0.5);
   
    console.log("Correct", correct);
    console.log(allOptionsSorted);
  }


  const guess = (e) => {
    const guessed = e.target.value;
    const optnmb = e.target.name;
    console.log("Elegiste: ", guessed,  "opcion numero: ", optnmb);
    
    switch (optnmb) {
      case "0":
        setSelected0(true);
        console.log(selected0);
        break;
      case "1":
        setSelected1(true);
        console.log(selected1);
        break;
      case "2":
        setSelected2(true);
        console.log(selected2);
        break;
      case "3":
        setSelected3(true);
        console.log(selected3);
        break;
      default:
        break
    }

    if (guessed === correctAnswer) {
        console.log("correcto!");
        setReveal(true);   
        setGuessCount(guessCount + 1);
    } else {
        console.log("incorrecto :(");       
        setGuessCount(0);       
    }
  }

   
  const newGame = () => {
    getPokemonData();  
    setReveal(false);
    setSelected0(false);
    setSelected1(false);
    setSelected2(false);
    setSelected3(false);
  }

  useEffect( () => {    
    getPokemonData();     
  }, []);


  return (    
    
    <div className='game__container'>  
   
      <div className='game__card'>
        <div className='game__header'>            
          <h1 className='game__title'>Who's that Pokémon?</h1>
        <div className='game__pokemonimg'>
          <img src={correctImg} alt="pokemonImg" className={reveal ? "game__pokereveal" : "game__pokehide"}/>      
        </div>           
      </div>
       

      <div className='game__choices'>          
        <div className='game__answercontainer'>
          <p className={reveal ? "game__answerreveal" : "game__answerhide"}>It's {correctAnswer} !</p>
        </div>
         
          {/* <button onClick={clearCache}>CLEAR</button> */}
          <div className='game__buttoncontainer'>
            {!reveal && <div className='game__buttonblock'>
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

            {reveal && <div className='game__buttonblock'>
              <button className='game__button' onClick={newGame}>Next</button>
            </div>}
            
          </div>            
        </div>
      </div>
    </div>
  )
}

export default Game


{/* <p>Consecutive Guesses: {guessCount}</p> */}




    {/* Mostramos un spinner mientras se obtiene la respuesta de pokeApi */}  
    {/* {!load &&  
    <div className='loader__container'>
      <div className='loader__spinner'></div> 
    </div>} */}
        
     
      {/* Pop Ups (Modal) */}     
      
      {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {load && <div>
          <div className='modal__namecontainer'>
            <h3 className='modal__name'>{pokeModal.name}</h3>
            <img src={pokeModal.img} alt="pokemonImg" className='modal__img' />  
          </div>          
          <div className='modal__stats'>
            <div className='modal__measures'>
              <p>Height: {pokeModal.stats.height} ft</p>
              <p>Weight: {pokeModal.stats.weight} lbs</p>
            </div>
            <h4 className='modal__statstitle'>Statistics</h4>     
            <div className='modal__measures'>
              <p><span>Attack: </span>{pokeModal.stats.atk}</p>
              <p><span>Defense: </span>{pokeModal.stats.def}</p>
            </div>     
            <div className='modal__measures'>
              <p><span>Sp. Attack: </span>{pokeModal.stats.spAtk}</p>
              <p><span>Sp. Deffense: </span>{pokeModal.stats.spDef}</p>
            </div> 
            <div className='modal__measures'>
              <p><span>HP: </span>{pokeModal.stats.hp}</p>
              <p><span>Speed: </span>{pokeModal.stats.speed}</p>
            </div>            
          </div>
          <p className='modal__description'>{pokeModal.description}</p>

        </div>}        
      </Modal> */}
      