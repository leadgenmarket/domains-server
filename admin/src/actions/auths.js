const loginRequested = () => {
    return {
      type: 'FETCH_LOGIN_REQUEST'
    };
};
  
const loginSuccess = () => {
    return {
      type: 'FETCH_LOGIN_SUCCESS',
    };
};
  
const loginError = (error) => {
    return {
      type: 'FETCH_LOGIN_ERROR',
      payload: error
    };
};

const notAuthorized = () => {
    return {
      type: 'NOT_AUTHORIZED'
    }
}




const fetchLogin = (apiService) => ({login, pass}) => (dispatch) => {
    dispatch(loginRequested());
    apiService.login(login,pass)
      .then((data) => dispatch(loginSuccess(data)))
      .catch((err) => dispatch(loginError(err.response.data.Message)));
};

const fetchLogout = (apiService) => () => (dispatch) => {
  dispatch(loginRequested());
  apiService.logout()
    .then(() => dispatch(notAuthorized()))
    .catch(()=>{dispatch(loginSuccess())});
};


const checkAuth = (apiService) => () => (dispatch) => {
  dispatch(loginRequested());
  apiService.ping()
    .then((data) => {
      console.log(data)
      dispatch(loginSuccess(data))
    })
    .catch(()=>{
      dispatch(notAuthorized())});
};

export {
    fetchLogin,
    fetchLogout,
    checkAuth,
}