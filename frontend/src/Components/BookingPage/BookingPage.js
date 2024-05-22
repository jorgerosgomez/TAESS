import React, { useState, useEffect } from 'react';
import { fetchServices, fetchBarbers, createOrUpdateReservation } from '../Admin/fetchReservations'; 
import { useAuth } from '../AuthContext/AuthContext'; 
import {
  Button,
  Container,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const BookingPage = ({ theme }) => {
  const { user } = useAuth(); 
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [formState, setFormState] = useState({
    idCliente: user?.id || '',
    idBarbero: '',
    fecha: new Date(),
    hora: new Date(),
    servicio: '',
    duration: '',
    price: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServiceData();
    fetchBarberData();
  }, []);

  useEffect(() => {
    if (user?.id) {
      setFormState((prevState) => ({
        ...prevState,
        idCliente: user.id
      }));
    }
  }, [user]);

  const fetchServiceData = async () => {
    try {
      const services = await fetchServices();
      setServices(services);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  const fetchBarberData = async () => {
    try {
      const barbers = await fetchBarbers();
      setBarbers(barbers);
    } catch (error) {
      console.error('Error al obtener los barberos:', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!formState.idCliente) {
      setError('Falta el cliente');
      return;
    }
    if (!formState.idBarbero) {
      setError('Falta el barbero');
      return;
    }
    if (!formState.servicio) {
      setError('Falta el servicio');
      return;
    }
    if (!formState.fecha) {
      setError('Falta la fecha');
      return;
    }
    if (!formState.hora) {
      setError('Falta la hora');
      return;
    }

    try {
      const combinedDateTime = moment(formState.fecha).set({
        hour: moment(formState.hora).get('hour'),
        minute: moment(formState.hora).get('minute'),
        second: 0,
        millisecond: 0
      }).format('YYYY-MM-DD HH:mm:ss');
      
      const payload = {
        idCliente: formState.idCliente,
        idBarbero: formState.idBarbero,
        fecha: combinedDateTime,
        servicio: formState.servicio,
      };
      await createOrUpdateReservation(payload);
      setFormState({ idCliente: user?.id, idBarbero: '', fecha: new Date(), hora: new Date(), servicio: '', duration: '', price: '' });
      setError('');
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      setError('Error al guardar la reserva');
    }
  };

  const handleServiceChange = (event) => {
    const selectedService = services.find(service => service.id === event.target.value);
    setFormState({
      ...formState,
      servicio: selectedService.id,
      duration: selectedService.duration,
      price: selectedService.price,
    });
  };

  return (
    <Container
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#424242',
        color: theme === 'light' ? '#000' : '#fff',
        borderRadius: '8px',
        padding: '24px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Reservar un Servicio
      </Typography>
      <Divider />
      <Paper style={{ marginTop: '16px', padding: '16px' }}>
        {error && <Typography color="error">{error}</Typography>}
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
          <InputLabel>Barbero</InputLabel>
          <Select
            value={formState.idBarbero}
            onChange={(e) => setFormState({ ...formState, idBarbero: e.target.value })}
          >
            {barbers.map(barber => (
              <MenuItem key={barber.id} value={barber.id}>
                {barber.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
          <label>Fecha</label>
          <DatePicker
            selected={formState.fecha}
            onChange={(date) => setFormState({ ...formState, fecha: date })}
            dateFormat="MMMM d, yyyy"
            customInput={<TextField fullWidth />}
          />
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
          <label>Hora</label>
          <DatePicker
            selected={formState.hora}
            onChange={(date) => setFormState({ ...formState, hora: date })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="h:mm aa"
            customInput={<TextField fullWidth />}
          />
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
          <InputLabel>Servicio</InputLabel>
          <Select
            value={formState.servicio}
            onChange={handleServiceChange}
          >
            {services.map(service => (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Duración"
          type="number"
          fullWidth
          value={formState.duration}
          onChange={(e) => setFormState({ ...formState, duration: e.target.value })}
          style={{ marginBottom: '16px' }}
          disabled
        />
        <TextField
          margin="dense"
          label="Precio"
          type="number"
          fullWidth
          value={formState.price}
          onChange={(e) => setFormState({ ...formState, price: e.target.value })}
          style={{ marginBottom: '16px' }}
          disabled
        />
        <Button onClick={handleCreateOrUpdate} color="primary" variant="contained" fullWidth>
          Reservar Ahora
        </Button>
      </Paper>
    </Container>
  );
};

export default BookingPage;
