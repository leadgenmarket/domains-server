const domainsRequested = () => {
    return {
        type: 'DOMIANS_REQUESTED',
    }
}

const domainsRequestSuccess = (domains) => {
    return {
        type: 'DOMIANS_FETCH_SUCCESS',
        payload: domains
    }
}

const domainsRequestMoreSuccess = (domains) => {
    return {
        type: 'DOMAINS_GET_MORE',
        payload: domains
    }
}

const domainsRequestError = () => {
    return {
        type: 'DOMIANS_FETCH_ERROR',
    }
}

const domainsRequestMoreError = () => {
    return {
        type: 'DOMIANS_FETCH_MORE_ERROR',
    }
}



const deleteDomainAction = (id) => {
    return {
        type: 'DOMAINS_DELETE_ONE',
        payload: id
    }
}

const addDomainToList = (domain) => {
    return {
        type: 'DOMAINS_ADD_ONE',
        payload: domain
    }
}

const removeDomainFromList = (id) => {
    return {
        type: 'DOMAINS_REMOVE_ONE',
        payload: id
    }
}

const fetchDomains = (apiService) => (searchUrl, cursor, itemscnt) => (dispatch) => {
    dispatch(domainsRequested)
    apiService.domainsList(searchUrl, cursor, itemscnt)
        .then((response) => {
            dispatch(domainsRequestSuccess(response.data))
        })
        .catch((err) => dispatch(domainsRequestError(err)))
}

const fetchMore = (apiService) => (searchUrl, cursor, itemscnt) => (dispatch) => {
    dispatch(domainsRequested)
    apiService.domainsList(searchUrl, cursor, itemscnt)
        .then((response) => dispatch(domainsRequestMoreSuccess(response.data)))
        .catch((err) => {
            dispatch(domainsRequestMoreError(err))
        })
}

const deleteDomain = (apiService) => (id) => (dispatch) => {
    apiService.deleteDomain(id)
        .then((response) => dispatch(deleteDomainAction(id)))
        .catch((err) => dispatch(domainsRequestError(err)))
}




export {
    fetchDomains,
    addDomainToList,
    deleteDomain,
    removeDomainFromList,
    fetchMore,
}