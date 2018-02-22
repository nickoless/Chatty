// importing a single export from a module, e.g. import {myExport} from '/modules/my-module.js'

import React, {Component} from 'react';

// THE RITUAL

class NavBar extends Component {
  render () {
    return (
      <nav className="navbar">
       <a href="/" className="navbar-brand">ISeeQueue</a>
      </nav>
    );
  }
}

export default NavBar;

