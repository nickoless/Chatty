import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'KDot'},
      messages: [
          {
            type: 'user',
            username: 'Bob',
            text: 'Has anyone seen my marbles?'
          }, {
            type: 'user',
            username: 'Anon',
            text: 'No, I think you lost them. You lost your marbles Bob. You lost the for good.'
          }     
      ]
    };
  }
  
  newMessage(messageText) {
    const newMessageObject = {
      id: Math.random(),
      type: 'user',
      username: this.state.user,
      text: messageText
    };
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({
      messages: newMessages
    });
  }
  
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar newMessage={this.newMessage.bind(this)} />
      </div>
    );
  }
}

export default App;