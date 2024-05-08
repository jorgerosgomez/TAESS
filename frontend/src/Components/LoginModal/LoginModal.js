import React, { useState } from "react";
import '../../Components/LoginModal/LoginModal.css';
import loginUser from './ReqLogin.js';
import { useAuth } from "../AuthContext/AuthContext.js";


const LoginModal = ({ closeModal, openRegisterModal, theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, login, logout } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await loginUser(username, password);
      console.log('entro');
      if (data.success) {
        console.log('Inicio de sesión exitoso:', data);
        login();
        closeModal();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      alert('Hubo un problema al iniciar sesión');
    }
  };

  const modalContentClass = `login-modal-content ${theme === 'dark' ? 'dark' : 'light'}`;

  return (
    <div className={`login-modal-backdrop ${theme}`}>
      <div className={modalContentClass}>
        <button className="login-modal-close" onClick={closeModal}>&times;</button>
        <div className="login-modal-header">
          <h2>Iniciar Sesión</h2>
        </div>
        <form onSubmit={handleSubmit} className="login-modal-form">
          <div className="login-modal-input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-modal-input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-modal-actions">
            <button type="submit" className="login-modal-submit">Ingresar</button>
            <button type="button" className="login-modal-register" onClick={openRegisterModal}>Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
