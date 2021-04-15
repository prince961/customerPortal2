import { trackConstant } from "../actions/constants";
const initialState = {
  ShipmentData: null,
  fetching: false,
  fetched: false,
  error: null,
};
const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${trackConstant.TRACK_ORDER}_REQUEST`:
      state = { ...state, fetching: true };
      break;
    case `${trackConstant.TRACK_ORDER}_SUCESS`:
      state = {
        ...state,
        fetching: false,
        fetched: true,
        ShipmentData: action.payload,
        error: null,
      };
      break;
    case `${trackConstant.TRACK_ORDER}_FAILURE`:
      state = {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload,
        ShipmentData: null,
      };
      break;
    default:
      return state;
  }
  return state;
};
export default trackReducer;
