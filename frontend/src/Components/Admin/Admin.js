

import React, { useState } from 'react';
import UsersTable from './UsersTable';
import ServicesTable from './ServicesTable';
import BarbersTable from './BarbersTable';
import ProductsTable from './ProductsTable';
import ReservationsTable from './ReservationsTable';
import { Drawer, List, ListItem, ListItemText, CssBaseline, Toolbar, Container } from '@mui/material';
import OrdersTable from './OrdersTable';

const drawerWidth = 240;

const Admin = ({ theme }) => {
  const [selectedTable, setSelectedTable] = useState('Barbers');
  
  const tables = ['Barbers', 'Orders', 'Products', 'Reservations', 'Services', 'Users'];

  const renderTableContent = () => {
    switch (selectedTable) {
      case 'Barbers':
        return <BarbersTable theme={theme} />;
      case 'Orders':
        return <OrdersTable theme={theme} />;
      case 'Products':
        return <ProductsTable theme={theme} />;
      case 'Reservations':
        return <ReservationsTable theme={theme} />;
      case 'Services':
        return <ServicesTable theme={theme} />  ;
      case 'Users':
        return <UsersTable theme={theme} />;
      default:
        return <div>Select a table</div>;
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#fff', color: theme === 'light' ? '#000' : '#fff' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        style={{ width: drawerWidth, flexShrink: 0 }}
        PaperProps={{ style: { width: drawerWidth, backgroundColor: theme === 'light' ? '#fff' : '#424242', color: theme === 'light' ? '#000' : '#fff' } }}
      >
        <Toolbar />
        <div>
          <List>
            {tables.map((text) => (
              <ListItem button key={text} onClick={() => setSelectedTable(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '24px', marginLeft: drawerWidth }}>
        <Container>
          {renderTableContent()}
        </Container>
      </main>
    </div>
  );
};

export default Admin;
