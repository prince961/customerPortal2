import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userOrders from "./userOrdersReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  userOrders: userOrders,
});
export default rootReducer;
