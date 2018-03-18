import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './Reducers';
import ParamPage from './ParamPage';
import ResultPage from './ResultPage';

const store = createStore(reducer, 
    composeWithDevTools(applyMiddleware(thunk)));



ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={ParamPage} />
                <Route path="/result" component={ResultPage} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
