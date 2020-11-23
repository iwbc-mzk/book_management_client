/* eslint
    import/extensions:0,
    import/no-unresolved: 0,
    no-underscore-dangle: 0
*/
import { createStore } from 'redux';
import bookManagementReducer from './reducers/bookManagementReducer';

export default createStore(
  bookManagementReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
