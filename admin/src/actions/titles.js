const titlesRequested = () => {
    return {
        type: 'TITLES_REQUESTED',
    }
}

const titlesLoaded = (domains) => {
    return {
        type: 'TITLES_FETCH_SUCCESS',
        payload: domains
    }
}

const titlesError = (data) => {
    return {
        type: 'TITLES_ERROR',
        payload: data
    }
}

const deleteTitleAction = (id) => {
    return {
        type: 'TITLE_DELETE_ONE',
        payload: id
    }
}

const titleUpdateAction = (data) => {
    return {
        type: 'TITLE_UPDATE',
        payload: data,
    }
}

const fetchTitles = (apiService) => () => (dispatch) => {
    dispatch(titlesRequested)
    apiService.titlesList()
        .then((response) => dispatch(titlesLoaded(response.data)))
        .catch((err) => dispatch(titlesError(err)))
}

const deleteTitle = (apiService) => (id) => (dispatch) => {
    apiService.deleteTitle(id)
        .then((response) => dispatch(deleteTitleAction(id)))
        .catch((err) => dispatch(titlesError(err)))
}

const updateTilte = (apiService) => (data) => (dispatch) => {
    apiService.updateTilte(data)
        .then((response) => dispatch(titleUpdateAction(response.data)))
        .catch((err) => dispatch(titlesError(err)))
}

export {
    fetchTitles,
    deleteTitle,
    updateTilte
}