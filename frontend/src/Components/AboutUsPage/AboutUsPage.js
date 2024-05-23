import React from 'react';
import './AboutUsPage.css';
import BannerImage from '../../asserts/fondo.jpeg';

function Contact() {
  return (
    <div className="contact">
      <div className="leftSide" style={{ backgroundImage: `url(${BannerImage})` }}>
        <AboutUsSection />
      </div>
      <div className="rightSide">
        <h1>Contáctanos</h1>
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
          <button type="submit">Enviar Mensaje</button>
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

const AboutUsSection = () => {
  return (
    <div className="about">
      <div className="aboutOverlay">
        <ul>
        <h1>¿Quiénes somos?</h1>
        <p>En MyBarberShop, nos enorgullece ofrecer una experiencia de peluquería moderna y conveniente. Aquí están algunas de las ventajas que encontrarás al visitarnos:</p>
          <li>Reservas en Línea: Sabemos que tu tiempo es valioso. Por eso, hemos implementado un sistema de reservas en línea fácil de usar. Puedes elegir la fecha, hora y el barbero de tu preferencia desde la comodidad de tu hogar o mientras estás en movimiento. ¡No más esperas innecesarias!</li>
          <li>Tienda en Línea Integrada: Además de los servicios de corte de pelo, también ofrecemos una tienda en línea con productos de calidad. Desde productos para el cuidado del cabello hasta accesorios de moda, puedes explorar y comprar lo que necesitas antes o después de tu cita. ¡Todo está a solo unos clics de distancia!</li>
          <li>Preparación Personalizada: ¿Compraste un producto en nuestra tienda en línea? No hay problema. Cuando vengas a cortarte el pelo, tendrás tus productos listos y esperándote. Sin demoras ni complicaciones.</li>
          <li>Gestión de Inventario Eficiente: Nuestros barberos pueden concentrarse en lo que hacen mejor: brindarte un excelente servicio. Nos encargamos de gestionar el inventario de productos y herramientas. Así, siempre tendrán a mano lo necesario para darte el mejor corte.</li>
        <p>En MyBarberShop, no solo se trata de cortes de pelo; es una experiencia completa. ¡Te invitamos a visitarnos y descubrir la diferencia!</p>
        </ul>
      </div>
    </div>
  );
};

export default Contact;