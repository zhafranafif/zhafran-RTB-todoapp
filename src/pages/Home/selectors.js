import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectClientState = (state) => state.todo || initialState;

export const selectTodo = createSelector(selectClientState, (state) => state.data);
export const selectActive = createSelector(selectClientState, (state) => state.active);
export const selectComplete = createSelector(selectClientState, (state) => state.complete);
