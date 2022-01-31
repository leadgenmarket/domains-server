const updateOrganizationsList = (state, action) => {

    if (state === undefined) {
        return {
            organizations: null,
            loading: false,
            error: false,
        };
    }

    switch (action.type) {
        case 'ORGANIZATIONS_REQUESTED':
            return {
                organizations: null,
                loading: true,
                error: false,
            };
        case 'ORGANIZATIONS_FETCH_SUCCESS':
            return {
                organizations: action.payload,
                loading: false,
                error: false,
            };
        case 'ORGANIZATIONS_ERROR':
            return {
                organizations: state.organizationsList.organizations,
                loading: false,
                error: true,
            };
        case 'ORGANIZATION_DELETE_ONE':
            return {
                organizations: state.organizationsList.organizations,
                loading: false,
                error: true,
            };
        case 'ORGANIZATION_UPDATE':
            return {
                organizations: state.organizationsList.organizations,
                loading: false,
                error: true,
            };
        default:
            return state.organizationsList;
    }
};

export default updateOrganizationsList;