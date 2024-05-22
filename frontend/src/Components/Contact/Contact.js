import React from 'react';
import './Contact.css';
import BannerImage from '../../asserts/fondo.jpeg';

function Contact() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="rightSide">
        <h1>Contact Us</h1>
        <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="about">
        <div className="aboutTop" style={{ backgroundImage: `url(${BannerImage})` }}></div>
        <div className="aboutBottom">
          <h1 style={{ marginBottom: '50px' }}>¿Quiénes somos?</h1>
          <p>En MyBarberShop, nos enorgullece ofrecer una experiencia de peluquería moderna y conveniente. Aquí están algunas de las ventajas que encontrarás al visitarnos:</p>
          <ul>
            <li>Reservas en Línea: Sabemos que tu tiempo es valioso. Por eso, hemos implementado un sistema de reservas en línea fácil de usar. Puedes elegir la fecha, hora y el barbero de tu preferencia desde la comodidad de tu hogar o mientras estás en movimiento. ¡No más esperas innecesarias!</li>
            <li>Tienda en Línea Integrada: Además de los servicios de corte de pelo, también ofrecemos una tienda en línea con productos de calidad. Desde productos para el cuidado del cabello hasta accesorios de moda, puedes explorar y comprar lo que necesitas antes o después de tu cita. ¡Todo está a solo unos clics de distancia!</li>
            <li>Preparación Personalizada: ¿Compraste un producto en nuestra tienda en línea? No hay problema. Cuando vengas a cortarte el pelo, tendrás tus productos listos y esperándote. Sin demoras ni complicaciones.</li>
            <li>Gestión de Inventario Eficiente: Nuestros barberos pueden concentrarse en lo que hacen mejor: brindarte un excelente servicio. Nos encargamos de gestionar el inventario de productos y herramientas. Así, siempre tendrán a mano lo necesario para darte el mejor corte.</li>
          </ul>
          <p>En MyBarberShop, no solo se trata de cortes de pelo; es una experiencia completa. ¡Te invitamos a visitarnos y descubrir la diferencia!</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
