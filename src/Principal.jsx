import React, { useState, useEffect } from 'react';

const Principal = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Balón de fútbol' },
    { id: 2, name: 'Raqueta de tenis' },
  ]);

  const [newProductName, setNewProductName] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    setEditingProduct(null);
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: newProductName,
    };
    setProducts([...products, newProduct]);
    setNewProductName('');
    setUpdateMessage('Producto agregado exitosamente.');
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      const updatedProducts = products.map(product =>
        product.id === editingProduct.id ? { ...product, name: newProductName } : product
      );
      setProducts(updatedProducts);
      setNewProductName('');
      setEditingProduct(null);
      setUpdateMessage('Producto actualizado exitosamente.');
    } else {
      setUpdateMessage('Por favor, seleccione un registro para actualizar.');
    }
  };

  const handleEditProduct = product => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setUpdateMessage(''); // Limpiar el mensaje al seleccionar un registro para editar.
  };

  const handleDeleteProduct = productId => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    setUpdateMessage('Producto eliminado exitosamente.');
  };

  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h1 className="mb-4">Lista de Productos</h1>
          {updateMessage && <p className="text-muted">{updateMessage}</p>}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr
                  key={product.id}
                  onClick={() => handleEditProduct(product)}
                  onMouseEnter={() => setHoveredRow(product.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ backgroundColor: hoveredRow === product.id ? '#f0f0f0' : 'inherit' }}
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <div>
            <h2>{editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}</h2>
            {hoveredRow && (
              <p className="text-muted">Pase el mouse sobre una fila para resaltarla.</p>
            )}
            <label>ID: {editingProduct?.id}</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nombre del producto"
              value={newProductName}
              onChange={e => setNewProductName(e.target.value)}
            />
            {editingProduct ? (
              <button className="btn btn-primary" onClick={handleUpdateProduct}>
                Actualizar Producto
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleAddProduct}>
                Agregar Producto
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
