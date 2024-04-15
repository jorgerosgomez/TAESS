import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


const ProductPage = () => {

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  const fetchData = async () => {
		try {
		  const response = await fetch('http://localhost:5000/api/products'); // Cambia la ruta a tu endpoint de productos
		  if (response.ok) {
			const data = await response.json();
			setProducts(data.products);
		  } else {
			console.error('Error al obtener los productos:', response.statusText);
		  }
		  setLoading(false);
		} catch (error) {
		  console.error('Error al obtener los productos:', error);
		}
	  };
  
	  fetchData();
	}, []);
  
	const renderProducts = () => {
	  
  
		if (products.length === 0) {
			return(
				<div>
					<div>
						<div>
							<div>
								<div>
									<h4>Products List
										<Link to="/productos/añadir">Add Product</Link>
									</h4>
								</div>
								<div>
									No se encontraron productos en la base de datos
								</div>
							</div>
						</div>
					</div>
				</div>
			);
	  	}
  
	  return (
		<div>
			<div>
				<div>
					<div>
						<div>
							<h4>Products List
								<Link to="/">Add Product</Link>
							</h4>
						</div>
						<div>
							<table className='table table-product'>
								<thead>
									<tr>
										<th>Name</th>
										<th>Description</th>
										<th>Stock</th>
										<th>Price</th>
										<th>Sales</th>
										<th>StockMin</th>
									</tr>
								</thead>
								<tbody>
								{products.map((product) => (
									<tr key={product.id}>
									<td>{product.name}</td>
									<td>{product.description}</td>
									<td>{product.stock}</td>
									<td>{product.price}</td>
									<td>{product.sales}</td>
									<td>{product.stock_min}</td>
									<td><Link to="/" classname="btn editProd">Modify</Link></td>
									<td><Link to="/" classname="btn delProd">Delete</Link></td>
									</tr>
								))}
								</tbody>

							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	  );
	};
  
	return (
	  <div>
		<h1>Tabla de Productos</h1>
		{renderProducts()}
	  </div>
	);
};

export default ProductPage;
  