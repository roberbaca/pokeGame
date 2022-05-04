import React, { useEffect, useState } from 'react'
import axios from "axios";
//import Modal from '../Modal/Modal'
import '../../Styles/components/Card.css';
import '../../Styles/Global.css';


const Card = ({searchPokemon}) => {

  const baseURL= "https://pokeapi.co/api/v2/pokemon";
  //const [pokeModal, setPokeModal] = useState({});  
  const [pokemonData, setPokemonData] = useState({});  
  //const [options, setOptions] = useState([]);
  const [pokeNumber, setPokenNumber] = useState([]);
  const [pokeNames, setPokeNames] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [reveal, setReveal] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const max = 898;

  //const [pokeNameList, setPokeNameList] = useState([]);
  //const [pokeList, setPokeList] = useState([]);
  //const [isOpen, setIsOpen] = useState(false);
  //const [pokeModal, setPokeModal] = useState({});   
  const [load, setLoad] = useState(false); // flag para ver si terminaron de cargar las peticiones
    
  //console.log(datos.results); // para testing, son los datos que deberia traer el fetch de getAllPokemons()


  const getPokemonData = async () => {

    setReveal(false);  

    let correct = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    let option2 = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    let option3 = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    let option4 = Math.floor(Math.random() * (max - 1 + 1)) + 1;

    let allOptionsSorted = [correct, option2, option3, option4].sort( () => Math.random() - 0.5);
   
    console.log("Correct", correct);
    console.log(allOptionsSorted);
 

    try {      
       
              
        // obtengo la data del pokemon correcto
        const pokemon = await axios.get(`${baseURL}/${correct}/`);        
        const pokeDescription = await axios.get(pokemon.data.species.url);          
        const pokeDescriptionEn = pokeDescription.data.flavor_text_entries.find(d => d.language.name === "en"); // buscamos la descripcion en ingles
  
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
       
        // obtengo los nombres desordenados
        for (let i = 0; i < 4; i++) {
            pokeNumber[i] = await axios.get(`${baseURL}/${allOptionsSorted[i]}/`); 
            pokeNames[i] = pokeNumber[i].data.name;
            console.log(pokeNumber[i].data.name);            
        }

        setPokeNames(pokeNames);
        setPokenNumber(pokeNumber);
        setPokemonData(pokemonStats); 
        setCorrectAnswer(pokemonStats.name); 
        console.log(pokemonStats); 
        console.log(pokeNames);     
      //setLoad(true); 
      //setPokeModal(pokeList[0]);

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




  const guess = (e) => {
    const guessed = e.target.value;
    console.log("Elegiste: ", guessed);

    if (guessed === correctAnswer) {
        console.log("correcto!");
        setReveal(true);    
        setGuessCount(guessCount + 1);
    } else {
        console.log("incorrecto :(");
        setGuessCount(0);
    }
  }

  useEffect( () => {    
    getPokemonData();    
  }, []);


  return (    
    
    <div>  
        <div>
            <img src={pokemonData.img} alt="pokemonImg" className={reveal ? "reveal" : "hide"}/>      
            <p className='pokemonName'>{pokemonData.name}</p>
         </div>

        <button onClick={getPokemonData}>New Game</button>
        <button onClick={guess} value = {pokeNames[0]}>{pokeNames[0]}</button>     
        <button onClick={guess} value = {pokeNames[1]}>{pokeNames[1]}</button>     
        <button onClick={guess} value = {pokeNames[2]}>{pokeNames[2]}</button>
        <button onClick={guess} value = {pokeNames[3]}>{pokeNames[3]}</button>    
        <p>Consecutive Guesses: {guessCount}</p>


    {/* Mostramos un spinner mientras se obtiene la respuesta de pokeApi */}  
    {/* {!load &&  
    <div className='loader__container'>
      <div className='loader__spinner'></div> 
    </div>} */}
    

   {/* Renderizamos segun numero de pagina */}
    {/* {load && <div className='container'>     
      { searchPokemon === "" && pokeList.slice( (page - 1) * pagination, page * pagination).map( (p , index) =>           
       <div className={`card ${p.types[0]}`} key={index}>     
        <div className='card__pokenumbercontainer'>
          <p className='card__pokenumber'># {p.id}</p>
        </div>    
        <div className='card__pokeimgcontainer'>
          <img src={p.img} alt="pokemonImg" className='card__pokeimg' />
        </div>
        <div className='card__pokename'>
          <h2>{p.name}</h2>
        </div>
        <div className="card__poketypecontainer">
          <p className={`card__poketype--${p.types[0]}`}>{p.types[0]}</p>
          {p.types[1] && <p className={`card__poketype--${p.types[1]}`}>{p.types[1]}</p>}
        </div> 
        <div className='card_buttoncontainer'>
          <button className='card__button' onClick={handleClickModal} value={p.id}>Info</button>
        </div>       
      </div>      
      )}     */}

      {/* Renderizamos segun los datos ingresados en la barra de busqueda */}
      {/* { load && searchPokemon != "" && pokeList.filter(f => f.name.toUpperCase().includes( searchPokemon.toUpperCase() )).map( (p , index) =>     
      
       <div className={`card ${p.types[0]}`} key={index}>     
        <div className='card__pokenumbercontainer'>
          <p className='card__pokenumber'># {p.id}</p>
        </div>    
        <div className='card__pokeimgcontainer'>
          <img src={p.img} alt="pokemonImg" className='card__pokeimg' />
        </div>
        <div className='card__pokename'>
          <h2>{p.name}</h2>
        </div>
        <div className="card__poketypecontainer">
          <p className={`card__poketype--${p.types[0]}`}>{p.types[0]}</p>
          {p.types[1] && <p className={`card__poketype--${p.types[1]}`}>{p.types[1]}</p>}
        </div> 
        <div className='card_buttoncontainer'>
          <button className='card__button' onClick={handleClickModal} value={p.id}>Info</button>
        </div>       
      </div>                  
      
      )}       */}
    
     
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
      
 
 

    </div>
  )

}

export default Card