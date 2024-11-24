import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact">
      <h1>Contact Us</h1>
      {submitted ? (
        <p className="success-message">Thank you for reaching out to us!</p>
      ) : (
        <form onSubmit={handleSubmit} className="Contacto">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Mensaje" rows="5" required></textarea>
          <button type="submit">Send</button>
        </form>
      )}
    </main>
  );
}

export default Contact;
