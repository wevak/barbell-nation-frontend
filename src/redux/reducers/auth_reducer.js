const initialState = {
  authenticated: false,
  authUser: {},
  fetching: false,
  token: false,
  ownerId: -1,
  error: "",
};

export const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    //User Login
    case "LOGIN_REQUEST":
      return {
        ...state,
        fetching: true,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        fetching: false,
        authUser: action.payload.user,
        token: action.payload.jwt,
        ownerId: action.payload.ownerId
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        fetching: false,
        authUser: {},
      };

    //Owner Register
    case "REGISTER_REQUEST":
      return {
        ...state,
        fetching: true,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        fetching: false,
        authUser: action.payload.user
      };

    case "REGISTER_FAILURE":
      return {
        ...state,
        fetching: false,
        authUser: {},
      };

    //Logout request
    case "LOGOUT_REQUEST":
        return {
            ...state,
            authUser: {},
            token: ""
        }

    default:
      return state;
  }
};
