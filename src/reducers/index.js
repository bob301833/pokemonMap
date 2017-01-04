import { combineReducers } from 'redux';
import SearchPokemonReducer from './reducers_search_pokemons';
import ActivePokemon from './reducers_active_pokemon';
const rootReducer = combineReducers({
  searchPokemon:SearchPokemonReducer,
  activePokemon:ActivePokemon
});

export default rootReducer;
