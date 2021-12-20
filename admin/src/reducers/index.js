import updateAuthStatus from "./updateAuthStatus";
import updateObjectsList from "./updateObjectsList";


const reducer = (state, action) => {
    return {
        authStatus: updateAuthStatus(state, action),
    }
}

export default reducer;