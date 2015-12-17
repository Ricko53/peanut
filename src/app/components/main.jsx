import React from 'react'
import ReactDOM from 'react-dom'
import kit from './ReactKit'
import { Box, Item } from 'react-polymer-layout'
import onEndTransition from './TransitionEnd'

export default class Main extends React.Component{
    render() {
      return (
          <Box centerJustified>
          	{this.props.children}
          </Box>
      );
    }
}