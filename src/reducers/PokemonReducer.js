
const pokemonReducer = (state = {}, action) => {

      switch (action.type) {
            case 'GET_POKEMONS':
                  return { ...state, loading: true };
            case 'POKEMONS_RECEIVED':
                  return { ...state, data: action.data, loading: false }
            default:
                  return state;
      }
};

export default pokemonReducer;