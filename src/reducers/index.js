import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userOrders from "./userOrdersReducer";
import trackReducer from "./trackReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  userOrders: userOrders,
  trackData: trackReducer,
});
export default rootReducer;
