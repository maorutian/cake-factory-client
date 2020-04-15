import {combineReducers} from 'redux';
import {SET_HEADER_TITLE, RECEIVE_LOGIN_USER, SHOW_ERROR_MSG, LOGOUT} from "./types"


//title in header component
const initHeaderTitle = 'Home';

function headerTitle(state = initHeaderTitle, action) {
  console.log('headerTitle()', state, action);
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data;
    default:
      return state;
  }
}

//login user
let initLoginUser = {};
function loginUser(state = initLoginUser, action) {
  console.log('loginUser()', state, action);
  switch (action.type) {
    case RECEIVE_LOGIN_USER:
      return action.loginUser;
    case SHOW_ERROR_MSG:
      return {...state, errorMsg: action.errorMsg};
    case LOGOUT:
      return {};
    default:
      return state
  }
}

export default combineReducers({headerTitle, loginUser});