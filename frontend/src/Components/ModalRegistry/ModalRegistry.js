import React, { useState } from "react";
import '../../Components/ModalRegistry/ModalRegistry.css'; 
const RegisterModal = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías la lógica para registrar al usuario
    console.log(username, email, password, confirmPassword);
    // Validar que password y confirmPassword coincidan
    // Luego cerrar el modal
    closeModal();
  };

  return (
    <div className="register-modal-backdrop">
      <div className="register-modal-content">
        <button className="register-modal-close" onClick={closeModal}>&times;</button>
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit} className="register-modal-form">
          {/* Campos para el registro */}
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Crear Cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
