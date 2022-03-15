const updateDomainsList = (state, action) => {

  if (state === undefined) {
    return {
      domains: null,
      loading: false,
      error: false,
      cursor: "",
    };
  }

  switch (action.type) {
    case 'DOMIANS_REQUESTED':
      return {
        domains: null,
        loading: true,
        error: false,
      };
    case 'DOMIANS_FETCH_SUCCESS':
      return {
        domains: action.payload,
        loading: false,
        error: false,
      };
    case 'DOMAINS_GET_MORE':
      console.log(action.payload)
      return {
        domains: action.payload.domains !== undefined ? [...state.domainsList.domains, ...action.payload.domains] : state.domainsList.domains,
        loading: false,
        error: false,
      };
    case 'DOMIANS_FETCH_ERROR':
      return {
        domains: state.domainsList.domains,
        loading: false,
        error: true,
      };
    case 'DOMIANS_FETCH_MORE_ERROR':
      return {
        ...state.domainsList
      };
    case 'DOMAINS_ADD_ONE':
      return {
        domains: state.domainsList.domains,
        loading: false,
        error: true,
      }
    default:
      return state.domainsList;
  }
};

export default updateDomainsList;