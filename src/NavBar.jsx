// importing a single export from a module, e.g. import {myExport} from '/modules/my-module.js'

import React, {Component} from 'react';

// THE RITUAL

class NavBar extends Component {
  render () {

    const userCheck = this.props.userCount
    console.log(typeof userCheck)



    return (
      <nav className="navbar">
       <a href="/" className="navbar-brand">ISeeQueue</a>
       <span className="navbar-count">{userCheck} users online</span>
      </nav>
    );
  }
}

export default NavBar;

