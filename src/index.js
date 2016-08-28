import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './component/container/Home';
import Dashboard from './component/container/Dashboard';
import Store from './component/container/Store';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const AppRouter = () => (
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
      <Route path="/users/:userId/dashboard" component={Dashboard}/>
      <Route path="/users/:userId/stores/:storeId" component={Store}/>
    </Router>
);

ReactDOM.render(
    <MuiThemeProvider>
      <AppRouter/>
    </MuiThemeProvider>,

    document.getElementById('root')
);
