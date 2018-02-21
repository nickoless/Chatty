import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: []
    };
    this.Websocket = this.Websocket.bind(this);
  }
  
  newMessage(messageText, userName) {
    const newMessageObject = {
      id: Math.random(),
      type: 'user',
      user: userName,
      text: messageText
    };

    const user = newMessageObject.user;
    const text = newMessageObject.text;

    
    const newMessages = this.state.messages.concat(newMessageObject);
    // this.setState({
    //   messages: newMessages
    // });

    this.socket.send(JSON.stringify(`User ${user} said ${text}`));
  }

  Websocket() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      // this.socket.send('Hello Server!');
      console.log('Connected to server!')
    };
    // this.socket.onmessage = (event) => {
    //   console.log('Message from server: ', event.data);
    // };
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
  }, 1000);
  this.Websocket()
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