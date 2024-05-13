import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'
import BannerImage from '../../asserts/fondo.jpeg';

const HomePage = () => {
    return (
        <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
            <div className="headerContainer">
                <h1 style={{ marginBottom: '50px' }}>MyBarberShop</h1>
                {/**/}

                <p style={{ marginBottom: '50px' }}>Los mejores cortes y el mejor servicio</p>

                <Link to="/reservas">
                    <button>Reserva ahora</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
