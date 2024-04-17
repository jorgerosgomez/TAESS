import React, { useState, useEffect } from 'react';
import './ServicePage.css';

const ServicePage = ({ theme }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        if (json.success && json.data && json.data.services) {
          setServices(json.data.services);
        } else {
          setError('No se encontraron servicios');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const servicePageClass = `service-page ${theme}`;
  const serviceCardClass = `service-card ${theme}-card`; 

  if (isLoading) {
    return <div className={`loading ${theme}`}>Cargando servicios...</div>;
  }

  if (error) {
    return <div className={`error ${theme}`}>Error: {error}</div>;
  }

  return (
    <div className={servicePageClass}>
      <h1>Lista de Servicios</h1>
      <div className="service-list">
        {services.length > 0 ? (
          services.map((service) => (
            <div className={serviceCardClass} key={service.id}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-info">
                <span>Duracion: {service.duration} min</span>
                <span>Precio: ${service.price.toFixed(2)}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No hay servicios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
