export default function(state = {selected: null, info:null, position:'',zoom : '18' ,nowtime:''}, action){
  switch(action.type){
    case 'POKEMON_SELECTED':
      return {...state, selected: action.payload};
    case 'GET_POKEMONINFO':
      return {...state, info: action.payload.data};
    case 'SET_POSITION':
      return {...state, position: action.payload};
    case 'SET_ZOOM':
      return {...state, zoom: action.payload};
    case 'UPDATE_TIME':
      return {...state, nowtime: action.payload};
  }
  return state;
}