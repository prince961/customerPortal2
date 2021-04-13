import { userOrderConstant } from "../actions/constants";
const initialState = {
  orders: null,
  fetching: false,
  error: null,
};
const userOrders = (state = initialState, action) => {
  switch (action.type) {
    case `${userOrderConstant.USER_ORDERS_FETCH}_REQUEST`:
      state = { ...state, fetching: true };
      break;
    case `${userOrderConstant.USER_ORDERS_FETCH}_SUCESS`:
      state = { ...state, fetching: false, orders: action.payload };
      break;
    case `${userOrderConstant.USER_ORDERS_FETCH}_FAILURE`:
      state = { ...state, error: "Error in fetching" };
      break;
    default:
      return state;
  }
  return state;
};
export default userOrders;
