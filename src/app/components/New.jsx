import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

export default class New extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loopsRemaining: 'apple',
    }

    render() {
      return (
          <div><Link to={`new`}>Hello</Link></div>
      );
    }
}