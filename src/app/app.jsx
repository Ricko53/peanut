require('./css/main.scss');
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Main from './components/main'
import About from './components/About'
import Users from './components/Users'
import User from './components/User'
import { Router, Route } from 'react-router'
  
//Needed for React Developer Tools
window.React = React;

injectTapEventPlugin();

//render(<Main />,document.getElementById('app'));

render((
	<Router>
	    <Route path="/" component={Main} >
	      <Route path="about" component={About}/>
	      <Route path="users" component={Users}/>
	        <Route path="user/1" component={User}/>
	    </Route>
	</Router>
),document.getElementById('app'))
