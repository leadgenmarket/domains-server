const pricesRequested = () => {
    return {
        type: 'PRICES_REQUESTED',
    }
}

const pricesRequestSuccess = (prices) => {
    return {
        type: 'PRICES_FETCH_SUCCESS',
        payload: prices
    }
}

const pricesRequestError = () => {
    return {
        type: 'PRICES_FETCH_ERROR',
    }
}

const pricesUpdateRequest = () => {
    return {
        type: 'PRICES_UPDATE_REQUEST',
    }
}

const pricesUpdateSuccess = () => {
    return {
        type: 'PRICES_UPDATE_SUCCESS',
    }
}

const pricesUpdateError = () => {
    return {
        type: 'PRICES_UPDATE_ERROR',
    }
}


const fetchPrices = (apiService) => () => (dispatch) => {
    dispatch(pricesRequested)
    apiService.pricesList()
        .then((response) => {
            dispatch(pricesRequestSuccess(response.data))
        })
        .catch((err) => dispatch(pricesRequestError(err)))
}

const updatePricesList = (apiService) => (pricesList) => (dispatch) => {
    dispatch(pricesUpdateRequest)
    apiService.updatePricesList(pricesList)
        .then((response) => dispatch(pricesUpdateSuccess()))
        .catch((err) => dispatch(pricesUpdateError()))
}




export {
    fetchPrices,
    updatePricesList,
}