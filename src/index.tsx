import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import {store} from './app/store'
import { fetchImmobiles } from './reducers/immobiles/immobilesSlice';
import { fetchResidents } from './reducers/residents/residentsSlice';

store.dispatch(fetchImmobiles())
store.dispatch(fetchResidents())

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
