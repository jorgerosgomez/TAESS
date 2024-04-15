import React, { useState} from 'react';
import '../../Components/ProductPage/AddProductPage.css'; 
import { registerProduct } from './ReqProduct';


const AddProductPage = ({ closeModal, theme }) => {

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [stock, setStock] = useState('');
	const [price, setPrice] = useState('');
	const [sales, setSales] = useState('');
	const [stock_min, setStock_min] = useState('');

	const saveProduct =  async (e) => {
		e.preventDefault();
		  
		try {
		const data = await registerProduct(name, description, stock, price, sales, stock_min);
		if (data.success) {
		  console.log('Producto añadido con éxito:', data);
		  closeModal();
		} else {
		  alert(data.message);
		}
	  } catch (error) {
		console.error('Error al añadir el producto:', error);
		alert('Hubo un problema al añadir el producto.');
	  }

	}

	const modalContentClass = `register-modal-content ${theme === 'dark' ? 'dark' : 'light'}`;

	  
	return (
		<div className={`register-modal-backdrop ${theme}`}>
			<div className={modalContentClass}>
				<button className="register-modal-close" onClick={closeModal}>&times;</button>
				<h2>Nuevo producto</h2>
				<form onSunmit={saveProduct} className="register-modal-form">
					<input
						type="text"
						placeholder="Nombre"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<input
						type="text"
						placeholder="Descripcion del producto"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<input
						type="number"
						placeholder="Stock"
						value={stock}
						onChange={(e) => setStock(e.target.value)}
						required
					/>
					<input
						type="number"
						placeholder="Precio"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
					<input
						type="number"
						placeholder="En venta"
						value={sales}
						onChange={(e) => setSales(e.target.value)}
						required
					/>
					<input
						type="number"
						placeholder="Stock mínimo"
						value={stock_min}
						onChange={(e) => setStock_min(e.target.value)}
						required
					/>
					<button type='submit'>Añadir producto</button>
				</form>
			</div>
		</div>
	);
  
};

export default AddProductPage;
  