import { authConstant } from "./constants";
import authApi from "../apis/auth";
import history from "../util/history";

export const login = (formValues) => async (dispatch) => {
  dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });
  try {
    const response = await authApi.post("/login", formValues);
    const { _id, userName } = response.data.user;
    console.log(response.data);
    const loggedInUser = {
      userId: _id,
      userName,
    };
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    dispatch({
      type: `${authConstant.USER_LOGIN}_SUCCESS`,
      payload: { user: loggedInUser },
    });
    history.push("/");
  } catch (error) {
    dispatch({
      type: `${authConstant.USER_LOGIN}_FAILURE`,
      payload: { error },
    });
  }
};
export const isLoggedIn = () => (dispatch) => {
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  if (user) {
    dispatch({
      type: `${authConstant.USER_LOGIN}_SUCCESS`,
      payload: { user },
    });
  } else {
    dispatch({
      type: `${authConstant.USER_LOGIN}_FAILURE`,
      payload: { error: "Log In Again" },
    });
  }
};
export const logout = () => async (dispatch) => {
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  if (user) {
    dispatch({ type: `${authConstant.USER_LOGOUT}_REQUEST` });

    localStorage.clear();
    dispatch({ type: `${authConstant.USER_LOGOUT}_SUCCESS` });
  } else {
    dispatch({
      type: `${authConstant.USER_LOGOUT}_FAILURE`,
      payload: "User Not Exist",
    });
  }
};
