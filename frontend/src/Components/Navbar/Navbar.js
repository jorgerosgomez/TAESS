import React, { useState } from "react";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import logo_light from '../../asserts/icono-b.jpeg';
import logo_dark from '../../asserts/icono-w.jpg';
import light_mode from '../../asserts/moon.png';
import dark_mode from '../../asserts/brightness.png';
import user_icon from '../../asserts/Usuario-ico-dark.png';
import { useAuth } from '../../Components/AuthContext/AuthContext';
import LoginModal from "../../Components/LoginModal/LoginModal";
import ModalRegistry from "../../Components/ModalRegistry/ModalRegistry";

const Navbar = ({ theme, setTheme }) => {
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin, logout } = useAuth(); // Asegúrate de que logout está aquí

    const toggleMode = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const openRegisterModal = () => {
        setLoginModalVisible(false);
        setRegisterModalVisible(true);
    };

    const handleUserIconClick = () => {
        if (isAuthenticated) {
            navigate('/user-info');
        } else {
            setLoginModalVisible(true);
        }
    };

    const closeModal = () => {
        setLoginModalVisible(false);
        setRegisterModalVisible(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="navbar">
            <img src={theme === 'light' ? logo_light : logo_dark} alt="logo" className="logo" />
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/servicios">Servicios</Link></li>
                <li><Link to="/reservas">Reservas</Link></li>
                <li><Link to="/quienes-somos">¿Quién somos?</Link></li>
                <li><Link to="/Contact">Contactanos</Link></li>
                {isAdmin && <li><Link to="/administracion">Administración</Link></li>}
                {isAuthenticated && (
                    <li>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </li>
                )}
            </ul>
            <img src={user_icon} alt="user icon" className="user-icon" onClick={handleUserIconClick} />
            <img onClick={toggleMode} src={theme === 'light' ? light_mode : dark_mode} alt="toggle icon" className="toggle-icon" />
            {isLoginModalVisible && <LoginModal closeModal={closeModal} openRegisterModal={openRegisterModal} theme={theme} />}
            {isRegisterModalVisible && <ModalRegistry closeModal={closeModal} theme={theme} />}
        </div>
    );
};

export default Navbar;
