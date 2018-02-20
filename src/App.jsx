import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [
          {
            id: 1,
            type: 'user',
            user: 'Bob',
            text: 'Has anyone seen my marbles?'
          }, {
            id: 2,
            type: 'user',
            user: 'Anon',
            text: 'No, I think you lost them. You lost your marbles Bob. You lost the for good.'
          }     
      ]
    };
  }
  
  newMessage(messageText, userName) {
    const newMessageObject = {
      id: Math.random(),
      type: 'user',
      user: userName,
      text: messageText
    };
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({
      messages: newMessages
    });
  }

  // in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, type: 'user', user: "Michelle", text: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
    console.log(this.state.messages)
  }, 3000);
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