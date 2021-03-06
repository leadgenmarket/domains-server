import updateAuthStatus from "./updateAuthStatus";
import updateDomainDetail from "./updateDomainDetail";
import updateDomainsList from "./updateDomainsList";
import updateLeadsList from "./updateLeadsList";
import updateOrganizationsList from "./updateOrganizations";
import updateTitlesList from "./updateTitles";
import updatePricesList from "./updatePrices";


const reducer = (state, action) => {
    return {
        authStatus: updateAuthStatus(state, action),
        domainsList: updateDomainsList(state, action),
        leadsList: updateLeadsList(state, action),
        domainDetail: updateDomainDetail(state, action),
        titlesList: updateTitlesList(state, action),
        organizationsList: updateOrganizationsList(state, action),
        pricesList: updatePricesList(state, action)
    }
}

export default reducer;