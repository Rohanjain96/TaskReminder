import {
    TASKS_CREATE_FAIL,
    TASKS_CREATE_REQUEST,
    TASKS_CREATE_SUCCESS,
    TASKS_DELETE_FAIL,
    TASKS_DELETE_REQUEST,
    TASKS_DELETE_SUCCESS,
    TASKS_LIST_FAIL,
    TASKS_LIST_REQUEST,
    TASKS_LIST_SUCCESS,
    TASKS_UPDATE_FAIL,
    TASKS_UPDATE_REQUEST,
    TASKS_UPDATE_SUCCESS,
  } from "../Constants/taskConstant.js";
  import axios from "axios";
  
  export const listTasks = () => async (dispatch) => {
    try {
      dispatch({
        type: TASKS_LIST_REQUEST,
      });

      const { data } = await axios.get("http://localhost:5000/tasks/readtask", { withCredentials: true, credentials: "include" });
      dispatch({
        type: TASKS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TASKS_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createTaskAction = (title, content) => async (dispatch) => {
    try {
      dispatch({
        type: TASKS_CREATE_REQUEST,
      });

      const { data } = await axios.post("http://localhost:5000/tasks/createtask",{ title, content },{ withCredentials: true, credentials: "include" });
  
      dispatch({
        type: TASKS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TASKS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteTaskAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TASKS_DELETE_REQUEST,
      });
  
      await axios.delete(`http://localhost:5000/tasks/${id}`, { withCredentials: true, credentials: "include" });
      dispatch({
        type: TASKS_DELETE_SUCCESS,
        payload: id,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TASKS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateTaskAction = (id, title, content) => async (
    dispatch
  ) => {
    try {
      dispatch({
        type: TASKS_UPDATE_REQUEST,
      });
  
      const { data } = await axios.patch(
        `http://localhost:5000/tasks/${id}`,
        { title, content },
        { withCredentials: true, credentials: "include" }
      );
  
      dispatch({
        type: TASKS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TASKS_UPDATE_FAIL,
        payload: message,
      });
    }
  };