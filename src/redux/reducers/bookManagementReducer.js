import { SET_BOOK_LIST } from '../actionTypes';

const initialState = {
  bookList: [],
};

function bookManagementReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOK_LIST: {
      return {
        ...state,
        bookList: action.payload.bookList,
      };
    }
    default: {
      return state;
    }
  }
}

export default bookManagementReducer;
