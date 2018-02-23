// importing a single export from a module, e.g. import {myExport} from '/modules/my-module.js'

import React, {Component} from 'react';

class NavBar extends Component {
  render () {
    let userPlural = 'users'
    if (this.props.userCount <= 1) {
      userPlural = 'user';
    } 
    return (
      <nav className="navbar">
       <a href="/" className="navbar-brand">Chatty</a>
       <span className="navbar-count">{this.props.userCount} {userPlural} chatting</span>
      </nav>
    );
  }
}

export default NavBar;

