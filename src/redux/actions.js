import { SET_BOOK_LIST } from './actionTypes';

export const setBookList = (bookList) => ({
  type: SET_BOOK_LIST,
  payload: {
    bookList,
  },
});
