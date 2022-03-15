const domainDetailInfoRequest = () => {
    return {
        type: 'DOMAIN_REQUESTED',
    }
}

const domainDetailInfoSuccess = (data) => {
    return {
        type: 'DOMAIN_FETCH_SUCCESS',
        payload: data
    }
}

const domainDetailInfoError = (id) => {
    return {
        type: 'DOMAIN_FETCH_ERROR',
        payload: id
    }
}

const updateDomain = (domain) => {
    return {
        type: 'DOMAIN_UPDATE_SUCCESS',
        payload: domain
    }
}

const fetchDomain = (apiService) => (id) => (dispatch) => {
    dispatch(domainDetailInfoRequest)
    apiService.domain(id)
        .then((data) => dispatch(domainDetailInfoSuccess(data.data)))
        .catch((err) => dispatch(domainDetailInfoError(err)))
}

/*const addDomain = (apiService) => (domain) => (dispatch) => {
    apiService.addDomain(domain)
        .then((data) => dispatch(addDomainAction(data)))
        .catch((err) => dispatch(domainDetailInfoError(err)))
}*/

const editDomain = (apiService) => (data) => (dispatch) => {
    apiService.editDomain(data)
        .then((data) => dispatch(updateDomain(data)))
        .catch((err) => dispatch(domainDetailInfoError(err)))
}

export {
    fetchDomain,
}