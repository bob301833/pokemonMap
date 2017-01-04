import React, {Component} from 'react';
import SearchList from './search_list'
import PokemonInfo from './pokemon_info'
import {connect} from 'react-redux';
import {fetchPokemon,setPosition, setZoom, updateTime} from '../actions/index';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
class PokemonIndex extends Component{
    constructor(props){
        super(props);

        this.refetchPokemon = this.refetchPokemon.bind(this);   
        this.getPosition=this.getPosition.bind(this);
        this.renderInfo=this.renderInfo.bind(this);
    }
    componentWillMount(){
        navigator.geolocation.watchPosition(this.getPosition);
        setInterval(this.setNowTime.bind(this), 1000);
    }
    setNowTime(){
        this.props.updateTime();
    }
    transGoogleMark(mark){

        const url = `/images/pokemon/${mark.pokemonId}.png`;
        const tran_mark={
            info: mark,
            position: {
            lat: mark.latitude,
            lng: mark.longitude,
            },
            defaultAnimation: 2,
            key: mark.id, // Add a key property for: http://fb.me/react-warning-keys
            icon: {
                url: url,
                scaledSize: {width:50,height:50}},
        };
        
        return tran_mark;
    }
    refetchPokemon(){
        const zoom = this.refs.map.getZoom();
        const center_now = {
            "lat": this.refs.map.getCenter().lat(),
            "lon":this.refs.map.getCenter().lng()
        };

        this.props.fetchPokemon(this.props.activePokemon.selected,center_now,zoom);
        this.props.setZoom(zoom);
        this.props.setPosition(center_now);
    }
    getPosition(position) {
       
        const position_now = {
            "lat": position.coords.latitude,
            "lon": position.coords.longitude
        };
        //this.setState({position: position_now});
        this.props.setPosition(position_now);
    }
    renderInfo(marker){
         return(
            <InfoWindow>
                <div>
                Pokemon ID:{marker.info.pokemonId} <br />
                LiveTime:{this.livetime(marker.info.created)}
                </div>
            </InfoWindow>
         );
    }

    livetime(create_time){
        const now_time = this.props.activePokemon.nowtime;
        const live_time =  (now_time/1000) - create_time;
        return this.formatSecond(900 - live_time);

    }
    formatSecond(secs) {          
         var hr = Math.floor(secs / 3600);
         var min = Math.floor((secs - (hr * 3600)) / 60);
         var sec = parseInt( secs - (hr * 3600) - (min * 60));
 
         while (min.length < 2) { min = '0' + min; }
         while (sec.length < 2) { sec = '0' + min; }
         if (hr) hr += ':';
         return hr + min + ':' + sec;
 
     }
    render(){
        const {pokemons, activePokemon} = this.props;
        const {position, zoom, selected} = activePokemon;
        const marks = [];     
        if(!position)
            return <div>loading...</div>;
 
        if(pokemons.pokemon_marks && selected){
            //filter "(Poke Radar Prediction)"
            pokemons.pokemon_marks.data.map((mark)=>{
                if(mark.trainerName==="(Poke Radar Prediction)"){
                    const obj = this.transGoogleMark(mark);
                    marks.push(obj);      
                }
            });
        }
        
        return(
        <div style={{ height: "100%" }}>
            <div className="col-md-3">
                <SearchList />
                <PokemonInfo />
            </div>
            <div style={{ height: "100%" }}>
 
                <section style={{ height: `100%` }}>
                    <GoogleMapLoader 
                    containerElement={<div style={{ height: `100%` }} />}
                    googleMapElement={
                        <GoogleMap  ref="map" onDragend={this.refetchPokemon} onZoomChanged={this.refetchPokemon} defaultZoom={18} defaultCenter={{lat: position.lat, lng: position.lon}} >
                            {marks.map((marker, index) => (
                                        <Marker key={marker.key} {...marker}>
                                            {this.renderInfo(marker)}
                                        </Marker>
                                ))}
                        </GoogleMap>
                    }
                    />
                </section>
            </div>
        </div>
        );    
    }
}

function mapStateToProps(state){
  return {pokemons : state.searchPokemon, activePokemon: state.activePokemon}
}

export default connect(mapStateToProps,{fetchPokemon,setPosition,setZoom,updateTime})(PokemonIndex);