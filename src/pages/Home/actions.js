import { ADD_TODO, CLEAR_COMPLETE, COMPLETE_TODO, DELETE_TODO, GET_TODO, UPDATE_TODO } from './constant';

export const addTodo = (data) => ({
  type: ADD_TODO,
  data,
});
export const getTodo = () => ({
  type: GET_TODO,
});
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id,
});
export const completeTodo = (id) => ({
  type: COMPLETE_TODO,
  id,
});
export const clearComplete = () => ({
  type: CLEAR_COMPLETE,
});
export const updateTodo = (data) => ({
  type: UPDATE_TODO,
  data,
});
