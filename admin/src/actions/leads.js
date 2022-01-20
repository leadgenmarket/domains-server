const leadsRequested = () => {
    return {
        type: 'LEADS_REQUESTED',
    }
}

const leadsRequestSuccess = (leads) => {
    return {
        type: 'LEADS_FETCH_SUCCESS',
        payload: leads
    }
}

const leadsRequestMoreSuccess = (leads) => {
    return {
        type: 'LEADS_GET_MORE',
        payload: leads
    }
}

const leadsRequestError = () => {
    return {
        type: 'LEADS_FETCH_ERROR',
    }
}

const deleteLeadAction = (id) => {
    return {
        type: 'LEADS_DELETE_ONE',
        payload: id
    }
}

const addLeadToList = (domain) => {
    return {
        type: 'LEADS_ADD_ONE',
        payload: domain
    }
}

const removeLeadFromList = (id) => {
    return {
        type: 'LEADS_REMOVE_ONE',
        payload: id
    }
}

const fetchLeads = (apiService) => (searchUrl, cursor, itemscnt) => (dispatch) => {
    dispatch(leadsRequested)
    apiService.leadsList(searchUrl, cursor, itemscnt)
        .then((response) => dispatch(leadsRequestSuccess(response.data)))
        .catch((err) => dispatch(leadsRequestError(err)))
}

const fetchMoreLeads = (apiService) => (searchUrl, cursor, itemscnt) => (dispatch) => {
    dispatch(leadsRequested)
    apiService.leadsList(searchUrl, cursor, itemscnt)
        .then((response) => dispatch(leadsRequestMoreSuccess(response.data)))
        .catch((err) => dispatch(leadsRequestError(err)))
}

const deleteLead = (apiService) => (id) => (dispatch) => {
    apiService.deleteLead(id)
        .then((response) => dispatch(deleteLeadAction(id)))
        .catch((err) => dispatch(leadsRequestError(err)))
}




export {
    fetchLeads,
    addLeadToList,
    deleteLead,
    removeLeadFromList,
    fetchMoreLeads
}