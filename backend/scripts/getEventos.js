const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getEventos = async (day) => {
  //Buscar todos los barberos
  const barbers = await Barbers.findAll();
  //Buscar todas las reservas de ese dia
  const reservations = await Reservations.findAll({ where: { fecha: day } });
  //Buscar todos los servicios
  const services = await Services.findAll();

  const resources = [];
  barbers.forEach((barber) => {
    resources.push({
      id: barber.id,
      name: barber.name,
    });
  });

  const events = [];
  reservations.forEach((reservation) => {
    events.push({
      id: reservation.id,
      resourceId: reservation.barberId,
      title: reservation.clientName,
      service: services.find((service) => service.id === reservation.serviceId).name,
      start: reservation.date_reservation,
      //Inicio + duración del servicio
      end: new Date(reservation.date_reservation.getTime() + services.find((service) => service.id === reservation.serviceId).duration * 60000),
    });
  });

  return { resources, events };
};

module.exports = getEventos;
