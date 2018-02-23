import React, {Component} from 'react';


class ChatBar extends Component {

  // creates default state, which is a blank input field
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Anon',
      messageText: ''
    };
  }

  // changes state on current User
  onUserChange(event) {
    this.setState({userName: event.target.value});
  }

  onUserKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newUser(this.state.userName);
      this.setState({userName: event.target.value});
    }
  }

  // changes state on text change  
  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }
  
  
  // changes state on key press to new message state
  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      // this.props.newUser(this.state.userName)
      this.props.newMessage(this.state.messageText);
      this.setState({messageText: ''});
    }
  }

  render(){

    // console.log('this is the current state: ' + this.state.userName)
    // console.log(this.props.newUser)
    return(
      <footer className="chatbar">
        <input 
          value={this.state.userName}
          onChange={this.onUserChange.bind(this)}
          onKeyPress={this.onUserKeyPress.bind(this)}
          className="chatbar-username" 
          placeholder="Your Name (Optional)" />
        <input
          value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          onKeyPress={this.onMessageKeyPress.bind(this)} 
          className="chatbar-message"
          placeholder="Enter your message here!" />
      </footer>
    );
  }
}

export default ChatBar;