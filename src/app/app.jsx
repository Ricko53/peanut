require('./css/main.scss');
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Main from './components/main'
import List from './components/List'
import New from './components/New'
import NewList from './components/NewList'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
  
//Needed for React Developer Tools
window.React = React;

injectTapEventPlugin();

//render(<Main />,document.getElementById('app'));

render((
	<Router history={browserHistory}>
	    <Route path="/" component={Main} >
	      	<IndexRoute component={New} />
            <Route path="list" component={List} />
            <Route path="new" component={NewList} />
	    </Route>
	</Router>
),document.getElementById('app'))
