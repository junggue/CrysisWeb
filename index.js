import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './src/components/App.jsx';
import AdminLogin from './src/components/AdminLogin.jsx';
import AdminHome from './src/components/AdminHome.jsx';
import auth from './src/components/auth.js';

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


render((
	<Router>
		<Route path="/" component={App}>
		<Route path="/AdminLogin" component={AdminLogin}/>
		<Route path="/AdminHome" component={AdminHome} onEnter={requireAuth}/>
		</Route>
	</Router>
), document.getElementById('app'));