import React, { useState } from 'react';
import '../../Components/ServiceModal/ServiceModal.css';
import { createService } from './ReqService';

const ServiceModal = ({ closeModal, theme }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await createService(name, description, price, duration);
      if (data.success) {
        console.log('Servicio creado con éxito:', data);
        closeModal();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al crear el servicio:', error);
      alert('Hubo un problema al crear el servicio.');
    }
  };

  const modalContentClass = `service-modal-content ${theme === 'dark' ? 'dark' : 'light'}`;

  return (
    <div className={`service-modal-backdrop ${theme}`}>
      <div className={modalContentClass}>
        <button className="service-modal-close" onClick={closeModal}>&times;</button>
        <h2>Crear Servicio</h2>
        <form onSubmit={handleSubmit} className="service-modal-form">
          {/* Campos para crear el servicio */}
          <input
            type="text"
            placeholder="Nombre del Servicio"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Duración (minutos)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <button type="submit">Crear Servicio</button>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;