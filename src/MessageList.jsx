import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return (
          <div key={message.id} className="message" id='message-list'>
            <img className="message-avatar" src={`https://ui-avatars.com/api/?name=${message.user}&length=1`}/>
            <span className="message-username">{message.user} </span> 
            <span className="message-content">{message.text}</span>
          </div>
        );
      } else if (message.type === 'incomingNotification') {
        return (
          <div key={message.id} className="message-system">
            {message.text}
          </div>
        );
      }
    });

    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}

export default MessageList;