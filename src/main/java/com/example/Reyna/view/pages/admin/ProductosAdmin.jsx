import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/ProductosAdmin.css';

const ProductosAdmin = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([
    { id: 'P001', nombre: 'Set Ccori Rosé: Parfum + Loción Perfumada', categoria: 'Perfumes', precio: 119 },
    { id: 'P002', nombre: 'Cielo en Rosa Eau de Parfum', categoria: 'Perfumes', precio: 113 },
    { id: 'P003', nombre: 'Set Sauvage Dior: Parfum + Estuche Elegante', categoria: 'Perfumes', precio: 105 },
    { id: 'P004', nombre: 'Bombshell Seduction Eau de Parfum', categoria: 'Perfumes', precio: 180 },
    { id: 'P005', nombre: 'Una Instinct Eau de Parfum', categoria: 'Perfumes', precio: 165 },
    { id: 'P006', nombre: 'Fragancia Intensa para Hombre', categoria: 'Perfumes', precio: 150 }
  ]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: '',
    marca: '',
    sexo: '',
    precio: '',
    codigo: ''
  });
  const [errores, setErrores] = useState({});
  const [mostrarModalBusqueda, setMostrarModalBusqueda] = useState(false);
  const [mostrarModalResultado, setMostrarModalResultado] = useState(false);
  const [busquedaProducto, setBusquedaProducto] = useState({
    categoria: '',
    codigo: ''
  });
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  const categorias = ['Todos', 'Perfumes', 'Maquillaje', 'Cremas', 'Joyas'];
  const marcas = ['Dior', 'Carolina Herrera', 'Lancôme', 'MAC', 'L\'Oreal', 'Maybelline'];
  const opcionesSexo = ['Masculino', 'Femenino', 'Unisex'];

  useEffect(() => {
    if (categoriaSeleccionada === 'Todos') {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(productos.filter(p => p.categoria === categoriaSeleccionada));
    }
  }, [categoriaSeleccionada, productos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAgregarClick = () => {
    setMostrarModal(true);
  };

  const handleCancelarClick = () => {
    setMostrarModal(false);
    setNuevoProducto({
      nombre: '',
      categoria: '',
      marca: '',
      sexo: '',
      precio: '',
      codigo: ''
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!nuevoProducto.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }
    
    if (!nuevoProducto.categoria) {
      nuevosErrores.categoria = 'La categoría es requerida';
    }
    
    if (!nuevoProducto.marca) {
      nuevosErrores.marca = 'La marca es requerida';
    }
    
    if (!nuevoProducto.precio || nuevoProducto.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }
    
    if (!nuevoProducto.codigo.trim()) {
      nuevosErrores.codigo = 'El código es requerido';
    } else if (productos.some(p => p.id === nuevoProducto.codigo)) {
      nuevosErrores.codigo = 'Este código ya existe';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardarProducto = () => {
    if (validarFormulario()) {
      const nuevoProductoFormateado = {
        id: nuevoProducto.codigo,
        nombre: nuevoProducto.nombre,
        categoria: nuevoProducto.categoria,
        marca: nuevoProducto.marca,
        sexo: nuevoProducto.sexo,
        precio: Number(nuevoProducto.precio)
      };

      setProductos(prevProductos => [...prevProductos, nuevoProductoFormateado]);
      setMostrarModal(false);
      setNuevoProducto({
        nombre: '',
        categoria: '',
        marca: '',
        sexo: '',
        precio: '',
        codigo: ''
      });
      setErrores({});
    }
  };

  const handleBuscarClick = () => {
    setMostrarModalBusqueda(true);
  };

  const handleCancelarBusqueda = () => {
    setMostrarModalBusqueda(false);
    setBusquedaProducto({
      categoria: '',
      codigo: ''
    });
  };

  const handleBuscarProducto = () => {
    const producto = productos.find(p => p.id === busquedaProducto.codigo);
    if (producto) {
      setProductoEncontrado(producto);
      setMostrarModalBusqueda(false);
      setMostrarModalResultado(true);
    }
  };

  const handleVolverABusqueda = () => {
    setMostrarModalResultado(false);
    setMostrarModalBusqueda(true);
  };

  const handleCerrarResultado = () => {
    setMostrarModalResultado(false);
    setBusquedaProducto({
      categoria: '',
      codigo: ''
    });
    setProductoEncontrado(null);
  };
  const handleSalir = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="page-container-for-fixed-nav">
      <Navbar />
      
      <div className="productos-admin-container">
        <div className="productos-header">
          <h1>Mantenimiento de Productos</h1>
          
          <div className="productos-acciones">
            <button className="btn-accion btn-agregar" onClick={handleAgregarClick}>AGREGAR PRODUCTO</button>
            <button className="btn-accion btn-buscar" onClick={handleBuscarClick}>BUSCAR PRODUCTO</button>
            <button className="btn-accion btn-guardar">GUARDAR CAMBIOS</button>
            <button className="btn-accion btn-salir" onClick={handleSalir}>SALIR</button>
          </div>
        </div>

        {/* Modal de Nuevo Producto */}
        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Nuevo Producto</h2>
              <hr className="divisor" />
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label>Nombre Producto</label>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Ingrese nombre del producto"
                      value={nuevoProducto.nombre}
                      onChange={handleInputChange}
                      className={errores.nombre ? 'input-error' : ''}
                    />
                    {errores.nombre && <span className="error-message">{errores.nombre}</span>}
                  </div>
                  <div className="form-group">
                    <label>Categoría</label>
                    <select
                      name="categoria"
                      value={nuevoProducto.categoria}
                      onChange={handleInputChange}
                      className={errores.categoria ? 'input-error' : ''}
                    >
                      <option value="">Seleccione categoría</option>
                      {categorias.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errores.categoria && <span className="error-message">{errores.categoria}</span>}
                  </div>
                  <div className="form-group">
                    <label>Marca</label>
                    <select
                      name="marca"
                      value={nuevoProducto.marca}
                      onChange={handleInputChange}
                      className={errores.marca ? 'input-error' : ''}
                    >
                      <option value="">Seleccione marca</option>
                      {marcas.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                      ))}
                    </select>
                    {errores.marca && <span className="error-message">{errores.marca}</span>}
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Información Opcional</label>
                    <select
                      name="sexo"
                      value={nuevoProducto.sexo}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccione sexo</option>
                      {opcionesSexo.map(opcion => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Precio Producto</label>
                    <input
                      type="number"
                      name="precio"
                      placeholder="0.00"
                      value={nuevoProducto.precio}
                      onChange={handleInputChange}
                      className={errores.precio ? 'input-error' : ''}
                      min="0"
                      step="0.01"
                    />
                    {errores.precio && <span className="error-message">{errores.precio}</span>}
                  </div>
                  <div className="form-group">
                    <label>Código</label>
                    <input
                      type="text"
                      name="codigo"
                      placeholder="Ingrese código del producto"
                      value={nuevoProducto.codigo}
                      onChange={handleInputChange}
                      className={errores.codigo ? 'input-error' : ''}
                    />
                    {errores.codigo && <span className="error-message">{errores.codigo}</span>}
                  </div>
                </div>
              </div>
              <div className="modal-buttons">
                <button onClick={handleCancelarClick} className="btn-cancelar">Cancelar</button>
                <button onClick={handleGuardarProducto} className="btn-guardar">Guardar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Búsqueda */}
        {mostrarModalBusqueda && (
          <div className="modal-overlay">
            <div className="modal-content modal-busqueda">
              <div className="modal-header">
                <h2>Buscar Producto</h2>
                <button className="close-button" onClick={handleCancelarBusqueda}>&times;</button>
              </div>
              <div className="form-busqueda">
                <div className="form-group">
                  <label>Selecciona la categoría</label>
                  <select
                    value={busquedaProducto.categoria}
                    onChange={(e) => setBusquedaProducto(prev => ({...prev, categoria: e.target.value}))}
                  >
                    <option value="">Seleccione categoría</option>
                    {categorias.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Código</label>
                  <input
                    type="text"
                    value={busquedaProducto.codigo}
                    onChange={(e) => setBusquedaProducto(prev => ({...prev, codigo: e.target.value}))}
                    placeholder="Ingrese código del producto"
                  />
                </div>
                <div className="modal-buttons">
                  <button onClick={handleCancelarBusqueda} className="btn-cancelar">Cancelar</button>
                  <button onClick={handleBuscarProducto} className="btn-buscar">Buscar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Resultado de Búsqueda */}
        {mostrarModalResultado && productoEncontrado && (
          <div className="modal-overlay">
            <div className="modal-content modal-resultado">
              <div className="modal-header">
                <h2>Producto Buscado</h2>
                <button className="close-button" onClick={handleCerrarResultado}>&times;</button>
              </div>
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label>Nombre Producto</label>
                    <input
                      type="text"
                      value={productoEncontrado.nombre}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Categoría</label>
                    <input
                      type="text"
                      value={productoEncontrado.categoria}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Marca</label>
                    <input
                      type="text"
                      value={productoEncontrado.marca || ''}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Información Opcional</label>
                    <select
                      value={productoEncontrado.sexo || ''}
                      disabled
                    >
                      <option value="">{productoEncontrado.sexo || 'No especificado'}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Precio Producto</label>
                    <input
                      type="text"
                      value={`S/. ${productoEncontrado.precio}.00`}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Código</label>
                    <input
                      type="text"
                      value={productoEncontrado.id}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="modal-buttons busqueda-buttons">
                <button onClick={handleVolverABusqueda} className="btn-volver">
                  <span className="flecha-back">←</span> Volver
                </button>
                <div>
                  <button className="btn-eliminar">Eliminar</button>
                  <button className="btn-editar">Editar</button>
                </div>
                <button className="btn-guardar">Guardar Producto</button>
              </div>
            </div>
          </div>
        )}

        <div className="productos-content">
          <div className="productos-filtros">
            <select 
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="categoria-select"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="productos-tabla">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>S/. {producto.precio}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductosAdmin;
