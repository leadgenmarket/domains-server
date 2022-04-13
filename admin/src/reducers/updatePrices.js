const updatePricesList = (state, action) => {

    if (state === undefined) {
      return {
        list: null,
        loading: false,
        error: false,
      };
    }
  
    switch (action.type) {
        case 'PRICES_REQUESTED':
            return {
                list: null,
                loading: true,
                error: false,
            };
        case 'PRICES_FETCH_SUCCESS':
            return {
                list: action.payload,
                loading: false,
                error: false,
            };
        case 'PRICES_FETCH_ERROR':
            return {
                list: state.pricesList.list,
                loading: false,
                error: true,
            };
        case 'PRICES_UPDATE_SUCCESS':
            return {
                list: state.pricesList.list,
                loading: false,
                error: false,
            };
        case 'PRICES_UPDATE_ERROR':
            return {
                list: state.pricesList.list,
                loading: false,
                error: false,
            };
      default:
        return state.pricesList;
    }
  };
  
export default updatePricesList;