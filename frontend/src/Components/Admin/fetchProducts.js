

export const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      console.log('Fetched products:', data.products);
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  
  export const createOrUpdateProduct = async (product) => {
    try {
      const method = product.id ? 'PATCH' : 'POST';
      const url = product.id ? `http://localhost:5000/api/products/${product.id}` : 'http://localhost:5000/api/products';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  };
  
  export const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete product with id ${id}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
    
};
  