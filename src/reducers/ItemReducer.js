
const itemReducer = (state = {}, action) => {

      switch (action.type) {
            case 'GET_ITEMS':
                  return { ...state, loading: true };
            case 'ITEMS_RECEIVED':
                  return { ...state, data: action.data, loading: false }
            default:
                  return state;
      }
};

export default itemReducer;