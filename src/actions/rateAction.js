import api from "../apis/api";
import { rateConstant } from "./constants";

export const rateCalculate = (formValues) => async (dispatch) => {
  dispatch({ type: `${rateConstant.FETCH_RATE}_REQUEST` });
  // dispatch({
  //   type: `${rateConstant.FETCH_RATE}_SUCESS`,
  //   payload: null,
  // });
  try {
    console.log(formValues);
    const { pincodeDestination, pincodeOrigin, weight } = formValues;
    const destination = await api.get(`/pincode/${pincodeDestination}`);
    const origin = await api.get(`/pincode/${pincodeOrigin}`);
    console.log(destination.data, origin.data);

    if (destination.data.body.length < 1 || origin.data.body.length < 1) {
      return dispatch({
        type: `${rateConstant.FETCH_RATE}_FAILURE`,
        payload: "Pincode do not exist",
      });
    }
    let area;
    const area1 = destination.data.body[0];
    const area2 = origin.data.body[0];
    if (area1.CITY === area2.CITY) {
      area = "wc";
    } else {
      if (area1.STATE === area2.STATE) {
        area = "ws";
      } else {
        area = "wz";
      }
    }
    console.log(area);
    const rates = await api.get("/rate", {
      params: {
        destinationPincode: pincodeDestination,
        originPincode: pincodeOrigin,
        weight,
        destination: area,
      },
    });

    console.log(rates.data);
    if (rates.data) {
      dispatch({
        type: `${rateConstant.FETCH_RATE}_SUCESS`,
        payload: rates.data,
      });
    } else {
      dispatch({
        type: `${rateConstant.FETCH_RATE}_FAILURE`,
        payload: "Something Went Wrong",
      });
    }
  } catch (error) {
    dispatch({
      type: `${rateConstant.FETCH_RATE}_FAILURE`,
      payload: { error },
    });
  }
};
