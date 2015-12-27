require('./css/main.scss');
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Main from './components/main'
import List from './components/List'
import NewList from './components/NewList'
import { Router, Route, IndexRoute } from 'react-router'
  
//Needed for React Developer Tools
window.React = React;

injectTapEventPlugin();

//render(<Main />,document.getElementById('app'));

render((
	<Router>
	    <Route path="/" component={Main} >
	      	<IndexRoute component={NewList} />
            <Route path="/list" component={List} />
	    </Route>
	</Router>
),document.getElementById('app'))
