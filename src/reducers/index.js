import { combineReducers } from 'redux';
import pokemonReducer from './PokemonReducer';
import itemReducer from './ItemReducer';

const appReducer = combineReducers({
  pokemonReducer,
  itemReducer
});

const rootReducer = (state, action) =>
  appReducer(state, action);

export default rootReducer;
