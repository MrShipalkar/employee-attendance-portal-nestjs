import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './App';

import { store } from './redux/store';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(
  document.getElementById('root'),
).render(
  <React.StrictMode>
<CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
);