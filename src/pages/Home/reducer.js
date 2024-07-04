import { produce } from 'immer';
import { ADD_TODO, CLEAR_COMPLETE, COMPLETE_TODO, DELETE_TODO, GET_TODO, UPDATE_TODO } from './constant';

export const initialState = {
  data: [],
};
export const storedKey = ['data', 'theme'];

const HomeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_TODO:
        draft.data = [...draft.data, action.data];
        break;
      case GET_TODO:
        draft.data = action.data;
        break;
      case DELETE_TODO:
        draft.data = draft.data.filter((item) => item.id !== action.id);
        break;
      case COMPLETE_TODO:
        draft.data = draft.data.filter((item) => {
          if (item.id === action.id) {
            item.completed = !item.completed;
          }
          return item;
        });
        break;
      case CLEAR_COMPLETE:
        draft.data = draft.data.filter((item) => item.completed !== true);
        break;
      case UPDATE_TODO:
        draft.data = action.data;
        break;
    }
  });

export default HomeReducer;
