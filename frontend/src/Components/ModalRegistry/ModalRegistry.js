import React, { useState } from "react";
import '../../Components/ModalRegistry/ModalRegistry.css'; 
import { registerUser } from './ReqRegisry';

const RegisterModal = ({ closeModal, theme }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    
    try {
      const data = await registerUser(fullName, username, email, password, telephone);
      if (data.success) {
        console.log('Usuario registrado con éxito:', data);
        closeModal();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Hubo un problema al registrar tu cuenta.');
    }
  };

  // Define modalContentClass correctly here
  const modalContentClass = `register-modal-content ${theme === 'dark' ? 'dark' : 'light'}`;

  return (
    <div className={`register-modal-backdrop ${theme}`}>
      <div className={modalContentClass}>
        <button className="register-modal-close" onClick={closeModal}>&times;</button>
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit} className="register-modal-form">
          {/* Campos para el registro */}
          <input
            type="text"
            placeholder="Nombre Completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
          <input
            type="number"
            placeholder="Teléfono"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
          <button type="submit">Crear Cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
