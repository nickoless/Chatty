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
      userCount: 0,
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

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      const newMessage = {id: 3, type: 'incomingMessage', user: "Mr. Chat", text: "Hey there, welcome to Chatty!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages});
    }, 1000);

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
      console.log('Connected to server!')
    };        

    this.socket.onmessage = (event) => {
      let broadcastedMessage = JSON.parse(event.data);

      if (broadcastedMessage.type === 'countUpdate') {
        const updateUserCount = this.setState({userCount: broadcastedMessage.count});
      }
      if (broadcastedMessage.type === 'incomingMessage') {
        const newMessage = this.state.messages.concat(broadcastedMessage);
        this.setState({messages: newMessage});
      }
      if (broadcastedMessage.type === 'incomingNotification') {
        const newNotification = this.state.messages.concat(broadcastedMessage);
        this.setState({messages: newNotification});
      }
    };
    this.socket.onclose = (event) => {
    };
  }
    
  render() {
    return (
      <div key={'test'}>
        <NavBar userCount={this.state.userCount}/>
        <MessageList user={this.state.user} messages={this.state.messages} />
        <ChatBar newUser={this.newUser.bind(this)} newMessage={this.newMessage.bind(this)} />
      </div>
    );
  }
}

export default App;