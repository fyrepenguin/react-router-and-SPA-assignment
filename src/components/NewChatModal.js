import React from 'react'

export default function NewChatModal({ closeModal, contacts }) {

  return (
    <>
      <button onClick={closeModal} className="modal-close" title="Close Modal">X</button>
      <h3>Create Chat</h3>
      <div className="modal-area">
        <div className='modal-body'>
          <form className='modal-form'>
            {contacts.map(contact => (
              <div controlId={contact.email} key={contact.email} className="form-group form-checkbox">
                <label htmlFor={contact.email}> <input
                  name="contact"
                  type="checkbox"
                  id={contact.email}
                  label={contact.firstName}
                />
                  {contact.firstName}</label>
              </div>
            ))}
            <footer>
              <button className="primary" type="submit">Create Contact</button>
              <button className="secondary" onClick={closeModal}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}
