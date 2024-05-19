import React, { useState, useEffect } from 'react';
import { fetchBarbers, createOrUpdateBarber, deleteBarber } from './fetchBarbers';
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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const BarbersTable = ({ theme }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({ id: '', name: '', email: '', phone: '', available: false });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const barbers = await fetchBarbers();
      console.log('Barbers:', barbers);
      setData(Array.isArray(barbers) ? barbers : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleCreateOrUpdate = async () => {
    try {
      await createOrUpdateBarber(formState);
      fetchData();
      setOpen(false);
      setFormState({ id: '', name: '', email: '', phone: '', available: false });
    } catch (error) {
      console.error('Error saving barber:', error);
    }
  };

  const handleEdit = (barber) => {
    setFormState(barber);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBarber(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting barber:', error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Available', accessor: 'available', Cell: ({ value }) => (value ? 'Yes' : 'No') },
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
        Barbers
      </Typography>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Barber
        </Button>
        <CSVLink data={data} filename={"barbers.csv"} style={{ textDecoration: 'none' }}>
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
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()} style={{ color: '#000' }}>
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
          {formState.id ? 'Edit Barber' : 'Add Barber'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="number"
            fullWidth
            value={formState.phone}
            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.available}
                onChange={(e) => setFormState({ ...formState, available: e.target.checked })}
              />
            }
            label="Available"
            style={{ marginBottom: '16px' }}
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

export default BarbersTable;
