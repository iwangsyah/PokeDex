import { put, takeLatest } from 'redux-saga/effects';

export function* fetchPokemons() {
    const json = yield fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
        .then(response => response.json());
    yield put({ type: "POKEMONS_RECEIVED", data: json.results });
}

export function* watchPokemons() {
    yield takeLatest('GET_POKEMONS', fetchPokemons);
}

export function* watchPokemonDetail() {
    yield takeLatest('GET_POKEMON_DETAIL');
}

export function* watchPokemonSpecies() {
    yield takeLatest('GET_POKEMON_SPECIES');
}