const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener los pedidos');
      }
  
      return data.orders;
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      throw new Error('Hubo un problema al obtener los pedidos');
    }
  };
  
const createOrUpdateOrder = async (order) => {
    try {
      const method = order.id ? 'PATCH' : 'POST';
      const url = order.id ? `http://localhost:5000/api/orders/${order.id}` : 'http://localhost:5000/api/orders';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al guardar el pedido');
      }
        
      return data;

    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  };
  
const deleteOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar el pedido');
      }
  
      return data;

    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      throw error;
    }
  };

export { fetchOrders, createOrUpdateOrder, deleteOrder };
