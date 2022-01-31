const organizationsRequested = () => {
    return {
        type: 'ORGANIZATIONS_REQUESTED',
    }
}

const organizationsLoaded = (domains) => {
    return {
        type: 'ORGANIZATIONS_FETCH_SUCCESS',
        payload: domains
    }
}

const organizationsError = (data) => {
    return {
        type: 'ORGANIZATIONS_ERROR',
        payload: data
    }
}

const deleteOrganizationAction = (id) => {
    return {
        type: 'ORGANIZATION_DELETE_ONE',
        payload: id
    }
}

const updateOrganizationAction = (data) => {
    return {
        type: 'ORGANIZATION_UPDATE',
        payload: data,
    }
}

const fetchOrganizations = (apiService) => () => (dispatch) => {
    dispatch(organizationsRequested)
    apiService.organizationsList()
        .then((response) => dispatch(organizationsLoaded(response.data)))
        .catch((err) => dispatch(organizationsError(err)))
}

const deleteOrganization = (apiService) => (id) => (dispatch) => {
    apiService.deleteTitle(id)
        .then((response) => dispatch(deleteOrganizationAction(id)))
        .catch((err) => dispatch(organizationsError(err)))
}

const updateOrganization = (apiService) => (data) => (dispatch) => {
    apiService.updateTilte(data)
        .then((response) => dispatch(updateOrganizationAction(response.data)))
        .catch((err) => dispatch(organizationsError(err)))
}

export {
    fetchOrganizations,
    deleteOrganization,
    updateOrganization
}