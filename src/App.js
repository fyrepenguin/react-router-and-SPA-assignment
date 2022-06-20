import React, { useCallback } from 'react'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout';
import contactsData from './data/contacts.json'
import chatsData from './data/chats.json'
import './App.css'

function App() {

  const yourEmail = 'user@email.com'
  const [contacts, setContacts] = React.useState(contactsData)
  const [chats, setChats] = React.useState(chatsData);
  const [selectedChatIndex, setSelectedChatIndex] = React.useState(0)

  function createContact({ email, firstName, lastName, phoneNumber }) {
    setContacts(prevContacts => {
      return [...prevContacts, { email, firstName, lastName, phoneNumber }]
    })
  }
  function deleteContact(email) {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.email !== email)
    })
  }

  // function updateContact(email, firstName, lastName, phoneNumber) {
  //   setContacts(prevContacts => {
  //     return prevContacts.map(contact => {
  //       if (contact.email === email) {
  //         return { ...contact, firstName, lastName, phoneNumber }
  //       }
  //       return contact
  //     })
  //   })
  // }

  function createChat(recipients) {
    const chatAlreadyExists = chats.map(chat => arrayEquality(recipients, chat.recipients)).includes(true)

    !chatAlreadyExists && setChats(prevChats => {
      return [...prevChats, { recipients, messages: [] }]
    })
  }
  function deleteChat(index) {
    setChats(prevChats => {
      return prevChats.filter((_, i) => i !== index)
    })
  }

  const addMessageToChat = useCallback(({ recipients, text, sender }) => {
    setChats(prevChats => {
      let madeChange = false
      const newMessage = { sender, text }
      const newChats = prevChats.map(chat => {
        if (arrayEquality(chat.recipients, recipients)) {
          madeChange = true
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          }
        }

        return chat
      })

      if (madeChange) {
        return newChats
      } else {
        return [
          ...prevChats,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setChats])

  function sendMessage(recipients, text) {
    addMessageToChat({ recipients, text, sender: yourEmail })
  }

  const formattedChats = chats.map((chat, index) => {
    const recipients = chat.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.email === recipient
      })
      const firstName = (contact && contact.firstName) || recipient
      return { email: recipient, firstName }
    })

    const messages = chat.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.email === message.sender
      })
      const firstName = (contact && contact.firstName) || message.sender
      const fromMe = yourEmail === message.sender
      return { ...message, senderName: firstName, fromMe }
    })

    const selected = index === selectedChatIndex
    return { ...chat, messages, recipients, selected }
  })


  function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
      return element === b[index]
    })
  }


  return (
    <Layout>
      <Dashboard
        email={yourEmail}
        contacts={contacts}
        createContact={createContact}
        deleteContact={deleteContact}
        chats={formattedChats}
        createChat={createChat}
        deleteChat={deleteChat}
        selectChatIndex={setSelectedChatIndex}
        sendMessage={sendMessage}
        selectedChat={formattedChats[selectedChatIndex]}
      />
    </Layout>
  )
}

export default App;


