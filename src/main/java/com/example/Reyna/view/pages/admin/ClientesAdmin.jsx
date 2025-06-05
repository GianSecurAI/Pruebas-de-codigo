import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/ClientesAdmin.css';

const ClientesAdmin = () => {
  const navigate = useNavigate();  const [clientes, setClientes] = useState([
    { id: '001', nombre: 'Mariano', apellido: 'Torres', email: 'mariano.torres@example.com', direccion: 'Av. Primavera 123 - Surco', celular: '987654321', pedidos: 0 },
    { id: '002', nombre: 'Jorge', apellido: 'Ramirez', email: 'j.ramirez@example.com', direccion: 'Jr. Los Jardines 456 - San Borja', celular: '965432187', pedidos: 2 },
    { id: '003', nombre: 'Lucia', apellido: 'Mendoza', email: 'lucia.mendoza@example.com', direccion: 'Calle Las Violetas 789 - Miraflor', celular: '912345678', pedidos: 4 }
  ]);
  const [clientesOriginales, setClientesOriginales] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalBusqueda, setMostrarModalBusqueda] = useState(false);
  const [mostrarModalResultado, setMostrarModalResultado] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);  const [nuevoCliente, setNuevoCliente] = useState({
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    celular: '',
    pedidos: 0
  });
  const [clienteEditando, setClienteEditando] = useState(null);
  const [busquedaCliente, setBusquedaCliente] = useState({
    id: ''
  });
  const [clienteEncontrado, setClienteEncontrado] = useState(null);
  const [errores, setErrores] = useState({});
  const [cambiosPendientes, setCambiosPendientes] = useState(false);
  useEffect(() => {
    // Guardar una copia de los clientes originales al cargar el componente
    setClientesOriginales([...clientes]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setClienteEditando(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleAgregarClick = () => {
    setMostrarModal(true);
  };

  const handleCancelarClick = () => {
    setMostrarModal(false);
    setNuevoCliente({
      id: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      celular: '',
      pedidos: 0
    });
    setErrores({});
  };

  const handleEditar = () => {
    setClienteEditando({...clienteEncontrado});
    setMostrarModalResultado(false);
    setMostrarModalEdicion(true);
  };

  const handleCancelarEdicion = () => {
    setMostrarModalEdicion(false);
    setClienteEditando(null);
    setErrores({});
  };

  const handleGuardarEdicion = () => {
    if (validarFormulario(clienteEditando)) {
      const clientesActualizados = clientes.map(cliente => 
        cliente.id === clienteEditando.id ? {...clienteEditando} : cliente
      );
      
      setClientes(clientesActualizados);
      setCambiosPendientes(true);
      setMostrarModalEdicion(false);
      setClienteEditando(null);
      setErrores({});
    }
  };
  const validarFormulario = (cliente = nuevoCliente) => {
    const nuevosErrores = {};
    
    if (!cliente.id.trim()) {
      nuevosErrores.id = 'El código es requerido';
    } else if (cliente !== clienteEditando && clientes.some(c => c.id === cliente.id)) {
      nuevosErrores.id = 'Este código ya existe';
    }
    
    if (!cliente.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }
    
    if (!cliente.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es requerido';
    }
    
    if (!cliente.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(cliente.email)) {
      nuevosErrores.email = 'El formato de email no es válido';
    }
    
    if (!cliente.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es requerida';
    }
    
    if (!cliente.celular.trim()) {
      nuevosErrores.celular = 'El celular es requerido';
    } else if (!/^\d{9}$/.test(cliente.celular)) {
      nuevosErrores.celular = 'El celular debe tener 9 dígitos';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const handleGuardarCliente = () => {
    if (validarFormulario()) {
      const nuevoClienteFormateado = {
        ...nuevoCliente,
        pedidos: Number(nuevoCliente.pedidos)
      };

      setClientes(prevClientes => [...prevClientes, nuevoClienteFormateado]);
      setCambiosPendientes(true);
      setMostrarModal(false);
      setNuevoCliente({
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        celular: '',
        pedidos: 0
      });
      setErrores({});
    }
  };

  const handleEliminarCliente = () => {
    if (window.confirm(`¿Está seguro que desea eliminar al cliente ${clienteEncontrado.nombre} ${clienteEncontrado.apellido}?`)) {
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== clienteEncontrado.id));
      setCambiosPendientes(true);
      setMostrarModalResultado(false);
      setClienteEncontrado(null);
    }
  };

  const handleGuardarCambios = () => {
    // Aquí se implementaría la lógica para guardar los cambios en el backend
    // Por ahora, solo actualizamos los clientes originales para sincronizarlos
    setClientesOriginales([...clientes]);
    setCambiosPendientes(false);
    alert('Cambios guardados con éxito');
  };
  const handleBuscarClick = () => {
    setMostrarModalBusqueda(true);
  };

  const handleCancelarBusqueda = () => {
    setMostrarModalBusqueda(false);
    setBusquedaCliente({
      id: ''
    });
  };

  const handleBuscarCliente = () => {
    const cliente = clientes.find(c => c.id === busquedaCliente.id);
    if (cliente) {
      setClienteEncontrado(cliente);
      setMostrarModalBusqueda(false);
      setMostrarModalResultado(true);
    } else {
      alert('No se encontró ningún cliente con ese código');
    }
  };

  const handleVolverABusqueda = () => {
    setMostrarModalResultado(false);
    setMostrarModalBusqueda(true);
  };

  const handleCerrarResultado = () => {
    setMostrarModalResultado(false);
    setBusquedaCliente({
      id: ''
    });
    setClienteEncontrado(null);
  };
  const handleSalir = () => {
    // Si hay cambios pendientes, preguntar si desea guardarlos
    if (cambiosPendientes) {
      if (window.confirm('Hay cambios sin guardar. ¿Desea guardarlos antes de salir?')) {
        handleGuardarCambios();
      }
    }
    navigate('/admin/dashboard');
  };

  const handleBusquedaRapida = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setClientes([...clientesOriginales]);
    } else {
      const clientesFiltrados = clientesOriginales.filter(
        cliente => 
          cliente.id.toLowerCase().includes(query) ||
          cliente.nombre.toLowerCase().includes(query) ||
          cliente.apellido.toLowerCase().includes(query)
      );
      setClientes(clientesFiltrados);
    }
  };

  return (
    <div className="page-container-for-fixed-nav">
      <Navbar />
      
      <div className="clientes-admin-container">
        <div className="clientes-header">
          <h1>Mantenimiento de Clientes</h1>
            <div className="clientes-acciones">
            <button className="btn-accion btn-agregar" onClick={handleAgregarClick}>AGREGAR CLIENTE</button>
            <button className="btn-accion btn-buscar" onClick={handleBuscarClick}>BUSCAR CLIENTE</button>
            <button 
              className="btn-accion btn-guardar" 
              onClick={handleGuardarCambios}
              disabled={!cambiosPendientes}
              style={{ opacity: cambiosPendientes ? 1 : 0.5 }}
            >
              GUARDAR CAMBIOS
            </button>
            <button className="btn-accion btn-salir" onClick={handleSalir}>SALIR</button>
          </div>
        </div>

        {/* Modal de Nuevo Cliente */}
        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Nuevo Cliente</h2>
              <hr className="divisor" />
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label>Código</label>
                    <input
                      type="text"
                      name="id"
                      placeholder="Ingrese código del cliente"
                      value={nuevoCliente.id}
                      onChange={handleInputChange}
                      className={errores.id ? 'input-error' : ''}
                    />
                    {errores.id && <span className="error-message">{errores.id}</span>}
                  </div>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Ingrese nombre del cliente"
                      value={nuevoCliente.nombre}
                      onChange={handleInputChange}
                      className={errores.nombre ? 'input-error' : ''}
                    />
                    {errores.nombre && <span className="error-message">{errores.nombre}</span>}
                  </div>
                  <div className="form-group">
                    <label>Apellido</label>
                    <input
                      type="text"
                      name="apellido"
                      placeholder="Ingrese apellido del cliente"
                      value={nuevoCliente.apellido}
                      onChange={handleInputChange}
                      className={errores.apellido ? 'input-error' : ''}
                    />
                    {errores.apellido && <span className="error-message">{errores.apellido}</span>}
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Ingrese email del cliente"
                      value={nuevoCliente.email}
                      onChange={handleInputChange}
                      className={errores.email ? 'input-error' : ''}
                    />
                    {errores.email && <span className="error-message">{errores.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Ingrese dirección del cliente"
                      value={nuevoCliente.direccion}
                      onChange={handleInputChange}
                      className={errores.direccion ? 'input-error' : ''}
                    />
                    {errores.direccion && <span className="error-message">{errores.direccion}</span>}
                  </div>
                  <div className="form-group">
                    <label>Celular</label>
                    <input
                      type="text"
                      name="celular"
                      placeholder="Ingrese celular del cliente"
                      value={nuevoCliente.celular}
                      onChange={handleInputChange}
                      className={errores.celular ? 'input-error' : ''}
                      maxLength="9"
                    />
                    {errores.celular && <span className="error-message">{errores.celular}</span>}
                  </div>
                </div>
              </div>
              <div className="modal-buttons">
                <button onClick={handleCancelarClick} className="btn-cancelar">Cancelar</button>
                <button onClick={handleGuardarCliente} className="btn-guardar">Guardar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Búsqueda */}
        {mostrarModalBusqueda && (
          <div className="modal-overlay">
            <div className="modal-content modal-busqueda">
              <div className="modal-header">
                <h2>Buscar Cliente</h2>
                <button className="close-button" onClick={handleCancelarBusqueda}>&times;</button>
              </div>
              <div className="form-busqueda">
                <div className="form-group">
                  <label>Código Cliente</label>
                  <input
                    type="text"
                    value={busquedaCliente.id}
                    onChange={(e) => setBusquedaCliente(prev => ({...prev, id: e.target.value}))}
                    placeholder="Ingreso el código del cliente"
                  />
                </div>
                <div className="modal-buttons">
                  <button onClick={handleCancelarBusqueda} className="btn-cancelar">Cancelar</button>
                  <button onClick={handleBuscarCliente} className="btn-buscar">Buscar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Resultado de Búsqueda */}
        {mostrarModalResultado && clienteEncontrado && (
          <div className="modal-overlay">
            <div className="modal-content modal-resultado">
              <div className="modal-header">
                <h2>Cliente Buscado</h2>
                <button className="close-button" onClick={handleCerrarResultado}>&times;</button>
              </div>
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label>Código</label>
                    <input
                      type="text"
                      value={clienteEncontrado.id}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      value={clienteEncontrado.nombre}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellido</label>
                    <input
                      type="text"
                      value={clienteEncontrado.apellido}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      value={clienteEncontrado.email}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      type="text"
                      value={clienteEncontrado.direccion}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Celular</label>
                    <input
                      type="text"
                      value={clienteEncontrado.celular}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="modal-buttons busqueda-buttons">
                <button onClick={handleVolverABusqueda} className="btn-volver">
                  <span className="flecha-back">←</span> Volver
                </button>                <div>
                  <button className="btn-eliminar" onClick={handleEliminarCliente}>Eliminar</button>
                  <button className="btn-editar" onClick={handleEditar}>Editar</button>
                </div>
                <button className="btn-guardar">Guardar Cliente</button>
              </div>
            </div>
          </div>
        )}

        <div className="clientes-content">          <div className="clientes-busqueda">
            <div className="busqueda-container">
              <label>Buscar Clientes:</label>
              <div className="busqueda-input">
                <input 
                  type="text" 
                  placeholder="Ingrese código, nombre o apellido del cliente"
                  onChange={handleBusquedaRapida}
                />
              </div>
            </div>
          </div>

          <div className="clientes-tabla">
            <table>
              <thead>
                <tr>
                  <th>Cód</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>E-mail</th>
                  <th>Dirección</th>
                  <th>Celular</th>
                  <th>N° Pedidos</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.apellido}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.direccion}</td>
                    <td>{cliente.celular}</td>
                    <td>{cliente.pedidos}</td>
                  </tr>
                ))}              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Edición de Cliente */}
        {mostrarModalEdicion && clienteEditando && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Editar Cliente</h2>
              <hr className="divisor" />
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label>Código</label>
                    <input
                      type="text"
                      name="id"
                      value={clienteEditando.id}
                      readOnly
                      className={errores.id ? 'input-error' : ''}
                    />
                    {errores.id && <span className="error-message">{errores.id}</span>}
                  </div>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={clienteEditando.nombre}
                      onChange={handleEditInputChange}
                      className={errores.nombre ? 'input-error' : ''}
                    />
                    {errores.nombre && <span className="error-message">{errores.nombre}</span>}
                  </div>
                  <div className="form-group">
                    <label>Apellido</label>
                    <input
                      type="text"
                      name="apellido"
                      value={clienteEditando.apellido}
                      onChange={handleEditInputChange}
                      className={errores.apellido ? 'input-error' : ''}
                    />
                    {errores.apellido && <span className="error-message">{errores.apellido}</span>}
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={clienteEditando.email}
                      onChange={handleEditInputChange}
                      className={errores.email ? 'input-error' : ''}
                    />
                    {errores.email && <span className="error-message">{errores.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={clienteEditando.direccion}
                      onChange={handleEditInputChange}
                      className={errores.direccion ? 'input-error' : ''}
                    />
                    {errores.direccion && <span className="error-message">{errores.direccion}</span>}
                  </div>
                  <div className="form-group">
                    <label>Celular</label>
                    <input
                      type="text"
                      name="celular"
                      value={clienteEditando.celular}
                      onChange={handleEditInputChange}
                      className={errores.celular ? 'input-error' : ''}
                      maxLength="9"
                    />
                    {errores.celular && <span className="error-message">{errores.celular}</span>}
                  </div>
                </div>
              </div>
              <div className="modal-buttons">
                <button onClick={handleCancelarEdicion} className="btn-cancelar">Cancelar</button>
                <button onClick={handleGuardarEdicion} className="btn-guardar">Guardar Cambios</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ClientesAdmin;
