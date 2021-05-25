import userOrderApi from "../apis/userOrder";
import { userOrderConstant } from "./constants";
export const userOrdersFetch = (userId) => async (dispatch) => {
  dispatch({ type: `${userOrderConstant.USER_ORDERS_FETCH}_REQUEST` });
  try {
    const response = await userOrderApi.get(`/user/${userId}`, {});

    dispatch({
      type: `${userOrderConstant.USER_ORDERS_FETCH}_SUCESS`,
      payload: response.data.orders,
    });
  } catch (error) {
    dispatch({
      type: `${userOrderConstant.USER_ORDERS_FETCH}_FAILURE`,
      payload: { error },
    });
  }
};
