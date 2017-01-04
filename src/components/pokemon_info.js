import React, {Component} from 'react';
import {connect} from 'react-redux';

class PokemonInfo extends Component{

   render(){
    
      const {activePokemon} = this.props;
      const pokemon_id = activePokemon.selected;
      const infoPokemon = activePokemon.info;

      if(!pokemon_id || pokemon_id==0){
           return <div>Select a pokemon</div>;
      }
      const pokemon = infoPokemon[pokemon_id];

      //const url = `https://github.com/PokemonGoF/PokemonGo-Web/blob/master/image/pokemon/${id}.png?raw=true`;
      const url = `/images/pokemon/${pokemon_id}.png`;
      return(
           <div>
            <h3>Info:</h3> <br />
            <img src={url} />  <br />
            NO.{pokemon_id}<br />
            Name:{pokemon.name} <br />
            Attack:{pokemon.attack} <br />
            defense:{pokemon.defense} <br />
            type:{pokemon.type} <br />
            evolveLevel:{pokemon.evolveLevel} <br />
       
           </div>
      );
    
   }

}

function mapStateToProps(state){
  return {
    activePokemon: state.activePokemon
  };
}

export default connect(mapStateToProps,null)(PokemonInfo);