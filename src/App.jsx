import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [],
      userCount: 0
    };
  }
  
  newMessage(messageText, userName) {
    const newMessageObject = {
      type: 'postMessage',
      user: userName,
      text: messageText
    };

    // Message sent from client to server
    this.socket.send(JSON.stringify(newMessageObject));
  }

  // userCount

componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, type: 'incomingMessage', user: "Michelle", text: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 1000);

  // Connect to socket
  this.socket = new WebSocket('ws://localhost:3001');

  // Confirmation of connection
  this.socket.onopen = (event) => {
    console.log('Connected to server!')
  };        

  // Message broadcasted back from server
  this.socket.onmessage = (event) => {

  // JSON.parse(event.data);

  let inMessage = JSON.parse(event.data);
  console.log('Message from server: ', inMessage);

   // updates the user count
    const updateUserCount = this.setState({userCount: inMessage})

    // console.log('This is the user count: ' + this.state.userCount)

    const newMessages = this.state.messages.concat(inMessage);
        this.setState({
          messages: newMessages
        });
    };

    this.socket.onclose = (event) => {
      this.setState({userCount:inMessage})
    }
}
  
  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} />
        <ChatBar newMessage={this.newMessage.bind(this)} />
      </div>
    );
  }
}

export default App;