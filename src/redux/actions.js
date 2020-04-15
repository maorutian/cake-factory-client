import {SET_HEADER_TITLE, RECEIVE_LOGIN_USER, SHOW_ERROR_MSG, LOGOUT} from "./types"
import {reqLogin} from "../api";
import decode from "jwt-decode";

//change title in header
export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, data: headerTitle});

//login and receive user
export const receiveUser = (loginUser) => ({type: RECEIVE_LOGIN_USER, loginUser});

//display error msg
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg});

//login ajax
export const login = (username, password) => {
  return async dispatch => {
    reqLogin(username, password)
      .then(response => {
        sessionStorage.setItem('token', response.data.token);
        let loginUser = decode(response.data.token);
        dispatch(receiveUser(loginUser));
      })
      .catch(error => {
        let errorMsg = "";
        if (error.response) {
          errorMsg = `Error ${error.response.status} : ${error.response.data.errors[0].msg}`;
        } else {
          errorMsg = `Response Error ${error.message}`;
        }
        dispatch(showErrorMsg(errorMsg))
      });
  }
};

//logout
export const logout = () => {
  //delete token from sessionStorage
  sessionStorage.removeItem('token');
  return {type: LOGOUT}
};