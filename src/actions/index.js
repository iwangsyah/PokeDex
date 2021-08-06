export const getPokemons = () => ({
  type: 'GET_POKEMONS',
});

export const getDetailPokemon = (pokemon) => ({
  type: 'GET_POKEMON_DETAIL',
  pokemon
});

export const getItems = () => ({
  type: 'GET_ITEMS',
});

export const getDetailItem = (item) => ({
  type: 'GET_ITEM_DETAIL',
  item
});