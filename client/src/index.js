import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // provider is the bridge of react and redux
import { createStore , applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';



import App from './components/App';
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//create redux store return reducers, initial state with an empty object

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
    );
