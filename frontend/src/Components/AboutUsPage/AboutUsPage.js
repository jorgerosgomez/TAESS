import React, { useState, useEffect } from 'react';
import './AboutUsPage.css';
import BannerImage from '../../asserts/fondo.jpeg';

function Contact() {
    return (
      <div className="contact">
        <div
          className="leftSide"
          style={{ backgroundImage: `url(${BannerImage})` }}
        ></div>
        <div className="rightSide">
          <h1> Contáctanos</h1>
  
          <form id="contact-form" method="POST">
            <label htmlFor="name">Nombre Completo</label>
            <input name="name" placeholder="Introduce tu nombre completo..." type="text" />
            <label htmlFor="email">Email</label>
            <input name="email" placeholder="Introduce tu email..." type="email" />
            <label htmlFor="message">Mensaje</label>
            <textarea
              rows="6"
              placeholder="Escribe tu mensaje..."
              name="message"
              required
            ></textarea>
            <button type="submit"> Enviar Mensaje</button>
          </form>
  
          <div className="map-container">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.223321695393!2d-0.5183953880199186!3d38.39008517636012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6236b01a40e499%3A0xf1a6c4be35cee314!2sLUIS%20MIGUEL%20PAVIA%20ESTILISTAS%20-%20Peluquer%C3%ADa%20-%20Barber%C3%ADa%20en%20Alicante%20-%20San%20Vicente%20del%20Raspeig!5e0!3m2!1sen!2ses!4v1716137967945!5m2!1sen!2ses"
              style={{ width: '80%', height: '325px', border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
  
  export default Contact;