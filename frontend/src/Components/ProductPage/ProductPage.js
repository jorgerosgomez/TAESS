import React, { useState, useEffect } from 'react';
import './ProductPage.css';

const ProductPage = ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        if (json.success && json.products) {
          setProducts(json.products);
        } else {
          setError('No se encontraron productos');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleProduct = (productId) => {
    setExpandedProduct((prevExpandedProduct) =>
      prevExpandedProduct === productId ? null : productId
    );
  };

  const productPageClass = `product-page ${theme}`;
  const productCardClass = `product-card ${theme}-card`;

  if (isLoading) {
    return <div className={`loading ${theme}`}>Cargando productos...</div>;
  }

  if (error) {
    return <div className={`error ${theme}`}>Error: {error}</div>;
  }

  return (
    <div className={productPageClass}>
      <h1>Lista de Productos</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className={productCardClass} key={product.id}>
              <div className="product-header" onClick={() => toggleProduct(product.id)}>
                <h3>{product.name}</h3>
              </div>
              {expandedProduct === product.id && (
                <div className="product-details">
                  <p>{product.description}</p>
                  <div className="product-info">
                    <span>Stock: {product.stock}</span>
                    <span>Price: ${product.price.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
