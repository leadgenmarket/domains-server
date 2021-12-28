const updateTitlesList = (state, action) => {

    if (state === undefined) {
      return {
        titles: null,
        loading: false,
        error: false,
      };
    }
  
    switch (action.type) {
        case 'TITLES_REQUESTED':
            return {
                titles: null,
                loading: true,
                error: false,
            };
        case 'TITLES_FETCH_SUCCESS':
            return {
                titles: action.payload,
                loading: false,
                error: false,
            };
        case 'TITLES_ERROR':
            return {
                titles: state.titlesList.titles,
                loading: false,
                error: true,
            };
        case 'TITLE_DELETE_ONE':
            return {
                titles: state.titlesList.titles,
                loading: false,
                error: true,
            };
        case 'TITLE_UPDATE':
            return {
                titles: state.titlesList.titles,
                loading: false,
                error: true,
            };
      default:
        return state.titlesList;
    }
  };
  
export default updateTitlesList;