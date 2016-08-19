import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './src/components/App.jsx';
import AdminLogin from './src/components/AdminLogin.jsx';
import AdminHome from './src/components/AdminHome.jsx';

render((
	<Router>
		<Route path="/" component={App}/>
		<Route path="/AdminLogin" component={AdminLogin}/>
		<Route path="/AdminHome" component={AdminHome}/>
	</Router>
), document.getElementById('app'));