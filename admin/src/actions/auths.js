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

const registartionRequested = () => {
  return {
    type: 'FETCH_REGISTER_REQUEST',
  };
};

const returnToRegistration = () => {
  return {
    type: 'RETURN_TO_REGISTRATION',
  };
};

const registartionSuccess = (phone) => {
  return {
    type: 'FETCH_REGISTER_SUCCESS',
    payload: phone,
  };
};

const registartionError = (error) => {
  return {
    type: 'FETCH_REGISTER_ERROR',
    payload: error
  };
};

const verifyCodeRequest = () => {
  return {
    type: 'FETCH_CODE_REQUEST'
  }
}

const verifyCodeSuccess = () => {
  return {
    type: 'FETCH_CODE_SUCCESS'
  }
}

const verifyCodeError = (error) => {
  return {
    type: 'FETCH_CODE_ERROR',
    payload: error
  }
}




const fetchLogin = (apiService) => ({phone, pass}) => (dispatch) => {
    dispatch(loginRequested());
    apiService.login(phone,pass)
      .then((data) => dispatch(loginSuccess(data)))
      .catch((err) => dispatch(loginError(err.response.data.Message)));
};

const fetchRegister = (apiService) => (data) => (dispatch) => {
  dispatch(loginRequested());
  apiService.register(data)
    .then((res) => {
      
      dispatch(registartionSuccess(data.phone))
    })
    .catch((err) => {
      dispatch(registartionError(err.response.data.Message))
    });
};

const fetchCode = (apiService) => (data) => (dispatch) => {
  dispatch(verifyCodeRequest());
  apiService.verifyCode(data)
    .then((data) => dispatch(verifyCodeSuccess()))
    .catch((err) => dispatch(verifyCodeError(err.response.data.Message)));
};

const checkAuth = (apiService) => () => (dispatch) => {
  dispatch(loginRequested());
  apiService.ping()
    .then((data) => dispatch(loginSuccess(data)))
    .catch(()=>{dispatch(notAuthorized())});
};

const fetchLogout = (apiService) => () => (dispatch) => {
  dispatch(loginRequested());
  apiService.logout()
    .then(() => dispatch(notAuthorized()))
    .catch(()=>{dispatch(loginSuccess())});
};

export {
    fetchLogin,
    checkAuth,
    fetchLogout,

    registartionRequested,
    registartionSuccess,
    verifyCodeRequest,
    verifyCodeError,
    fetchRegister,
    fetchCode,
    returnToRegistration
}