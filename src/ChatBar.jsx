import React, {Component} from 'react';


class ChatBar extends Component {

  // creates default state, which is a blank input field
  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    };
  }

  // changes state on text change  
  onMessageTextChange(event) {
    this.setState({messageText: event.target.value})
  }
  
  // changes state on key press to new message state
  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.messageText);
      this.setState({messageText: ''});
    }
  }
  
  
  
  
  
  
  
  
  
  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input
          value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          placeholder="Enter your message here!"
          onKeyPress={this.onMessageKeyPress.bind(this)} />
      </footer>
    );
  }
}

export default ChatBar;