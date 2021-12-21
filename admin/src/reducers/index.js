import updateAuthStatus from "./updateAuthStatus";
import updateDomainDetail from "./updateDomainDetail";
import updateDomainsList from "./updateDomainsList";


const reducer = (state, action) => {
    return {
        authStatus: updateAuthStatus(state, action),
        domainsList: updateDomainsList(state, action),
        domainDetail: updateDomainDetail(state, action)
    }
}

export default reducer;