import React, { useState } from 'react';

const Principal = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Balón de fútbol' },
    { id: 2, name: 'Raqueta de tenis' },
  ]);

  const [newProductName, setNewProductName] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: newProductName,
    };
    setProducts([...products, newProduct]);
    setNewProductName('');
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map(product =>
      product.id === editingProduct.id ? { ...product, name: newProductName } : product
    );
    setProducts(updatedProducts);
    setNewProductName('');
    setEditingProduct(null);
  };

  const handleEditProduct = product => {
    setEditingProduct(product);
    setNewProductName(product.name);
  };

  const handleDeleteProduct = productId => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} onClick={() => handleEditProduct(product)}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>{editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}</h2>
        <label>ID: {editingProduct?.id}</label>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProductName}
          onChange={e => setNewProductName(e.target.value)}
        />
        {editingProduct ? (
          <button onClick={handleUpdateProduct}>Actualizar Producto</button>
        ) : (
          <button onClick={handleAddProduct}>Agregar Producto</button>
        )}
      </div>
    </div>
  );
};

export default Principal;
