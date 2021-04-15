import trackApi from "../apis/track";
import { trackConstant } from "./constants";
export const trackOrder = (formValues) => async (dispatch) => {
  dispatch({ type: `${trackConstant.TRACK_ORDER}_REQUEST` });
  try {
    const { waybill } = formValues;
    const response = await trackApi.get(``, { params: { waybill: waybill } });
    if (response.data.data.Error) {
      dispatch({
        type: `${trackConstant.TRACK_ORDER}_FAILURE`,
        payload: response.data.data.Error,
      });
    } else {
      console.log("no error");
      dispatch({
        type: `${trackConstant.TRACK_ORDER}_SUCESS`,
        payload: response.data.data.ShipmentData,
      });
    }
  } catch (error) {
    dispatch({
      type: `${trackConstant.TRACK_ORDER}_FAILURE`,
      payload: { error },
    });
  }
};
