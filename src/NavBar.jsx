// importing a single export from a module, e.g. import {myExport} from '/modules/my-module.js'

import React, {Component} from 'react';

// THE RITUAL

class NavBar extends Component {
  render () {

    const userCheck = this.props.userCount


   const typeConfirm = () => {
      if (userCheck.type === 'countUpdate') {
        return {userCheck};
      }
    };

    // bug - user count only works on first refresh. Everytime a message is sent, it tries to pull in a new object and loses value

    return (
      <nav className="navbar">
       <a href="/" className="navbar-brand">ISeeQueue</a>
       <span className="navbar-count">{userCheck.count} users online</span>
      </nav>
    );
  }
}

export default NavBar;

