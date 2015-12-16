import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

export default class Users extends React.Component{
    render() {
      return (
            <div>
              <h1>Users</h1>
              <div className="master">
                <ul>
                    <li><Link to={`/user/1`}>LBJ</Link></li>
                </ul>
              </div>
              <div className="detail">
                Bello
              </div>
            </div>
      );
    }
}