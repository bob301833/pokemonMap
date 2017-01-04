import axios from 'axios';

const ROOT_URL = `https://www.pokeradar.io/api/v1/submissions`;

export const FETCH_POKEMON = 'FETCH_POKEMON';

export function fetchPokemon(pokemon_id,position,zoomLevel){
  const lat = position.lat;
  const lon = position.lon;
  const url = `${ROOT_URL}?latitude=${lat}&longitude=${lon}&zoomLevel=${zoomLevel-2}&pokemonId=${pokemon_id}`;
  const request = axios.get(url);
  console.log(url);
  return{
    type: FETCH_POKEMON,
    payload: request
  };
}

export function selectPokemon(id){
  return{
    type: 'POKEMON_SELECTED',
    payload: id
  };

}

export function getPokemonInfo(){
  const url=`https://raw.githubusercontent.com/flyswatter/poke-scanner/master/pokedex.json`;
  const request = axios.get(url);  
  return{
    type: 'GET_POKEMONINFO',
    payload: request
  };

}

export function setPosition(position){
  return{
    type: 'SET_POSITION',
    payload: position
  };

}

export function setZoom(zoom){
  return{
    type: 'SET_ZOOM',
    payload: zoom
  };

}

export function updateTime(){
  return{
    type: 'UPDATE_TIME',
    payload: Date.now()
  };

}
