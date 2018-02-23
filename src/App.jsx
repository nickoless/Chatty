import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anon',
      messages: [],
      userCount: 0
    };
  }
  
  newMessage(messageText) {
    const newMessageObject = {
      type: 'postMessage',
      user: this.state.currentUser,
      text: messageText
    };
    // Message sent from client to server
    this.socket.send(JSON.stringify(newMessageObject));
  }

  newUser(userName) {
    // console.log('current: ' + this.state.currentUser)
    // console.log('new: ' + newUserObject.newUser)
    if (this.state.currentUser !== userName) {
      const newUserMessage = {
        old: this.state.currentUser,
        new: userName,
        type: 'newUser'
      };
      this.setState({currentUser: userName});
      this.socket.send(JSON.stringify(newUserMessage));
    }
  }

  // userCount

componentDidMount() {
  // console.log("componentDidMount <App />");
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, type: 'incomingMessage', user: "Michelle", text: "Hello, you're terrific"};
  //   const messages = this.state.messages.concat(newMessage)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages});
  // }, 1000);

  this.socket = new WebSocket('ws://localhost:3001');

  this.socket.onopen = (event) => {
    console.log('Connected to server!')
  };        

  this.socket.onmessage = (event) => {

    let incomingMessage = JSON.parse(event.data);

    if (incomingMessage.type === 'countUpdate') {
      const updateUserCount = this.setState({userCount: incomingMessage.count});
    }

    const newMessages = this.state.messages.concat(incomingMessage);

    this.setState({
      messages: newMessages,
    });
  };
  this.socket.onclose = (event) => {
  };
}
  
  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount}/>
        <MessageList user={this.state.user} messages={this.state.messages} />
        <ChatBar newUser={this.newUser.bind(this)} newMessage={this.newMessage.bind(this)} />
      </div>
    );
  }
}

export default App;