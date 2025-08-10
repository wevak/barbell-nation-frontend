const initialState = {
  fetching: false,
  package: {},
  error: "",
};

export const package_reducer = (state = initialState, action) => {
  switch (action.type) {
    //User Login
    case "PACKAGE_FETCH_REQUEST":
      return {
        ...state,
        fetching: true,
      };

    case "PACKAGE_FETCH_SUCCESS":
      return {
        ...state,
        fetching: false,
        package: action.payload.package,
      };

    case "PACKAGE_FETCH_FAILURE":
      return {
        ...state,
        fetching: false,
        error: ""
        // authUser: {},
      };

    default:
      return state;
  }
};
