import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../Constants/userConstants";

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  try{
    await axios.delete(
      'http://localhost:5000/user/removecookie',
      { withCredentials: true, credentials: "include" }
    );
  }
  catch(error){
    console.log(error)
  }

}


export function USERLOGINREQUEST() {
  return { type: USER_LOGIN_REQUEST }
}
export function USERLOGINSUCCESS(data) {
  return { type: USER_LOGIN_SUCCESS, payload: data }
}
export function USERLOGINFAIL(error) {
  return {
    type: USER_LOGIN_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  }
}
export function USERREGISTERREQUEST() {
  return { type: USER_REGISTER_REQUEST }
}
export function USERREGISTERSUCCESS(data) {
  return { type: USER_REGISTER_SUCCESS, payload: data }
}
export function USERREGISTERFAIL(error) {
  return {
    type: USER_REGISTER_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  }
}