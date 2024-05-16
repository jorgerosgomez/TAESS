const reservationsControler = require('../reservationControler');
const servicesControler = require('../servicesControler');

const getLibres = async function (day, id_service) {
  try{
    const cierre = new Date(day); //Cierre de la barbería
    cierre.setHours(20, 0, 0, 0);
    const service = await servicesControler.getService(id_service); //Servicio seleccionado
    const duration = service.duration; //Duración del servicio
    const reservations = await reservationsControler.getReservations(); //Todas las reservas
    const filtradosDia = seleccionaDia(reservations, day); //Reservas del día seleccionado
    const filtradosBarberos = separaPorBarberos(filtradosDia); //Reservas separadas por barbero
    const libres = []; //Array con los huecos libres

    filtradosBarberos.forEach(barbero => { //Recorre cada barbero
      barbero.forEach((reserva, indice) => { //Recorre cada reserva de cada barbero
        const inicio = new Date(reserva.date_reservation); //Inicio de la reserva
        const servicio = servicesControler.getService(reserva.id_service); //Servicio de la reserva
        const fin = new Date(inicio.getTime() + servicio.duration * 60000); //Fin de la reserva
        const existe = false; //Variable para comprobar si ya existe un hueco que inicie en el mismo momento
        if (libres.length > 0) { //Si ya hay un hueco que comienza a esa hora lo pone a true
          existe = libres.some(libre =>{
            return libre.start.getTime() === inicio.getTime();
          })
        }
        if (indice  != barbero.length - 1) { //Si no es la última reserva del barbero
          const siguiente = barbero[indice + 1]; //Reserva siguiente
          const siguienteInicio = new Date(siguiente.date_reservation); //Inicio de la reserva siguiente
          const hueco = Math.floor(Math.abs(siguienteInicio - fin) / 60000); //Hueco entre la reserva actual y la siguiente
          if (fin < cierre && hueco >= duration && !existe) { //Si hay hueco entre la reserva actual y la siguiente y no existe un hueco que inicie en el mismo momento
            libres.push({ id_barber: reserva.id_barber, start: fin, end: new Date(fin.getTime() + duration * 60000) });
          }
        }
        else{//Cuando el barbero ya no tiene más reservas comprueba si hay hueco hasta el cierre
          const abierto = true; //Variable para comprobar si la barbería sigue abierta
          const inicioHueco = fin; //Inicio del hueco
          const finHueco = new Date(inicioHueco.getTime() + duration * 60000); //Fin del hueco
          while (abierto) { //Mientras la barbería siga abierta
            if (inicioHueco < cierre && finHueco < cierre) { //Si el hueco no supera el cierre se añade al array de huecos libres y se aumenta 15 minutos
              libres.push({ id_barber: reserva.id_barber, start: inicioHueco, end: finHueco });
              inicioHueco = inicioHueco.getTime() + 15 * 60000;
              finHueco = finHueco.getTime() + 15 * 60000;
            }
            else{
              abierto = false;
            }
          }
        }
      });
    });
    return { success: true, libres };
  }catch(error){
    console.error('Error al obtener los eventos:', error);
    return { success: false, message: 'Error al obtener los eventos', error: error.message };
  }
};

//Recibe un array de reservas y un día y devuelve un array con las reservas de ese día
const seleccionaDia = function (reservations, day) {
  return reservations.filter(reserva => {
    const date = new Date(reserva.date_reservation);
    return date.getFullYear() === day.getFullYear() && date.getMonth() === day.getMonth() && date.getDate() === day.getDate();
  });
};

//Recibe un array con todos las reserves y devuelve un array de arrays con las reservas separadas por barbero
const separaPorBarberos = function (reservations) {
  const barberos = [];
  reservations.forEach(reserva => {
    const barber = reserva.id_barber;
    if (!barberos[barber]) {
      barberos[barber] = [];
    }
    barberos[barber].push(reserva);
  });
  return barberos;
};

module.exports = { getLibres };
