import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Import redux-thunk
import logger from 'redux-logger';
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunk,logger]) // Include thunk in the middleware
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
