require('./css/main.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const injectTapEventPlugin = require('react-tap-event-plugin');
const Main = require('./components/main.jsx');
  
//Needed for React Developer Tools
window.React = React;

injectTapEventPlugin();

ReactDOM.render(<Main />,document.getElementById('app'));
