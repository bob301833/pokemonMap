import {FETCH_POKEMON} from '../actions/index';

const INITIAL_STATE={pokemon_marks:null};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_POKEMON:
       return {pokemon_marks:action.payload.data};
    default:
      return state;
  }
}