

import React, { useState } from 'react';
import UsersTable from './UsersTable';
import ServicesTable from './ServicesTable';
import { Drawer, List, ListItem, ListItemText, CssBaseline, Toolbar, Container } from '@mui/material';

const drawerWidth = 240;

const Admin = ({ theme }) => {
  const [selectedTable, setSelectedTable] = useState('Barbers');
  
  const tables = ['Barbers', 'OrderLines', 'Orders', 'Products', 'Reservations', 'Services', 'Users'];

  const renderTableContent = () => {
    switch (selectedTable) {
      case 'Barbers':
        return <div>Content for Barbers</div>;
      case 'OrderLines':
        return <div>Content for OrderLines</div>;
      case 'Orders':
        return <div>Content for Orders</div>;
      case 'Products':
        return <div>Content for Products</div>;
      case 'Reservations':
        return <div>Content for Reservations</div>;
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
