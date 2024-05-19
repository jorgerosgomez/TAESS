import React, { useState, useEffect } from 'react';
import { fetchOrders, createOrUpdateOrder, deleteOrder } from './fetchOrders';
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
  Snackbar,
  Alert
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const OrdersTable = ({ theme }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({ id: '', id_product: '', price: '', amount: '' });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const orders = await fetchOrders();
      console.log('Orders:', orders);
      setData(Array.isArray(orders) ? orders : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleCreateOrUpdate = async () => {
    try {
      const result = await createOrUpdateOrder(formState);
      if (!result.success) {
        setError(result.message);
        setOpenSnackbar(true);
      } else {
        fetchData();
        setOpen(false);
        setFormState({ id: '', id_product: '', price: '', amount: '' });
      }
    } catch (error) {
      console.error('Error saving order:', error);
      setError(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleEdit = (order) => {
    setFormState(order);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Product', accessor: 'id_product' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Amount', accessor: 'amount' },
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
        Orders
      </Typography>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Order
        </Button>
        <CSVLink data={data} filename={"orders.csv"} style={{ textDecoration: 'none' }}>
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
          {formState.id ? 'Edit Order' : 'Add Order'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product"
            type="number"
            fullWidth
            value={formState.id_product}
            onChange={(e) => setFormState({ ...formState, id_product: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={formState.price}
            onChange={(e) => setFormState({ ...formState, price: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={formState.amount}
            onChange={(e) => setFormState({ ...formState, amount: e.target.value })}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrdersTable;
