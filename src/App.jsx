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
    // this.Websocket = this.Websocket.bind(this);
    // this.newMessage = this.newMessage.bind(this)
  }
  
  newMessage(messageText, userName) {
    const newMessageObject = {
      type: 'postMessage',
      user: userName,
      text: messageText
    };

    // let userholder = []
    // userholder.push(newMessageObject.user)
    // console.log('this is an array' + userholder)
    // console.log('this is the current user' + newMessageObject.user)
    // // console.log(JSON.stringify(newMessageObject.user))


    // if (userholder[0] !== newMessageObject.user) {
    //   console.log(JSON.stringify(this.state.messages[0].user));
      
    //   console.log('Youve changed');
    // }


    // Message sent from client to server
    this.socket.send(JSON.stringify(newMessageObject));

    // const newMessages = this.state.messages.concat(incomingMessage);
    // this.setState({
    //   messages: newMessages
    // });


  }

  // Websocket() {
   
  // }

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
  // this.Websocket()

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

    const newMessages = this.state.messages.concat(inMessage);
        this.setState({
          messages: newMessages
        });
    };
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