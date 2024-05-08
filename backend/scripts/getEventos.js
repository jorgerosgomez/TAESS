const { Reservation, Barber, Service } = require('../models'); 
const Sequelize = require('sequelize');

const getEventos = async (day) => {
  try {
    const dateStart = new Date(day);
    const dateEnd = new Date(day);
    dateEnd.setDate(dateEnd.getDate() + 1);

    const reservations = await Reservation.findAll({
      include: [
        {
          model: Barber,
          as: 'barber', 
        },
        {
          model: Service,
          as: 'service',
        }
      ],
      where: {
        date_reservation: {
          [Sequelize.Op.gte]: dateStart,
          [Sequelize.Op.lt]: dateEnd
        }
      },
      order: [['date_reservation', 'ASC']]
    });

    // mapea los resultados 
    const events = reservations.map(r => ({
      id: r.id,
      barberName: r.barber.name,
      serviceName: r.service.name,
      serviceDuration: r.service.duration,
      servicePrice: r.service.price,
      start: r.date_reservation,
      end: new Date(r.date_reservation.getTime() + r.service.duration * 60000)
    }));

    return { success: true, events };
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    return { success: false, message: 'Error al obtener los eventos', error: error.message };
  }
};

module.exports = {getEventos};
