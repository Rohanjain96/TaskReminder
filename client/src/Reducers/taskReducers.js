import {
    TASKS_UPDATE_REQUEST,
    TASKS_UPDATE_SUCCESS,
    TASKS_UPDATE_FAIL,
    TASKS_CREATE_FAIL,
    TASKS_CREATE_REQUEST,
    TASKS_CREATE_SUCCESS,
    TASKS_DELETE_FAIL,
    TASKS_DELETE_REQUEST,
    TASKS_DELETE_SUCCESS,
    TASKS_LIST_FAIL,
    TASKS_LIST_REQUEST,
    TASKS_LIST_SUCCESS,
  } from "../Constants/taskConstant";

  const initialTaskState = {
    loading: false,
    taskListarray: [] 
  }
  
  export const taskReducer = (state = initialTaskState, action) => {
    switch (action.type) {
      case TASKS_LIST_REQUEST:
        return { ...state,taskListarray:[] };
      case TASKS_LIST_SUCCESS:
        return { ...state,taskListarray: [...action.payload] };
      case TASKS_LIST_FAIL:
        return { ...state, error: action.payload };
  
      case TASKS_CREATE_REQUEST:
        return { ...state};
      case TASKS_CREATE_SUCCESS:
        return { ...state, taskListarray: [{...action.payload},...state.taskListarray] };
      case TASKS_CREATE_FAIL:
        return { ...state, error: action.payload };

      case TASKS_DELETE_REQUEST:
        return { ...state };
      case TASKS_DELETE_SUCCESS:{
        const newtaskListarray = state.taskListarray.filter((task) => task._id !== action.payload)
        return { ...state,taskListarray:newtaskListarray };
      }
      case TASKS_DELETE_FAIL:
        return { ...state, error: action.payload };

      case TASKS_UPDATE_REQUEST:
        return { ...state };
      case TASKS_UPDATE_SUCCESS:{
        const newtaskListarray = state.taskListarray.map((task) =>{
          if(task._id !== action.payload._id)
          return { ...task}
          else{
            return { ...task, ...action.payload}
          }
        })
        return { ...state, taskListarray:newtaskListarray };
      }
      case TASKS_UPDATE_FAIL:
        return { ...state, error: action.payload};
  
      default:
        return state;
    }
  };