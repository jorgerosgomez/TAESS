const reservationsControler = require('../reservationsControler');
const servicesControler = require('../servicesControler');
const barbersControler = require('../barbersControler');

const getLibres = async function (day, id_service) {
  try{
    const apertura = new Date(day); //Apertura de la barbería
    apertura.setHours(10, 0, 0, 0);
    const cierre = new Date(day); //Cierre de la barbería
    cierre.setHours(20, 0, 0, 0);
    const {succes, service:service, mesage, eror} = await servicesControler.getService(id_service); //Servicio seleccionado
    const duration = service.duration; //Duración del servicio
    const {success, reservas:reservations, message, error} = await reservationsControler.getReservations(); //Todas las reservas
    const filtradosDia = seleccionaDia(reservations, day); //Reservas del día seleccionado
    const filtradosBarberos = separaPorBarberos(filtradosDia); //Reservas separadas por barbero
    const filtradosBarberosFecha = ordenaPorFecha(filtradosBarberos); //Reservas de cada barbero ordenadas por fecha
    var libres = []; //Array con los huecos libres

    if (filtradosBarberosFecha.length > 0) { //Si hay reservas ese día
      for (const barbero of filtradosBarberosFecha) { //Recorre cada barbero
        //si barbero no es un elemento vacío
        if (barbero) {
          for(let indice = 0; indice < barbero.length; indice++) { //Recorre cada reserva de cada barbero
            const reserva = barbero[indice]; //Reserva actual
            const inicio = new Date(reserva.date_reservation); //Inicio de la reserva
            const {s, service:servicio, m, e} = await servicesControler.getService(reserva.id_service); //Servicio de la reserva
            const fin = new Date(inicio.getTime() + servicio.duration * 60000); //Fin de la reserva
            var existe = false; //Variable para comprobar si ya existe un hueco que inicie en el mismo momento
            if (libres.length > 0) { //Si ya hay un hueco que comienza a esa hora lo pone a true
              existe = libres.some(libre =>{
                return libre.start.getTime() === inicio.getTime();
              })
            }
            if (indice === 0) { //Si es la primera reserva del barbero
              let inicioHueco = apertura; //Inicio del hueco
              let finHueco = new Date(inicioHueco.getTime() + duration * 60000); //Fin del hueco
              while (inicioHueco < inicio) { //Mientras el inicio del hueco sea menor que el inicio de la reserva
                libres.push({ id_barber: reserva.id_barber, start: inicioHueco, end: finHueco });
                inicioHueco = new Date(inicioHueco.getTime() + 15 * 60000); //Inicio del hueco anterior + 15 minutos
                finHueco = new Date(finHueco.getTime() + 15 * 60000); //Fin del hueco anterior + 15 minutos
              }
            }
            if (indice  != barbero.length - 1) { //Si no es la última reserva del barbero
              const siguiente = barbero[indice + 1]; //Reserva siguiente
              const siguienteInicio = new Date(siguiente.date_reservation); //Inicio de la reserva siguiente
              let hueco = Math.floor(Math.abs(siguienteInicio - fin) / 60000); //Hueco entre la reserva actual y la siguiente
              let finHueco = new Date(fin.getTime() + duration * 60000); //Fin del hueco
              if (fin < cierre && hueco >= duration && !existe) { //Si hay hueco entre la reserva actual y la siguiente y no existe un hueco que inicie en el mismo momento
                libres.push({ id_barber: reserva.id_barber, start: fin, end: finHueco});
                hueco = Math.floor(Math.abs(siguienteInicio - finHueco) / 60000); //Hueco entre el fin de la reserva actual y el inicio de la siguiente
              }
              while (finHueco < siguienteInicio && hueco >= duration) { //Mientras el fin del hueco sea menor que el inicio de la siguiente reserva
                libres.push({ id_barber: reserva.id_barber, start: finHueco, end: new Date(finHueco.getTime() + duration * 60000) });
                finHueco = new Date(finHueco.getTime() + 15 * 60000); //Fin del hueco anterior + 15 minutos
                hueco = Math.floor(Math.abs(siguienteInicio - finHueco) / 60000); //Hueco entre el fin del hueco y el inicio de la siguiente reserva
              }
            }
            else{//Cuando el barbero ya no tiene más reservas comprueba si hay hueco hasta el cierre
              let abierto = true; //Variable para comprobar si la barbería sigue abierta
              let inicioHueco = fin; //Inicio del hueco
              let finHueco = new Date(inicioHueco.getTime() + duration * 60000); //Fin del hueco
              while (abierto) { //Mientras la barbería siga abierta
                if (inicioHueco < cierre && finHueco < cierre) { //Si el hueco no supera el cierre se añade al array de huecos libres y se aumenta 15 minutos
                  libres.push({ id_barber: reserva.id_barber, start: inicioHueco, end: finHueco });
                  inicioHueco = new Date(inicioHueco.getTime() + 15 * 60000); //Inicio del hueco anterior + 15 minutos
                  finHueco = new Date(finHueco.getTime() + 15 * 60000);
                }
                else{
                  abierto = false;
                }
              }
            }
          };
        }
      };
    }
    else{
      const {suc, barbers:barberos, mes, er} = await barbersControler.getBarbers();
      for(const barbero of barberos){
        let inicioHueco = apertura; //Inicio del hueco
        let finHueco = new Date(inicioHueco.getTime() + duration * 60000); //Fin del hueco
        while (inicioHueco < cierre) { //Mientras el inicio del hueco sea menor que el cierre
          libres.push({ id_barber: barbero.id, start: inicioHueco, end: finHueco });
          inicioHueco = new Date(inicioHueco.getTime() + 15 * 60000); //Inicio del hueco anterior + 15 minutos
          finHueco = new Date(finHueco.getTime() + 15 * 60000); //Fin del hueco anterior + 15 minutos
        }
      }
    }
    return { success: true, libres }
  }catch(error){
    console.error('Error al obtener los huecos libres:', error);
    return { success: false, message: 'Error al obtener los huecos libres', error: error.message };
  }
};

//Recibe un array de reservas y un día y devuelve un array con las reservas de ese día
const seleccionaDia = function (reservations, day) {
  if(!Array.isArray(reservations)){
    throw new Error('El primer argumento debe ser un array');
  }
  const dia = new Date(day);
  const filtrados = reservations.filter(reserva => {
    const fecha = new Date(reserva.date_reservation);
    return fecha.getDate() === dia.getDate() && fecha.getMonth() === dia.getMonth() && fecha.getFullYear() === dia.getFullYear();
  });
  return filtrados;
};

//Recibe un JSON con todos las reserves y devuelve un array de arrays con las reservas separadas por barbero
const separaPorBarberos = function (reservations) {
  const barberos = [];
  for (let i = 0; i < reservations.length; i++) {
    const reserva = reservations[i];
    if (!barberos[reserva.id_barber]) {
      barberos[reserva.id_barber] = [];
    }
    barberos[reserva.id_barber].push(reserva);
  }
  return barberos;
};

//Recibe un array de arrays con las reservas separadas por barbero y ordena cada uno de los arrays por la fecha de la reserva
const ordenaPorFecha = function (barberos) {
  for (const barbero of barberos) {
    if(barbero){
      barbero.sort((a, b) => {
        return new Date(a.date_reservation) - new Date(b.date_reservation);
      });
    }
  }
    return barberos;
};

module.exports = { getLibres };
