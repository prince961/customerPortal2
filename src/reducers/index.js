import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userOrders from "./userOrdersReducer";
import trackReducer from "./trackReducer";
import rateReducer from "./rateReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  userOrders: userOrders,
  trackData: trackReducer,
  rateData: rateReducer,
});
export default rootReducer;
