import React, {useState} from "react";
import '../../Components/LoginModal/LoginModal.css'
import '../../Components/ModalRegistry/ModalRegistry.js'

const LoginModal = ({ closeModal, openRegisterModal, theme}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      console.log(username, password);
      closeModal();
    };

    const handleRegisterClick = (e) => {
      e.preventDefault();
      openRegisterModal();
    };
  
    const modalClass = `login-modal-content ${theme === 'dark' ? 'login-modal-dark' : ''}`;

  return (
    <div className="login-modal-backdrop">
      <div className={modalClass}>
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
            <button type="button" className="login-modal-register" onClick={handleRegisterClick}>Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;