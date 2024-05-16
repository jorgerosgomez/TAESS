import React, { useState, useEffect } from 'react';
import { fetchUsers, createOrUpdateUser, deleteUser } from './fetchUsers';
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
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const UsersTable = ({ theme }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({ id: '', username: '', password: '', fullName: '', email: '', telephone: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const users = await fetchUsers();
      setData(users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleCreateOrUpdate = async () => {
    const { username, password, fullName, email, telephone } = formState;
    if (!username || !password || !fullName || !email || !telephone) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      await createOrUpdateUser(formState);
      fetchData();
      setOpen(false);
      setFormState({ id: '', username: '', password: '', fullName: '', email: '', telephone: '' });
    } catch (error) {
      console.error('Error saving user:', error);
      if (error.message === 'DuplicateUsername') {
        alert('El nombre de usuario ya está registrado. Por favor, use uno diferente.');
      } else if (error.message === 'DuplicateEmail') {
        alert('El email ya está registrado. Por favor, use uno diferente.');
      } else {
        alert('Hubo un problema al guardar el usuario.');
      }
    }
  };


  const handleEdit = (user) => {
    setFormState(user);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Fullname', accessor: 'fullname' },
      { Header: 'Telephone', accessor: 'telephone' },
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
        Users
      </Typography>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add User
        </Button>
        <CSVLink data={data} filename={"users.csv"} style={{ textDecoration: 'none' }}>
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
          {formState.id ? 'Edit User' : 'Add User'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={formState.username}
            onChange={(e) => setFormState({ ...formState, username: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Fullname"
            type="text"
            fullWidth
            value={formState.fullName}
            onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
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
            label="Telephone"
            type="text"
            fullWidth
            value={formState.telephone}
            onChange={(e) => setFormState({ ...formState, telephone: e.target.value })}
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

export default UsersTable;
