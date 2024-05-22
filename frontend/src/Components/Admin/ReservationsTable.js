import React, { useState, useEffect } from 'react';
import { fetchReservations, createOrUpdateReservation, deleteReservation, fetchServices, fetchClients, fetchBarbers } from './fetchReservations';
import { useTable } from 'react-table';
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  Typography,
  Divider,
  Paper,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import moment from 'moment';

const ReservationsTable = ({ theme }) => {
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({ id: '', idCliente: '', idBarbero: '', fecha: new Date(), hora: new Date(), servicio: '', duration: '', price: '' });

  useEffect(() => {
    fetchData();
    fetchServiceData();
    fetchClientData();
    fetchBarberData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const reservations = await fetchReservations();
      console.log('Fetched reservations:', reservations);
      setData(Array.isArray(reservations) ? reservations : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const fetchServiceData = async () => {
    try {
      const services = await fetchServices();
      console.log('Fetched services:', services);
      setServices(services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchClientData = async () => {
    try {
      const clients = await fetchClients();
      console.log('Fetched clients:', clients);
      setClients(clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchBarberData = async () => {
    try {
      const barbers = await fetchBarbers();
      console.log('Fetched barbers:', barbers);
      setBarbers(barbers);
    } catch (error) {
      console.error('Error fetching barbers:', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const combinedDateTime = moment(formState.fecha).format('YYYY-MM-DD') + ' ' + moment(formState.hora).format('HH:mm:ss');
      const payload = {
        id: formState.id,
        idCliente: formState.idCliente,
        idBarbero: formState.idBarbero,
        fecha: combinedDateTime,
        servicio: formState.servicio,
      };
      await createOrUpdateReservation(payload);
      fetchData();
      setOpen(false);
      setFormState({ id: '', idCliente: '', idBarbero: '', fecha: new Date(), hora: new Date(), servicio: '', duration: '', price: '' });
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };

  const handleEdit = (reservation) => {
    setFormState({
      ...reservation,
      idCliente: reservation.id_client,
      idBarbero: reservation.id_barber,
      fecha: new Date(reservation.date_reservation),
      hora: new Date(reservation.date_reservation),
      servicio: reservation.id_service,
      duration: Math.ceil(reservation.duration_total), 
      price: Math.ceil(reservation.price_total), 
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const handleServiceChange = (event) => {
    const selectedService = services.find(service => service.id === event.target.value);
    setFormState({
      ...formState,
      servicio: selectedService.id,
      duration: Math.ceil(selectedService.duration),
      price: Math.ceil(selectedService.price), 
    });
  };

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Client', accessor: 'id_client' },
      { Header: 'Barber', accessor: 'id_barber' },
      { Header: 'Date', accessor: 'date_reservation' },
      { Header: 'Service', accessor: 'id_service' },
      { Header: 'Duration', accessor: 'duration_total' },
      { Header: 'Price', accessor: 'price_total' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="primary" onClick={() => handleEdit(row.original)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => handleDelete(row.original.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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
        Reservations
      </Typography>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Reservation
        </Button>
        <CSVLink data={data} filename={"reservations.csv"} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">Export to CSV</Button>
        </CSVLink>
      </div>
      <Paper style={{ marginTop: '16px', overflowX: 'auto' }}>
        <Table {...getTableProps()} size="small" style={{ minWidth: 650 }}>
          <TableHead style={{ backgroundColor: theme === 'light' ? '#e0e0e0' : '#505050' }}>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()} style={{ color: theme === 'light' ? '#000' : '#fff' }}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={row.original.id}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()} style={{ color: '#000' }} key={cell.column.id}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ color: theme === 'light' ? '#000' : '#fff' }}>
          {formState.id ? 'Edit Reservation' : 'Add Reservation'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <InputLabel>Client</InputLabel>
            <Select
              value={formState.idCliente}
              onChange={(e) => setFormState({ ...formState, idCliente: e.target.value })}
            >
              {clients.map(client => (
                <MenuItem key={client.id} value={client.id}>
                  {client.fullname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <InputLabel>Barber</InputLabel>
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
            <label>Date</label>
            <DatePicker
              selected={formState.fecha}
              onChange={(date) => setFormState({ ...formState, fecha: date })}
              dateFormat="MMMM d, yyyy"
              customInput={<TextField fullWidth />}
            />
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <label>Time</label>
            <DatePicker
              selected={formState.hora}
              onChange={(date) => setFormState({ ...formState, hora: date })}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              customInput={<TextField fullWidth />}
            />
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <InputLabel>Service</InputLabel>
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
            label="Duration"
            type="number"
            fullWidth
            value={Math.ceil(formState.duration)} 
            onChange={(e) => setFormState({ ...formState, duration: Math.ceil(e.target.value) })} 
            style={{ marginBottom: '16px' }}
            disabled
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={Math.ceil(formState.price)} 
            onChange={(e) => setFormState({ ...formState, price: Math.ceil(e.target.value) })} 
            style={{ marginBottom: '16px' }}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateOrUpdate} color="primary">
            {formState.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReservationsTable;
