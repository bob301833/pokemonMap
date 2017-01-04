import React from 'react';
import {Route, IndexRoute} from 'react-router';
import PokemonIndex from './components/pokemon_index'
import App from './components/app'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={PokemonIndex} />
    </Route>
);