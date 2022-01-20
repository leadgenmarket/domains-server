const updateLeadsList = (state, action) => {

  if (state === undefined) {
    return {
      leads: null,
      loading: false,
      error: false,
      cursor: "",
    };
  }

  switch (action.type) {
    case 'LEADS_REQUESTED':
      return {
        leads: null,
        loading: true,
        error: false,
      };
    case 'LEADS_FETCH_SUCCESS':
      return {
        leads: action.payload.leads,
        cursor: action.payload.cursor,
        loading: false,
        error: false,
      };
    case 'LEADS_GET_MORE':
      return {
        leads: [...state.leadsList.leads, ...action.payload.leads],
        cursor: action.payload.cursor,
        loading: false,
        error: false,
      };
    case 'LEADS_FETCH_ERROR':
      return {
        leads: state.leadsList.leads,
        loading: false,
        error: true,
      };
    case 'DOMAINS_ADD_ONE':
      return {
        leads: state.leadsList.leads,
        loading: false,
        error: true,
      }
    default:
      return state.leadsList;
  }
};

export default updateLeadsList;