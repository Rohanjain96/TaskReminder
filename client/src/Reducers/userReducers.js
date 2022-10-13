import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
  } from "../Constants/userConstants";

  const initialUserState = {}
  
   const userLoginReducer = (state = initialUserState, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return {};
      case USER_LOGIN_SUCCESS:
        return {  user: action.payload, error:"" };
      case USER_LOGIN_FAIL:
        return { user:"", error: action.payload };
      case USER_LOGOUT:
        return {user:"",error:""};
      default:
        return state;
    }
  };
  
   const userRegisterReducer = (state = initialUserState, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return state;
      case USER_REGISTER_SUCCESS:
        return { user: action.payload, error:"" };
      case USER_REGISTER_FAIL:
        return { user: "", error:action.payload  };
      default:
        return state;
    }
  };

  export { userRegisterReducer,userLoginReducer}