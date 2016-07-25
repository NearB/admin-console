import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'

import Home from './component/container/Home';
import Dashboard from './component/container/Dashboard';


ReactDOM.render(
    // <App />,
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
      <Route path="/users/:userId/dashboard" component={Dashboard} />
    </Router>,
    document.getElementById('root')
);
