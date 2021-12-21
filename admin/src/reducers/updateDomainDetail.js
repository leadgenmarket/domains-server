const updateDomainDetail = (state, action) => {

    if (state === undefined) {
      return {
        domain: null,
        loading: false,
        error: false,
      };
    }
    switch (action.type) {
      case 'DOMAIN_REQUESTED':
        return {
          domain: null,
          loading: true,
          error: false,
      };
      case 'DOMAIN_FETCH_SUCCESS':
        console.log('success')
        return {
          domain: action.payload,
          loading: false,
          error: false,
      };
      case 'DOMAIN_FETCH_ERROR':
        return {
          domain: state.domainDetail.domain,
          loading: false,
          error: true,
      };
      case 'DOMAIN_UPDATE_SUCCESS':
       
        return {
          domain: action.payload,
          loading: false,
          error: false,
      };
      default:
        return state.domainDetail;
    }
  };
  
  export default updateDomainDetail;