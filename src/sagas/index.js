import { all, fork } from 'redux-saga/effects';
import { fetchPokemons, watchPokemons } from './pokemonSaga';

export function* rootSaga() {
    yield all([
        fork(fetchPokemons),
        fork(watchPokemons),
    ]);
};