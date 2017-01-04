import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPokemon, selectPokemon, getPokemonInfo} from '../actions/index';

class SearchList extends Component{
    constructor(props){
        super(props); 

        this.state = { term: '0' };
        this.onInputChange= this.onInputChange.bind(this);
        
    }
    componentWillMount(){
        setInterval(this.searchpokemon.bind(this), 10000);
         this.props.getPokemonInfo();
    }

    onInputChange(event){
        this.props.selectPokemon(event.target.value);
        this.props.fetchPokemon(event.target.value,this.props.activePokemon.position,this.props.activePokemon.zoom);

        this.setState({term: event.target.value});

    }

    searchpokemon(){
        this.props.fetchPokemon(this.state.term,this.props.activePokemon.position,this.props.activePokemon.zoom);
        this.props.selectPokemon(this.state.term);
    }
  
    renderlist(){
        return Object.keys(this.props.activePokemon.info).map((item, key) => {
           
            const pokemon = this.props.activePokemon.info[item];
         
            return (
                <option value={item} key={item}>{'No.' + item+' '+pokemon.name}</option>
            );
        });
    }

    render(){
        
        if(!this.props.activePokemon.info)
            return <div>load...</div>;
        
        
        return(
            <div>
                
                <select onChange={this.onInputChange} value={this.state.term}>
                    <option value="" key="0">Please select</option>
                    {this.renderlist()}
                </select>
            </div>
        );
    }

}

function mapStateToProps(state){
  return {
    activePokemon: state.activePokemon
  };
}

export default connect(mapStateToProps,{fetchPokemon,selectPokemon,getPokemonInfo})(SearchList);