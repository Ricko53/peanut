import React from 'react'
import ReactDOM from 'react-dom'
import kit from './ReactKit'
import onEndTransition from './TransitionEnd'

export default class Main extends React.Component{
    render() {
      return (
          <div>Hello
          {this.props.children}
          </div>
      );
    }
}