const initialState = {
    authenticated: false,
    authUser: {},
    fetching: false,
    token: false,
    error: '',
}

export const auth_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                fetching: true,
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                fetching: false,
                authUser: action.payload.user,
                token: action.payload.jwt
            }
        
        case "LOGIN_FAILURE":
            return {
                ...state,
                loading: false,
                authUser: {}
            }

        default:
            return state;
    }
}