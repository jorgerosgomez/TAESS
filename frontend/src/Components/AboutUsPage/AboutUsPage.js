import React, { useState, useEffect } from 'react';
import './AboutUsPage.css';
import { Link } from 'react-router-dom'
import BannerImage from '../../asserts/fondo.jpeg';

const AboutUsPage = () => {
    return (
        <div className="about">
            <div className="aboutTop" style={{ backgroundImage: `url(${BannerImage})` }}></div>
            <div className="aboutBottom">
                <h1 style={{ marginBottom: '50px' }}>Quienes somos?</h1>
                <p>En **MyBarberShop**, nos enorgullece ofrecer una experiencia de peluqueria moderna y conveniente. Aqui estan algunas de las ventajas que encontraras al visitarnos:</p>
                <ul>
                    <li>**Reservas en Linea:** Sabemos que tu tiempo es valioso. Por eso, hemos implementado un sistema de reservas en linea facil de usar. Puedes elegir la fecha, hora y el barbero de tu preferencia desde la comodidad de tu hogar o mientras estas en movimiento. No mas esperas innecesarias!</li>
                    <li>**Tienda en Linea Integrada:** Ademas de los servicios de corte de pelo, tambien ofrecemos una tienda en linea con productos de calidad. Desde productos para el cuidado del cabello hasta accesorios de moda, puedes explorar y comprar lo que necesitas antes o despues de tu cita. Todo esta a solo unos clics de distancia!</li>
                    <li>**Preparacion Personalizada:** Compraste un producto en nuestra tienda en linea? No hay problema. Cuando vengas a cortarte el pelo, tendras tus productos listos y esperandote. Sin demoras ni complicaciones.</li>
                    <li>**Gestion de Inventario Eficiente:** Nuestros barberos pueden concentrarse en lo que hacen mejor: brindarte un excelente servicio. Nos encargamos de gestionar el inventario de productos y herramientas. Asi, siempre tendran a mano lo necesario para darte el mejor corte.</li>
                </ul>
                <p>En **MyBarberShop**, no solo se trata de cortes de pelo; es una experiencia completa. ¡Te invitamos a visitarnos y descubrir la diferencia!</p>
            </div>
        </div>
    );
}

export default AboutUsPage;
