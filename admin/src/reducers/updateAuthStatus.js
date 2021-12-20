const updateAuthStatus = (state, action) => {

    if (state === undefined) {
      return {
        auth: null,
        loading: false,
        error: null,
      };
    }
  
    switch (action.type) {
      case 'NOT_AUTHORIZED':
        return {
          auth: false,
          loading: false,
          error: null,
      };
      case 'FETCH_LOGIN_REQUEST':
        return {
          auth: state.authStatus.auth,
          loading: true,
          error: null,
      };
      case 'FETCH_LOGIN_ERROR':
        return {
          auth: false,
          error: action.payload,
          loading: false,
        };
  
      case 'FETCH_LOGIN_SUCCESS':
        return {
          auth: true,
          loading: false,
          error: null,
        };
      default:
        return state.authStatus;
    }
  };
  
  export default updateAuthStatus;