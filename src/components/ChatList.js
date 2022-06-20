import React from 'react';

export default function ChatList({ chats, selectChatIndex, deleteChat }) {

  return (
    <div>
      {chats.map((chat, index) => (
        <div key={index} className={`chat-item ${chat.selected ? 'active' : ''}`} >
          <div className='avatar-name-container' onClick={() => selectChatIndex(index)}>
            <div className='avatar'></div>
            <span>{chat.recipients.map(r => r.firstName).join(', ')}</span>
          </div>

          <div className='chat-item-buttons-container'>
            <button onClick={() => deleteChat(index)} className="delete-button" >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}