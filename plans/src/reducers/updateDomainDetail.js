const updateDomainDetail = (state, action) => {

  if (state === undefined) {
    return {
      domain: null,
      plans: [],
      loading: false,
      error: false,
    };
  }
  switch (action.type) {
    case 'DOMAIN_REQUESTED':
      return {
        domain: null,
        plans: state.domainDetail.plans,
        loading: true,
        error: false,
      };
    case 'DOMAIN_FETCH_SUCCESS':
      console.log('success')
      console.log(action.payload)
      return {
        domain: action.payload.site,
        plans: action.payload.plans,
        loading: false,
        error: false,
      };
    case 'DOMAIN_FETCH_ERROR':
      return {
        domain: state.domainDetail.domain,
        plans: state.domainDetail.plans,
        loading: false,
        error: true,
      };
    case 'DOMAIN_UPDATE_SUCCESS':
      return {
        domain: action.payload.site,
        plans: action.payload.plans,
        loading: false,
        error: false,
      };
    default:
      return state.domainDetail;
  }
};

export default updateDomainDetail;