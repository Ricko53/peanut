const React = require('react');
const ReactDOM = require('react-dom');
const kit = require('./ReactKit');
const onEndTransition = require('./TransitionEnd');

const Main = React.createClass({
    render() {
      return (
          <div>Hello</div>
      );
    },
});

module.exports = Main;