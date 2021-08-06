import { put, takeLatest } from 'redux-saga/effects';

export function* fetchItems() {
    const json = yield fetch('https://pokeapi.co/api/v2/items?limit=500')
        .then(response => response.json());
    yield put({ type: "ITEMS_RECEIVED", data: json.results });
}

export function* watchItems() {
    yield takeLatest('GET_ITEMS', fetchItems);
}

export function* watchItemDetail() {
    yield takeLatest('GET_ITEM_DETAIL');
}