import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import { Provider } from 'react-redux';
import store from './redux/store';

import BookManagementApp from './BookManagementApp';

ReactDOM.render(
  <Provider store={store}>
    <BookManagementApp />
  </Provider>,
  document.getElementById('root'),
);
