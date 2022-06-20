import React from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat';

export default function Dashboard({
  email,
  selectedChat,
  contacts,
  deleteContact,
  createContact,
  chats,
  createChat,
  deleteChat,
  selectChatIndex,
  sendMessage }) {

  return (
    <div className='dashboard'>
      <Sidebar email={email}
        contacts={contacts}
        deleteContact={deleteContact}
        createContact={createContact}
        chats={chats}
        createChat={createChat}
        deleteChat={deleteChat}
        selectedChat={selectedChat}
        selectChatIndex={selectChatIndex}
      />
      {selectedChat && <Chat sendMessage={sendMessage} selectedChat={selectedChat} />}
    </div>
  )
}
