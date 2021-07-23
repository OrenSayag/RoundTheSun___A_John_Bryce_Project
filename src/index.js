import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Redux, {createStore, combineReducers} from 'redux'
import {userInfoReducer, profilePicsReducer} from './redux/reducers'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

const store = createStore(combineReducers({
  userInfo: userInfoReducer,
  profilePicsReducer
}));

ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
