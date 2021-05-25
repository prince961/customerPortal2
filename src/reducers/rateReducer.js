import { rateConstant } from "../actions/constants";
const initialState = {
  rate: null,
  fetching: false,
  fetched: false,
  error: null,
};
const rateReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${rateConstant.FETCH_RATE}_REQUEST`:
      state = { ...state, fetching: true };
      break;
    case `${rateConstant.FETCH_RATE}_SUCESS`:
      state = {
        ...state,
        fetching: false,
        fetched: true,
        rate: action.payload,
        error: null,
      };
      break;
    case `${rateConstant.FETCH_RATE}_FAILURE`:
      state = {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload,
        rate: null,
      };
      break;
    default:
      return state;
  }
  return state;
};
export default rateReducer;
