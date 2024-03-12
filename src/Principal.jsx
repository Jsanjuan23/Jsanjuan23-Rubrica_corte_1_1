import React, { useState } from 'react';

const Principal = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Balón de fútbol' },
    { id: 2, name: 'Raqueta de tenis' },

  ]);

  const [newProductName, setNewProductName] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    // Crear un nuevo producto y agregarlo a la lista
    const newProduct = {
      id: products.length + 1,
      name: newProductName,
    };
    setProducts([...products, newProduct]);
    setNewProductName('');
  };

  const handleUpdateProduct = () => {
    // Actualizar el nombre del producto con el ID dado
    const updatedProducts = products.map(product => (
      product.id === editingProduct.id ? { ...product, name: newProductName } : product
    ));
    setProducts(updatedProducts);
    setNewProductName('');
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    // Establecer el producto actualmente en edición
    setEditingProduct(product);
    setNewProductName(product.name);
  };

  const handleDeleteProduct = (productId) => {
    // Eliminar el producto con el ID dado
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {editingProduct === product ? (
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
            ) : (
              product.name
            )}
            {editingProduct === product ? (
              <button onClick={handleUpdateProduct}>Guardar</button>
            ) : (
              <>
                <button onClick={() => handleEditProduct(product)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Agregar Producto</h2>
        <input
          type="text"
          placeholder="Nombre del nuevo producto"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
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
