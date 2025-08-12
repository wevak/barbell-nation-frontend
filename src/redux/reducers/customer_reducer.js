const initialState = {
  fetching: false,
  customer: {},
  error: "",
};

export const customer_reducer = (state = initialState, action) => {
  switch (action.type) {
  
    case "CUSTOMER_REGISTER_REQUEST":
      return {
        ...state,
        fetching: true,
      };

    case "CUSTOMER_REGISTER_SUCCESS":
      return {
        ...state,
        fetching: false,
        customer: action.payload.user,
      };

    case "CUSTOMER_REGISTER_FAILURE":
      return {
        ...state,
        fetching: false,
        error: ""
      };

    default:
      return state;
  }
};
