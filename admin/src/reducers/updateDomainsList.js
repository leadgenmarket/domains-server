const updateDomainsList = (state, action) => {

    if (state === undefined) {
      return {
        domains: null,
        loading: false,
        error: false,
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
      case 'DOMIANS_FETCH_ERROR':
        return {
          domains: state.domainsList.domains,
          loading: false,
          error: true,
        };
      default:
        return state.domainsList;
    }
  };
  
  export default updateDomainsList;