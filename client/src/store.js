import { createStore,combineReducers, applyMiddleware } from "redux";
import {userRegisterReducer,userLoginReducer } from './Reducers/userReducers'
import {taskReducer} from './Reducers/taskReducers'
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    userRegisterReducer,
    userLoginReducer,
    taskReducer,
})
export const store = createStore(rootReducer,applyMiddleware(thunk));
 