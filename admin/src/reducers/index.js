import updateAuthStatus from "./updateAuthStatus";
import updateDomainDetail from "./updateDomainDetail";
import updateDomainsList from "./updateDomainsList";
import updateTitlesList from "./updateTitles";


const reducer = (state, action) => {
    return {
        authStatus: updateAuthStatus(state, action),
        domainsList: updateDomainsList(state, action),
        domainDetail: updateDomainDetail(state, action),
        titlesList: updateTitlesList(state, action)
    }
}

export default reducer;