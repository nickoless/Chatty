import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Anon',
      messageText: ''
    };
  }
  onUserChange(event) {
    this.setState({userName: event.target.value});
  }
  onUserKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newUser(this.state.userName);
      this.setState({userName: event.target.value});
    }
  }
  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }
  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.messageText);
      this.setState({messageText: ''});
    }
  }

  render(){
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