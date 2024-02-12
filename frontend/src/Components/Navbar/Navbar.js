import React from "react";
import './Navbar.css'  
import { Link } from "react-router-dom"; 
import logo_light from '../../asserts/icono-b.jpeg';
import logo_dark from '../../asserts/icono-w.jpg';
import light_mode from '../../asserts/moon.png';
import dark_mode from '../../asserts/brightness.png'


const Navbar = ({ theme, setTheme }) => {

    const toggleMode = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="navbar">
            <img src={theme === 'light' ? logo_light : logo_dark} alt="logo" className="logo" />
            <ul>
                {/* Utiliza el componente Link para la navegación */}
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/reservas">Reservas</Link></li>
                <li><Link to="/quienes-somos">¿Quién somos?</Link></li>
            </ul>

            <img onClick={toggleMode} src={theme === 'light' ? light_mode : dark_mode} alt="toggle icon" className="toggle-icon" />
        </div>
    );
}
export default Navbar